
const http = require('http')
const moment = require("moment")
const member = require("./members.js")
const users = require("./users.js")

const server = http.createServer((req, res) => {
    const url = req.url;
    res.statusCode = 200;

    if (url === "/"){
        res.setHeader('Content-Type', 'text/plain')
        res.write("This is the home page")
    } 
    else if (url === "/about"){
        res.write(
            JSON.stringify({
                Status: "success",
                Message : "response success",
                Description: "Exercise #03",
                Date:moment().format(), //ambe dari modul moment (harus di install dlu)             
                Data: member,
            })
        )
    }
    else if(url === "/users") {
        res.write(JSON.stringify(users));
    }
    res.end()
})

const hostname = 'localhost';
const port = 3000;
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});