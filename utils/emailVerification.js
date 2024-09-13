const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS 
    }
});

exports.sendVerificationEmail = async (email, token, type) => {
    try {
        let subject, text, html;

        if (type === 'password-reset') {
            subject = 'Password Reset';
            text = `Reset your password using the following link: ${process.env.WEBSITE_URL}/reset-password?token=${token}`;
            html = `<p>Reset your password using the following link: <a href="${process.env.WEBSITE_URL}/reset-password?token=${token}">Reset Password</a></p>`;
        } else if (type === 'email-verification') {
            subject = 'Email Verification';
            text = `Your verification code is: ${token}`;
            html = `<p>Your verification code is: <strong>${token}</strong></p>`;
        } else if (type === 'email-change') { 
            subject = 'Email Change Verification';
            text = `Your email change verification code is: ${token}`;
            html = `<p>Your email change verification code is: <strong>${token}</strong></p>`;
        } else {
            console.error('Unknown email type:', type);
            throw new Error('Unknown email type');
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,                    
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
