
var express = require("express");

var fs = require("fs");
const app = express();
const port = 4000;

app.get("/", (request,response)=>{

    response.send("the app is strated now.");

});

app.get("/getemployee", (request,response)=>{

    fs.readFile("filestack.txt",(err,data)=>{

        response.send(data.toString());
    });

});

app.get("/getemployee2", (request,response)=>{

    fs.readFile("meranaam.txt",(err,data)=>{

        response.send(data.toString());
    });

});

app.listen(port,(err)=>{

if(err) throw err;

console.log("the server is strated " , port);

} );