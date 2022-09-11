const fs = require('fs')
const http = require('http');


let server = http.createServer((req, res) => {
    res.writeHead(200, "Success", {
        "Content-Type": 'text/html'
    })
    let timeStamp = new Date()
    fs.writeFile(`./sample.txt`, timeStamp.toString(), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
        else {
            fs.readFile('./sample.txt', 'utf-8', (err, data) => {
                if (err)
                    console.log(err)
                else {
                    res.write(data)
                }
                res.end()
            })
        }
    })

})

// server.listen(3000, (err) => {
//     if (err)
//         console.log(err)
//     else
//         console.log("running on port 3000")
// })