const Proxy = require('http-mitm-proxy').Proxy
const proxy = new Proxy()
const fs = require('fs') 
host = fs.readFileSync('host.txt',{ encoding: 'utf8', flag: 'r' })
proxy.onError(function(cxk, err) {
    console.error('proxy error:', err);
  })
proxy.onRequest(function(ctx, callback) {
    path ='https://' + ctx.proxyToServerRequestOptions.host + ctx.proxyToServerRequestOptions.path
    ctx.proxyToServerRequestOptions.host = host
    ctx.proxyToServerRequestOptions.headers.host = host
    ctx.proxyToServerRequestOptions.path = '/?proxypath=' + path
    return callback()
})
console.log('program runs on port  8010')
proxy.listen({host:'::', port: 8010})
