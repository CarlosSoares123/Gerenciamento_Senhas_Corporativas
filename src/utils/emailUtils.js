const nodemailer = require('nodemailer')

const emailConfig = {
  service: 'gmail',
  auth: {
    user: 'caclas003@gmail.com',
    pass: 'awvn shtr rqfk djwx'
  }
}

const transporter = nodemailer.createTransport(emailConfig)

const sendRecoveryEmail = (toEmail, resetToken) => {
  const mailOptions = {
    from: 'caclas003@gmail.com',
    to: toEmail,
    subject: 'Recuperação de Senha',
    text: `Use o seguinte token para recuperar sua senha: ${resetToken}`
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar e-mail:', error)
    } else {
      console.log('E-mail enviado:', info.response)
    }
  })
}

const sendWelcomeEmail = (toEmail, username, generatedPassword) => {
  const mailOptions = {
    from: 'caclas003@gmail.com',
    to: toEmail,
    subject: 'Bem-vindo à Empresa XYZ',
    html: (
      `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; text-align: center;">
          Bem-vindo à Empresa XYZ!
        </h2>
        <p>Olá ${username},</p>
        <p>
          Agradecemos por se juntar à nossa equipe na Empresa XYZ. Estamos
          empolgados em tê-lo conosco!
        </p>
        <p>
          Seu login para o sistema foi criado com sucesso. Aqui estão algumas
          informações importantes:
        </p>

        <ul>
          <li>
            <strong>Nome de usuário:</strong> ${username}
          </li>
          <li>
            <strong>Senha temporária:</strong> ${generatedPassword}
          </li>
        </ul>

        <p>
          Recomendamos que você faça login o mais rápido possível usando essas
          credenciais. Após o login, sugerimos que você atualize sua senha e
          configure seu perfil.
        </p>

        <p>
          Fique à vontade para explorar nosso sistema e, se tiver alguma dúvida,
          entre em contato conosco.
        </p>

        <p>Atenciosamente,</p>
        <p>Equipe XYZ</p>
      </div>`
    )
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar e-mail de boas-vindas:', error)
    } else {
      console.log('E-mail de boas-vindas enviado:', info.response)
    }
  })
}

module.exports = { sendRecoveryEmail, sendWelcomeEmail }
