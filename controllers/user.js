const db = require('../models')
const { User, Token } = db

const userService = {
  async fetchUserInfo (req, res) {
    const { userId } = req.body
    const user = await User.findByPk(userId, { include: [Token] })
    res.json(user.toJSON())
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
