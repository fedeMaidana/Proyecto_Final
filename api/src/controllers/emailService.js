const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function sendWelcomeEmail(to) {
    try {
        await transporter.sendMail({
            from: `"Custom Craft" <${process.env.EMAIL_USER}>`,
            to,
            subject: '¡Bienvenido a Custom Craft!',
            text: `¡Hola!\n\nBienvenido a Custom Craft, tu plataforma creativa para llevar tus ideas al siguiente nivel. Estamos emocionados de tenerte como parte de nuestra comunidad.\n\nAquí encontrarás herramientas excepcionales para dar vida a tus diseños y crear productos únicos. Siempre estamos aquí para ayudarte y responder a cualquier pregunta que puedas tener.\n\n¡Disfruta explorando y creando en Custom Craft!\n\nSaludos,\nEl equipo de Custom Craft`,
        });
        console.log('Correo electrónico de bienvenida enviado');
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
    }
}

module.exports = { sendWelcomeEmail };
