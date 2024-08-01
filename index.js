const express = require("express");

let koders = ["Ana", "Carlos", "Bertha"];

// const app = express();
const server = express();

server.use(express.json());

/* El siguiente código equivale a esto:
if (method === "GET" && url === "/") {
}*/
server.get("/", (reques, response) => {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Hello world");
    response.end();
})

// Listar koders:
server.get("/koders", (request, response) => {
    response.status(200).json(koders);
})

// Crear un koder nuevo:
server.post("/koders", (request, response) => {
    console.log("post /koders");
    console.log("body", request.body);
    
    console.log("name", request.body.name);

    const name = request.body.name;
    
    // Falsies: "" 0 null undefined
    if(!name) {
        response.status(400).json({
            message: "Name is required",
        });
        return;
    }

    koders.push(name);

    response.json(koders);
});    

// Borrar (delete) un Koder:
server.delete("/koders/:name", (request, response) => {
    console.log("params", request.params);

    const name = request.params.name;

    const newKoders = koders.filter((koder) => koder.toLowerCase() !== name.toLowerCase());
    koders = newKoders;

    response.json(koders);

});

// Reset de la lista:
server.delete("/koders", (request, response) => {
    koders = [];

    response.json(koders);
});

server.listen(8080, () => {
    console.log("Server is running on port 8080");
});



