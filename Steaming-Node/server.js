const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const DB = require("./dataBase");
app.use(express.json());
DB();
const OtpSchema = require("./model");
const bcrypt = require("bcrypt");

//create the transport 
const transporter = nodemailer.createTransport(
    {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASS
        }

    }
)

// check the smbt server connections
async function checkTransport() {
    try {
        await transporter.verify(() => {
            console.log("SMTP  server is connected")
        })
    } catch (error) {
        console.log(error)
    }
}
checkTransport()

//send mail
async function sendEmail(req, res) {

    try {
        const { email } = req.body
        //generate the otp 
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(otp);


        //hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedOtp = await bcrypt.hash(otp, salt);


        const datas = { email: email, otp: hashedOtp }
        // update the otp schema

        await OtpSchema.findOneAndUpdate(
            { email: email },
            {
                otp: hashedOtp,
                expriesAt: new Date(Date.now() + 1 * 60 * 1000)
            },
            {
                returnDocument: "after",
                upsert: true
            }
        );

        //send the mail to the user
        async function sendMails(add, to, sub, html) {
            try {
                //create the mail formet 
                const info = await transporter.sendMail(
                    {
                        from: add,
                        to: to,
                        subject: "title",
                        text: sub, // plain text body
                        html: html,
                    }
                )
                console.log("Mail sent:", info.messageId);


            } catch (error) {
                console.log(error)
            }

        }

        const subject = "Thank you for visiting our website. We truly appreciate your time and interest in exploring what we have to offer. Your support means a lot to us, and we are committed to providing you with the best experience possible. If you have any questions, feedback, or need assistance, please feel free to reach out to our team at any time. We look forward to serving you again and hope you continue to enjoy our services. Thank you once again for choosing us"

        //html formet to the user with design
        const html = `
<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
  <table align="center" width="600" style="background-color: #ffffff; border-radius: 10px; overflow: hidden;">

    <!-- Header -->
    <tr>
      <td style="background-color: #4CAF50; padding: 20px; text-align: center; color: white;">
        <h2>OTP Verification 🔐</h2>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 30px; color: #333; text-align: center;">
        <h3>Hello 👋</h3>

        <p>Your One-Time Password (OTP) is:</p>

        <!-- OTP BOX -->
        <div style="
          font-size: 36px;
          font-weight: bold;
          letter-spacing: 8px;
          background-color: #f1f1f1;
          padding: 15px 25px;
          display: inline-block;
          border-radius: 8px;
          margin: 20px 0;
          color: #4CAF50;
        ">
          ${otp}
        </div>

        <p>This OTP is valid for <b>5 minutes</b>.</p>

        <p>If you did not request this, please ignore this email.</p>

        <p style="margin-top: 30px;">Best Regards,<br/>Your Team</p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #f1f1f1; text-align: center; padding: 15px; font-size: 12px; color: #777;">
        © 2026 Your Company | All Rights Reserved
      </td>
    </tr>

  </table>
</div>
`
        sendMails("hightechtamilofficial@gmail.com", email, subject, html)

        res.status(200).json({ message: `email: ${email} otp: ${otp}` })


    } catch (error) {
        res.status(400).json({ message: error.message })
    }


}



async function mailverification(req, res) {

    try {
        //destructure the email and otp in request
        const { email, otp } = req.body
        //find the email in the database
        const findEmailId = await OtpSchema.findOne({ email: email })
        //check the email valied or not
        if (!findEmailId) {
            res.status(200).json({ message: "Email not found", verification: false })
        }

        //checking the user opt and dabase opt
        if (otp !== findEmailId.otp) {
            return res.status(400).json({ message: "pleace enter verified otp", verification: false })
        }
        //after verification otp delete in the database
        await OtpSchema.deleteOne({ email: email })
        //sending the frontend otp is correct
        return res.status(200).json({ message: "correct otp", verification: true })


    } catch (error) {
        return res.status(400).json({ message: error.message })
    }


}
app.post("/mail", sendEmail)
app.post("/mailverification", mailverification)




app.listen(5000, () => {
    console.log("server is running")
})