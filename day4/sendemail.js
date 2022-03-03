const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'randi.kunze90@ethereal.email',
        pass: 'Xbf5XzNBQSJ7a3xJ26'
    }
});


module.exports.SendMail=async function(){

    let info = await transporter.sendMail({
        from: 'randi.kunze90@ethereal.email',
        to: "randi.kunze90@ethereal.email", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}