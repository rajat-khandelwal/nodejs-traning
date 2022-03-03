
var express = require("express");

var fs = require("fs");
const app = express();
const port = 4000;

app.get("/", (request,response)=>{

    response.send("the app is strated now.");

});

app.get("/getemployee", (request,response)=>{

    fs.readFile("getemployee.json",(err,data)=>{

        if(err) throw err; 

        response.send(JSON.parse(data));
    });

});

app.listen(port,(err)=>{

    if(err) throw err;
    
    console.log("the server is strated " , port);
    
    } );