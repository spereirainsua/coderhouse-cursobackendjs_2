import { createTransport } from "nodemailer"

const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASS,
    },
})

const ofRegister = async ({ email, verifyCode }) =>
    await transport.sendMail({
        from: `eCommerce SPI <${process.env.GOOGLE_EMAIL}>`,
        to: email,
        subject: "MAIL DE VERIFICACION DE CUENTA",
        html: `<h1>CÓDIGO PARA VERIFICAR LA CUENTA: ${verifyCode}</h1>`,
    })

const ofRecovery = async ({ email, verificationUrl }) => {
    await transport.sendMail({
        from: `eCommerce SPI - Recuperar contraseña <${process.env.GOOGLE_EMAIL}>`,
        to: email,
        subject: "MAIL DE RECUPERACIÓN DE CUENTA",
        html: `<h1>Ingresa al siguiente enlace para recuperar tu contraseña: ${verificationUrl}</h1>`,
    })
}

export default { ofRegister, ofRecovery }