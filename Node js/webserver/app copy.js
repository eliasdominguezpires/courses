const http = require("http");

/*
    http.createServer(function (req, res) {

    })
*/
/*
http.createServer((req, res) => {
    // res.writeHead(200, {req: req, status: 0});
    res.writeHead(200, { 'Content-Type': 'application/json' });

    const persona = {
        id: 1,
        nombre: 'Elias'
    }

    res.write(JSON.stringify(persona));
    res.end();
}).listen(8088);
*/
/*
http.createServer((req, res) => {
    res.setHeader('Content-Disposition', 'attachment; filename=lista.csv');
    res.writeHead(200, { 'Content-Type': 'application/csv' });

    res.write('id, nombre\n');
    res.write('1, elias\n');
    res.end();
}).listen(8088);
*/

http.createServer((req, res) => {
    // res.writeHead(200, { 'Content-Type': 'application/json' });

    res.write("Hola Mundo");
    res.end();
}).listen(8088);
console.log("Escuchando puero", 8088);