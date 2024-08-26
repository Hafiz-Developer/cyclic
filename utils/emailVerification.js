const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use any email service provider like Gmail, Yahoo, etc.
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS  // Your email password or app-specific password
    }
});

exports.sendVerificationEmail = async (email, token, type) => {
    try {
        let subject, text, html;

        if (type === 'password-reset') {
            subject = 'Password Reset';
            text = `Reset your password using the following link: http://localhost:${process.env.PORT}/api/users/reset-password?token=${token}`;
            html = `<p>Reset your password using the following link: <a href="http://localhost:${process.env.PORT}/api/users/reset-password?token=${token}">Reset Password</a></p>`;
        } else if (type === 'email-verification') {
            subject = 'Email Verification';
            text = `Your verification code is: ${token}`;
            html = `<p>Your verification code is: <strong>${token}</strong></p>`;
        } else if (type === 'email-change') {  // New case for email change
            subject = 'Email Change Verification';
            text = `Your email change verification code is: ${token}`;
            html = `<p>Your email change verification code is: <strong>${token}</strong></p>`;
        } else {
            console.error('Unknown email type:', type);
            throw new Error('Unknown email type');
        }

        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender address
            to: email,                    // Recipient address
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
