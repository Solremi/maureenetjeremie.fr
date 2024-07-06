import nodemailer from 'nodemailer';
import 'dotenv/config';

export const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // Uses STARTTLS
    tls: {
        ciphers: 'TLSv1.2',
        rejectUnauthorized: true
    },
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendInvitationEmail = async (userEmail) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'Inscription to mariage Maureen et Jérémie!',
        text: `L'email suivant essaie de s'inscrire sur le site : ${userEmail}`,
    };

    return transporter.sendMail(mailOptions);
};


