const db = require('../models')
const { User } = db

const userService = {
  async fetchUserInfo (req, res) {
    const { userId } = req.body
    const user = await User.findByPk(userId)
    const { id, name, email, droneId } = user.toJSON()
    res.json({
      id,
      name,
      email,
      droneId
    })
  }

  // TODO: /user/edit
  /*
  async editUserInfo (req, res) {
    const { name, droneId } = req.body
  },

  // TODO: /user/edit/password
  async editUserPassword (req, res) {
    const { currentPassword, newPassword, checkNewPassword } = req.body
  }
  */
}

module.exports = userService
