const nodemailer = require("nodemailer");

const sendMail = async (options) => {
    console.log("mailing")
    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: "gmail",
        auth:{
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    const res=await transporter.sendMail(mailOptions)
    console.log("mailed")
};

module.exports = sendMail;