const nodemailer = require("nodemailer");
require("dotenv").config()

const mailSender = async( email,template,title)=>{
    try{
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        });


        let info = await transporter.sendMail({
            from : "StudyNotion",
            to:`${email}`,
            subject:`${title}`,
            html:`${template}`,

        })
        console.log(info);
        return info;
    }
    catch(err){
        console.log("Error occured in sending mail");    
        console.error(err);

    }
}

module.exports= mailSender;

