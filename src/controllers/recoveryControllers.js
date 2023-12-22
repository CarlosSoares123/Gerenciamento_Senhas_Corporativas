const {
  User,
  RecoveryToken,
  UserActions,
  PasswordHistory
} = require('../../database/models')
const { generateToken, verifyToken } = require('../utils/tokenUtils')
const { sendRecoveryEmail } = require('../utils/emailUtils') 
const bcrypt = require('bcrypt')

const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body

    // Verificar se o e-mail está associado a um usuário
    const user = await User.findOne({ where: { emailAddress: email } })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Criar e armazenar um token de recuperação
    const resetToken = generateToken({ userId: user.id })

    // Definir a data de expiração (por exemplo, 1 hora a partir de agora)
    const expiresIn = new Date()
    expiresIn.setHours(expiresIn.getHours() + 1)

    await RecoveryToken.create({
      userId: user.id,
      tokenValue: resetToken,
      expiryDate: expiresIn
    })

    
    sendRecoveryEmail(email, resetToken)

    res.status(200).json({ message: 'Password reset request successful'})
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body

    // Verificar a validade do token
    const recoveryToken = await RecoveryToken.findOne({ where: { tokenValue: token } })

    if (!recoveryToken || !verifyToken(token)) {
      return res.status(400).json({ error: 'Invalid or expired token' })
    }
    
    // Compara as senhas 
    const passwordHistory = await PasswordHistory.findAll({
      where: {
        userId: recoveryToken.userId
      }
    })
    const isNewPasswordValid = passwordHistory.every((entry) => {
      return !bcrypt.compareSync(newPassword, entry.passwordHash)
    })
    if (!isNewPasswordValid) {
      return res.status(400).json({ error: 'A nova senha não pode ser uma senha anterior.' })
    }


    const user = await User.findByPk(recoveryToken.userId)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    user.passwordHash = hashedPassword
    await user.save()
  const changeDate = new Date()
    await PasswordHistory.create({
      userId: user.id,
      passwordHash: hashedPassword,
      changeDate
    })

    // Remover o token de recuperação após o uso
    await recoveryToken.destroy()

    await UserActions.create({
      userId: user.id,
      actionName: 'resetPassword',
      details: 'Successful'
    })

    res.status(200).json({ message: 'Password reset successful' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = { requestPasswordReset, resetPassword }