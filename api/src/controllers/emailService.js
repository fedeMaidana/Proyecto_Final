const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Usa la contraseña de aplicación generada
    },
});


async function sendWelcomeEmail(to) {
    try {
        await transporter.sendMail({
            from: `"Custom Craft" <${process.env.EMAIL_USER}>`,
            to,
            subject: '¡Bienvenido a Custom Craft!',
            text: 'Gracias por registrarte en Custom Craft. ¡Esperamos que disfrutes de nuestra aplicación!',
        });
        console.log('Correo electrónico de bienvenida enviado');
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
    }
}

module.exports = { sendWelcomeEmail };
