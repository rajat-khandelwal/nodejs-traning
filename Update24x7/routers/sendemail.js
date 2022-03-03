const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'abner.bechtelar38@ethereal.email',
        pass: 'qp3AptqjpmJQDtSPWq'
    }
});

module.exports.SendMail=async function(mailobject){

    let info = await transporter.sendMail({
        from: 'abner.bechtelar38@ethereal.email',
        replyTo:'abner.bechtelar38@ethereal.email',
        to: mailobject.email, // list of receivers
        subject: mailobject.subject, // Subject line
        text: mailobject.message, // plain text body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}