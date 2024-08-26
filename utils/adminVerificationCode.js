const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail', // or any other email service provider
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendVerificationEmail = async (email, token, type, fullName) => {
    try {
        let subject, text, html;

        if (type === 'email-verification') {
            subject = 'Email Verification';
            text = `Hello ${fullName},\n\nYour verification code is: ${token}\n\nThank you!`;
            html = `<p>Hello <strong>${fullName}</strong>,</p>
                    <p>Your verification code is: <strong>${token}</strong></p>
                    <p>Thank you!</p>`;
        } else {
            throw new Error('Unknown email type');
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email, // The email address specified in EMAIL_USER
            subject,
            text,
            html
        };

        await transporter.sendMail(mailOptions);
        console.log(`${subject} email sent to:`, email);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Could not send verification email.');
    }
};
