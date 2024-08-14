const  nodemailer = require('nodemailer');
const {SMTPMAIL,SMTPPASSWORD } = process.env;

const sendMail = async(email,mailSubject,content)=>{
    try{
const transport =nodemailer.createTransport({
    host :'smtp.gmail.com',
    port : 587,
    secure:false,
    requireTLS:true,
    auth:{
         user: SMTPMAIL,
         pass : SMTPPASSWORD
    }

});

const mailOptions = {
    from : SMTPMAIL,
    to: email,
   subject :  mailSubject,
   html:content
}

transport.sendMail(mailOptions,function(error,info){
    if(error){
        console.log(error)
    }else{
        console.log('Mail send successfully',info.response);
    }
})

 } catch(error){
        console.log(error.message);
    }
}

module.exports = sendMail;

