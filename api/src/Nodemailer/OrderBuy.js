const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Configura el servicio de correo (puede ser otro)
        auth: {
            user: 'tu_correo@gmail.com', // Cambia esto
            pass: 'tu_contraseña', // Cambia esto
        },
    });

    const mailOptions = {
        from: 'tu_correo@gmail.com',
        to: to,
        subject: subject,
        text: text,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo electrónico enviado:', info.response);
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
    }
};

module.exports = { sendEmail };
