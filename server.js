const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {

    let filePath = "." + req.url;

    if (filePath === "./") {
        filePath = "./table.html";
    }

    const ext = path.extname(filePath);

    let contentType = "text/html";

    if (ext === ".css") contentType = "text/css";
    else if (ext === ".js") contentType = "text/javascript";

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.write("File not found");
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.write(data);
        }
        res.end();
    });
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});