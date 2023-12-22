const { User, UserActions } = require('../../../database/models')

const isAdmin = async userId => {
  const user = await User.findByPk(userId)
  return user && user.accessLevel === 3 // Assumindo que 3 é o nível de acesso do administrador
}

const getUsers = async (req, res) => {
  const adminId = req.user.userId

  try {
    if (!(await isAdmin(adminId))) {
      return res.status(403).json({
        error: 'Apenas o administrador do sistema pode acessar esse endpoint'
      })
    }

    const users = await User.findAll({})
    return res.status(200).json(users)
  } catch (error) {
    res.status(500).json('Erro ao buscar os usuarios.')
  }
}

const getUserId = async (req, res) => {
  const adminId = req.user.userId
  
  try {
    if (!(await isAdmin(adminId))) {
      return res.status(403).json({
        error: 'Apenas o administrador do sistema pode acessar esse endpoint'
      })
    }


    const userId = req.params.id
    const userSelect = await User.findByPk(userId)
    if (!userSelect) {
      return res.status(404).json({ error: 'Usuario nao encontrado ' })
    }

    return res.status(200).json(userSelect)
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ error: 'Erro ao buscar as Actividades dos Usuarios' })
  }
}

const getUserActivities = async (req, res) => {
  const adminId = req.user.userId
  
  try {
    if (!(await isAdmin(adminId))) {
      return res.status(403).json({
        error: 'Apenas o administrador do sistema pode acessar esse endpoint'
      })
    }

    const userId = req.params.id
    if (!userId) {
      return res.status(500).json({ error: 'Usuário não encontrado' })
    }

    const userActivities = await User.findByPk(userId, {
      attributes: ['username', 'emailAddress', 'id'],
      include: [
        {
          model: UserActions,
          attributes: ['actionName', 'details'],
          order: [['createdAt', 'DESC']]
        }
      ]
    })

    if (!userActivities) {
      return res.status(404).json({ error: 'Usuário não encontrado.' })
    }

    return res.status(200).json(userActivities)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Erro interno do servidor.' })
  }
}

const getActivityUsers = async (req, res) => {
  const adminId = req.user.userId
  
  try {
    if (!(await isAdmin(adminId))) {
      return res.status(403).json({
        error: 'Apenas o administrador do sistema pode acessar esse endpoint'
      })
    }

    const allActions = await UserActions.findAll({
      attributes: [
        'id',
        'userId',
        'actionName',
        'details',
        'createdAt',
        'updatedAt'
      ],
      include: [
        {
          model: User,
          attributes: ['username', 'emailAddress']
        }
      ],
      order: [['createdAt', 'DESC']]
    })

    return res.status(200).json(allActions)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Erro interno do servidor.' })
  }
}

const updateUsers = async (req, res) => {
  const adminId = req.user.userId
  
  try {
    if (!(await isAdmin(adminId))) {
      return res.status(403).json({
        error: 'Apenas o administrador do sistema pode acessar esse endpoint'
      })
    }

    const userId = req.params.id
    const { isBlocked } = req.body

    const userSelect = await User.findByPk(userId)
    if (!userSelect) {
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }

    await User.update({ isBlocked }, { where: { id: userId } })

    const statusMessage = isBlocked ? 'bloqueado' : 'desbloqueado'
    return res
      .status(200)
      .json({ message: `Usuário ${statusMessage} com sucesso.` })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Erro interno do servidor.' })
  }
}

const deleteUser = async (req, res) => {
  const userId = req.params.id
  
  try {
    if (!(await isAdmin(adminId))) {
      return res.status(403).json({
        error: 'Apenas o administrador do sistema pode acessar esse endpoint'
      })
    }

    const userToDelete = await User.findByPk(userId)

    if (!userToDelete) {
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }

    await userToDelete.destroy()

    return res.status(200).json({ message: 'Usuário excluído com sucesso.' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Erro interno do servidor.' })
  }
}

module.exports = {
  getUsers,
  getUserId,
  getUserActivities,
  getActivityUsers,
  updateUsers,
  deleteUser
}
