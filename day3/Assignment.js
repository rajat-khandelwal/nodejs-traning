const { json } = require("express");
var express = require("express");
var fs = require("fs");
const { getPriority } = require("os");
var app = express();
var port = 4000;

function GetEmployee() {

    var data = fs.readFileSync("employee.json");
    return JSON.parse(data.toString());
}

function GetProject() {

    var data = fs.readFileSync("project.json");
    return JSON.parse(data.toString());
}


app.get("/", (req, res) => {

    res.send("Server Started");
});

app.get("/Getemployee", (req, res) => {

    var employee = GetEmployee();

    res.send(employee);

})

app.get("/Getproject", (req, res) => {

    var project = GetProject();
    res.send(project);

})


app.get("/GetEmployeeDetails/:id", (req, res) => {

    var project = GetProject();
    var employee = GetEmployee();
    var empObject = employee.filter(function (el) {
        return el.id === req.params.id;
    })[0];

    if(empObject){
    var projectobj = project.filter((p) => {
      
       return p.prjid.toString().toLowerCase().trim() === empObject.prjid.toString().toLowerCase().trim()
    });


    var result = { employee: empObject, project: projectobj }

    res.send(result);
}
else{
    res.send("Employee Not Found");
}

})


app.listen(port, (err) => {
    if (err) {
        throw err;

    }
    console.log("Server Started port 4000");
});

