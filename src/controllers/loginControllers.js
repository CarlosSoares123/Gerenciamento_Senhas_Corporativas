const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User, UserActions } = require('../../database/models')

const login = async (req, res) => {
  const { username, password } = req.body
  try {
    // Buscar usuário no banco de dados
    const user = await User.findOne({ where: { username } })
    let daysSinceLastChange = 0 // Defina uma valor padrão
    if (!user) {
      // Registro de tentativa de login malsucedida
      await UserActions.create({
        userId: null,
        actionName: 'Failed Login Attempt',
        details: 'User not found'
      })
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    if (user && user.passwordLastChanged) {
      daysSinceLastChange = Math.floor(
        (new Date() - user.passwordLastChanged) / (1000 * 60 * 60 * 24)
      )
      if (daysSinceLastChange >= 90) {
        // Senha expirada, bloquear conta ou exigir redefinição de senha
        await user.update({ isBlocked: true })

        return res.status(401).json({
          error: 'Password expired. Please reset your password.'
        })
      }
    }
    if (user && user.isBlocked) {
      return res
        .status(403)
        .json('Account is blocked. Please contact the administrator.')
    }
    // Verificar se a conta está bloqueada devido a várias tentativas malsucedidas
    const failedAttempts = await UserActions.count({
      where: {
        userId: user.id,
        actionName: 'Failed Login Attempt'
      }
    })
    if (user && failedAttempts >= 5) {
      await User.update({ isBlocked: true }, { where: { id: user.id } })
      await UserActions.create({
        userId: user.id,
        actionName: 'Account Blocked',
        details: 'Too many failed login attempts'
      })

      return res
        .status(401)
        .json({ error: 'Account locked due to multiple failed attempts' })
    }
    // Verificar a senha
    const passwordMatch = await bcrypt.compare(password, user.passwordHash)
    if (!passwordMatch) {
      // Registro de tentativa de login malsucedida
      await UserActions.create({
        userId: user.id,
        actionName: 'Failed Login Attempt',
        details: 'Incorrect password'
      })

      return res.status(401).json({ error: 'Invalid credentials' })
    }
    // Registro de login bem-sucedido
    await UserActions.create({
      userId: user.id,
      actionName: 'Login',
      details: 'Successful login'
    })
    // Eliminar as tentativas malsucedidas quando o usuário faz login com sucesso
    await UserActions.destroy({
      where: {
        userId: user.id,
        actionName: 'Failed Login Attempt'
      }
    })
    // Calcular dias restantes até a expiração da senha
    const daysUntilPasswordExpiration = 90 - daysSinceLastChange

    // Gerar um token de acesso
    const token = jwt.sign({ userId: user.id }, 'carlosSoares123@')

    // Envia o token no cabeçalho da resposta
    res.setHeader('Authorization', `Bearer ${token}`)
    return res.status(200).json({
      message: 'Login Bem feito',
      expiresIn: daysUntilPasswordExpiration,
      tokenValue: `Bearer ${token}`
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = { login }
