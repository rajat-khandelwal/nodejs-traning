const  fs = require("fs");

fs.stat("filestack.txt","r+",(err,stats)=>{

    console.log(stats);

    console.log(stats.isfile());
    console.log(stats.isDirectory());

})