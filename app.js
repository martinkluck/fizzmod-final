const http = require('http')
const fs = require("fs")
const Url = require("url")
const fetch = require('node-fetch')

const server = http.createServer((req, res) => {
    let {
        httpVersion,
        method,
        url
    } = req
    console.log(method,url);
    if(method == 'GET'){
        if(url == '/'){
            let archivo = fs.createReadStream(__dirname + "/index.html")
            res.writeHead(200, {
                "content-type": "text/html"
            })
            archivo.pipe(res)
        }
        if(url == '/front.js'){
            let archivo = fs.createReadStream(__dirname + "/front.js")
            res.writeHead(200, {
                "content-type": "application/javascript"
            })
            archivo.pipe(res)
        }
        if (url == '/styles.css') {
            let archivo = fs.createReadStream(__dirname + "/styles.css")
            res.writeHead(200, {
                "content-type": "text/css"
            })
            archivo.pipe(res)
        }
        if(url == '/users'){
            fetch('http://localhost:9000')
            .then(data=>{
                console.log(data);
            })
            .catch(error=>{
                console.log(error)
            })
        }
    }
    if(method === 'POST'){
        // console.log(Url.parse(url, true))
        if (url == '/users') {
            req.on('data', function (data) {
                console.log(data.toString())
                fetch('http://localhost:9000', {
                        method: 'POST',
                        body: data
                    })
                    .then(data => {
                        console.log(data);
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            req.on('end', function () {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                })
                res.end('post received')
            })
        }
    }
})

server.listen(8000, ()=>{
    console.log("Servidor ejecutandoce en http://localhost:8000")
})