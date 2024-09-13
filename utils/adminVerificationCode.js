const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendVerificationEmail = async (email, token, type, fullName) => {
  try {
    let subject, text, html;

    if (type === "email-verification") {
      subject = "Admin Add Email Verification";
      text = `Admin Name ${fullName},\n\n verification code is: ${token}\n\n Don't share this code any person,\n\n Thank you!`;
      html = `<p>Admin Name <strong>${fullName}</strong>,</p>
                    <p>Verification code is: <strong>${token}</strong></p>
                    <p>Don't share this code any person</p>
                    <p>Thank you!</p>`;
    } else {
      throw new Error("Unknown email type");
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, 
      subject,
      text,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`${subject} email sent to:`, email);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Could not send verification email.");
  }
};
