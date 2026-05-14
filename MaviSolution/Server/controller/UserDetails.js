const nodemailer = require("nodemailer");
const UserSchema = require("../models/UserSchema");
require("dotenv").config();

// ================= SMTP TRANSPORT =================

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS,
  },
});

// ================= CHECK SMTP =================

async function checkTransport() {
  try {
    await transporter.verify();
    console.log("✅ SMTP Server Connected");
  } catch (error) {
    console.log("❌ SMTP Error:", error);
  }
}

checkTransport();

// ================= USER CONTROLLER =================

async function UserData(req, res) {

  try {

    const {
      name,
      email,
      phone,
      service,
      message,
    } = req.body;

    // ================= SAVE USER =================

    const newUser = new UserSchema({
      name,
      email,
      phone,
      service,
      message,
    });

    await newUser.save();

    // ================= EMAIL HTML =================

    const html = `
<div style="font-family:Arial;padding:20px;background:#f4f4f4;">

<table align="center" width="600" 
style="background:white;border-radius:10px;overflow:hidden;">

<tr>
<td style="background:#1E88E5;color:white;padding:20px;text-align:center;">
<h2>New Client Inquiry 📩</h2>
</td>
</tr>

<tr>
<td style="padding:30px;">

<h3>Client Details</h3>

<table width="100%" cellpadding="10">

<tr style="background:#f9f9f9;">
<td><b>Name</b></td>
<td>${name}</td>
</tr>

<tr>
<td><b>Email</b></td>
<td>${email}</td>
</tr>

<tr style="background:#f9f9f9;">
<td><b>Phone</b></td>
<td>${phone}</td>
</tr>

<tr>
<td><b>Service</b></td>
<td>${service}</td>
</tr>

<tr style="background:#f9f9f9;">
<td><b>Message</b></td>
<td>${message}</td>
</tr>

</table>

<p style="margin-top:20px;">
Please contact the client soon.
</p>

</td>
</tr>

</table>

</div>
`;

    // ================= SEND MAIL TO ADMIN =================

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: "jai34563@gmail.com",
      subject: "New Client Inquiry",
      html: html,
    });

    // ================= RESPONSE =================

    res.status(200).json({
      success: true,
      message: "Form submitted and mail sent successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  UserData,
};