const fs = require('fs')
const http = require('http')

const server = http.createServer((req, res) => {
    // console.log('server is running')
    res.writeHead(200, { "content-type": "text/html" })
    // fs.writeFile('welcome.txt', 'this is test project')
    fs.readFile('index.html', (err, data) => {
        if (err) throw err;
        // console.log(data)
        res.end(data)
    })

})


server.listen(5000, () => {
    console.log('server is run')
})