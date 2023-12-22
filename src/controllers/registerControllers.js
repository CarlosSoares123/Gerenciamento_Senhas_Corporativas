const { User, PasswordHistory } = require('../../database/models')
const { sendWelcomeEmail } = require('../utils/emailUtils')
const bcrypt = require('bcrypt')
const Joi = require('joi')

const register = async (req, res) => {
  const { username, fullName, email, jobTitle, accessLevel, isActive } = req.body
  try {
    const user = await User.findOne({ where: { emailAddress: email } })
    if (user) {
      res
        .status(401)
        .json({ message: 'Existe um usuario com esses este email' })
    }
    const schema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      fullName: Joi.string().required(),
      jobTitle: Joi.string().required(),
      accessLevel: Joi.number().required(),
      isActive: Joi.boolean().required()
    })
    const { error } = schema.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }


    const generatedPassword = Math.random().toString(36).slice(-12)
    const passwordHash = await bcrypt.hash(generatedPassword, 10)
    const passwordLastChanged = new Date()
    const newUser = await User.create({
      username: username,
      passwordHash,
      fullName,
      emailAddress: email,
      jobTitle,
      accessLevel,
      isActive,
      passwordLastChanged
    })
    const userId = newUser.id
    const changeDate = new Date()
    await PasswordHistory.create({
      userId,
      passwordHash,
      changeDate
    })

    // Enviar e-mail de boas-vindas com a senha gerada
    sendWelcomeEmail(email, username, generatedPassword)

    return res
      .status(201)
      .json({ message: 'User registered successfully', user: newUser })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = {
  register
}
