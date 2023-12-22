const { User, PasswordHistory } = require('../../../database/models')
const bcrypt = require('bcrypt')
const Joi = require('joi')

const register = async (req, res) => {
  const { username, password, fullName, emailAddress } = req.body

  try {
    const userExist = await User.findOne({ where: { emailAddress } })
    if (userExist) {
      return res.status(401).json({ error: 'Este email possui uma conta.' })
    }

    // Validação dos dados de entrada usando Joi
    const schema = Joi.object({
      username: Joi.string().required(),
      emailAddress: Joi.string().email().required(),
      fullName: Joi.string().required(),
      password: Joi.string()
        .min(12)
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/
        )
        .required()
    })
    const { error } = schema.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const adminSystem = await User.create({
      username,
      passwordHash,
      fullName,
      emailAddress,
      jobTitle: "Admin",
      accessLevel: 3,
      isActive: true
    })
    const userId = adminSystem.id
    const changeDate = new Date()
    await PasswordHistory.create({
      userId,
      passwordHash,
      changeDate,
    })

    return res
      .status(201)
      .json({ message: 'User registered successfully', user: adminSystem })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Erro do servidor' })
  }
}

module.exports = { register }
