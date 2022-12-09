import Response from './Response'

export default function fetch(request) {
  return new Promise((resolve) => {
    resolve(new Response(null, {status: 200}, request))
  })
}
