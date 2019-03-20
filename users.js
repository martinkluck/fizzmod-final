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
                res.end(error.message)
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
        let r = ''
        req.on('data', function (data) {
            let save = JSON.parse(data.toString())
            let date = new Date()
            let timestamp = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
            connection.connect()
            connection.query('INSERT INTO `users` (`username`,`firstname`,`lastname`,`email`,`created_at`,`user_status_id`) values (?,?,?,?,?,?)',[save.username,save.firstname,save.lastname,save.email,timestamp,1], function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.writeHead(500, 'Internal server Error')
                    res.end(error.message)
                    r = JSON.stringify(error.message)
                };
                console.log(results);
                r = JSON.stringify(results)
                /* res.writeHead(200, {
                    "content-type": "text/html"
                })
                res.end(JSON.stringify(results)) */
            })
            connection.end()
        })
        req.on('end', function () {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
            res.end(r)
        })
    }
})

server.listen(9000, () => {
    console.log("Servidor ejecutandoce en http://localhost:9000")
})