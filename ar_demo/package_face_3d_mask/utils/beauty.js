function white(canvas,ctx){
  var imgData = ctx.getImageData(0,0,canvas.width,canvas.height)
  for(var i= 0 ;i<imgDataArr.length;i++){
      imgData.data[imgDataArr[i]*4+0]=imgData.data[imgDataArr[i]*4+0]+50
      imgData.data[imgDataArr[i]*4+1]=imgData.data[imgDataArr[i]*4+1]+50
      imgData.data[imgDataArr[i]*4+2]=imgData.data[imgDataArr[i]*4+2]+50
      imgData.data[imgDataArr[i]*4+3]=255
  }
  ctx.putImageData(imgData,0,0);
  //return context.
}
module.exports = {
    white
}