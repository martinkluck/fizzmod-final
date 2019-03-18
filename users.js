const http = require('http')
const fs = require("fs")
const mysql = require("mysql")
var { parse } = require('querystring');

const server = http.createServer((req, res) => {
    let {
        httpVersion,
        method,
        url
    } = req
    const connection = mysql.createConnection({
        host: 'localhost',
        port: "3306",
        user: 'root',
        password: '',
        database: 'fizzmod'
    })
    if(method === 'GET'){
        connection.connect()
        connection.query('SELECT * FROM `users`', function (error, results, fields) {
            if (error){
                console.log(error)
                res.writeHead(500, 'Internal server Error')
                res.end(err.message)
            };
            console.log(results);
            let result = new Buffer(results);
            res.writeHead(200, {
                "content-type": "text/html"
            })
            res.end(result)
        })
        connection.end()
    }
    if(method == 'POST'){
        req.on('data', function (data) {
            let newUser = parse(data)
            console.log(JSON.stringify(newUser))
        })
        req.on('end', function () {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
            res.end('post received')
        })
    }
})

server.listen(9000, () => {
    console.log("Servidor ejecutandoce en http://localhost:9000")
})