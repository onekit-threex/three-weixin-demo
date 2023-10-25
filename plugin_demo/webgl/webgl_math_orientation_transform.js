import {
  document,
	window,
	HTMLCanvasElement,
	requestAnimationFrame,
	cancelAnimationFrame,
core,
	Event,
  Event0
} from "dhtml-weixin"
import * as THREE from './three/Three';
var requestId
Page({
  onShareAppMessage(){
    return getApp().onShare()
  },
  onShareTimeline(){
     return {title:"ThreeX 2.0"}
  },
	onUnload() {
		cancelAnimationFrame(requestId, this.canvas)
		this.worker && this.worker.terminate()
if(this.canvas) this.canvas = null
		setTimeout(() => {
			if (this.renderer instanceof THREE.WebGLRenderer) {
				this.renderer.dispose()
				this.renderer.forceContextLoss()
				this.renderer.context = null
				this.renderer.domElement = null
				this.renderer = null
			}
		}, 0)
	},
  webgl_touch(e){
		const web_e = (window.platform=="devtools"?Event:Event0).fix(e)
		this.canvas.dispatchEvent(web_e)
  },
  onLoad() {
		document.createElementAsync("canvas", "webgl2").then(canvas => {
      this.canvas = canvas
      this.body_load(canvas).then()
    })
  },
  async body_load(canvas3d) {

    let camera, scene, renderer, mesh, target;

    const spherical = new THREE.Spherical();
    const rotationMatrix = new THREE.Matrix4();
    const targetQuaternion = new THREE.Quaternion();
    const clock = new THREE.Clock();
    const speed = 2;

    init();
    animate();

    function init() {

      camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
      camera.position.z = 5;

      scene = new THREE.Scene();

      const geometry = new THREE.ConeGeometry( 0.1, 0.5, 8 );
      geometry.rotateX( Math.PI * 0.5 );
      const material = new THREE.MeshNormalMaterial();

      mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );

      //

      const targetGeometry = new THREE.SphereGeometry( 0.05 );
      const targetMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
      target = new THREE.Mesh( targetGeometry, targetMaterial );
      scene.add( target );

      //

      const sphereGeometry = new THREE.SphereGeometry( 2, 32, 32 );
      const sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xcccccc, wireframe: true, transparent: true, opacity: 0.3 } );
      const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
      scene.add( sphere );

      //

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );

      //

      window.addEventListener( 'resize', onWindowResize );

      //

      generateTarget();

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function animate() {

      requestId = requestAnimationFrame( animate );

      const delta = clock.getDelta();

      if ( ! mesh.quaternion.equals( targetQuaternion ) ) {

        const step = speed * delta;
        mesh.quaternion.rotateTowards( targetQuaternion, step );

      }

      renderer.render( scene, camera );

    }

    function generateTarget() {

      // generate a random point on a sphere

      spherical.theta = Math.random() * Math.PI * 2;
      spherical.phi = Math.acos( ( 2 * Math.random() ) - 1 );
      spherical.radius = 2;

      target.position.setFromSpherical( spherical );

      // compute target rotation

      rotationMatrix.lookAt( target.position, mesh.position, mesh.up );
      targetQuaternion.setFromRotationMatrix( rotationMatrix );

      setTimeout( generateTarget, 2000 );

    }
  }
})