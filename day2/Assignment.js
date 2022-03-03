const  args  = require("yargs").argv;

var fs =  require("fs");

fs.readFile("filestack.txt",'utf8',(err,data)=>{

    if(err){ console.log(err)}
    else{

        console.log("Saved files are. \n",data);
    }

    const fileArray = data.split("\n"); 

    if(fileArray.indexOf(args.filename)===-1){

        fs.writeFile(args.filename+".txt","I am awsome" ,(err,res)=>
        {

            if(err)
            {
                 console.log(err)
                
                }
            else{
        
                console.log("New files is Saved.  \n",data);
                fs.writeFileSync("filestack.txt",args.filename+".txt \n");
            }


        });

    }
    else{

        console.log("File already  exist.");
    }
    

}


)