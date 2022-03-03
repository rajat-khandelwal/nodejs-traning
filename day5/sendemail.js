const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'marjory.sporer50@ethereal.email',
        pass: '7yw7yNBucjxsN85kjF'
    }
});

const mailOptions ={
    from:"marjory.sporer50@ethereal.email",
    to:"reginald.upton77@ethereal.email",
    subject:"Node Mailer training session",
    text:" Hello from node mailer"
}


transporter.sendMail(mailOptions, (err,info)=>{
    if(err){
        throw err;
    }else{
        console.log("email:sent "+info.response)
    }
})