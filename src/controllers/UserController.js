const User = require("../models/UserModel");

class UserController {

  async index(req, res) {
    const user = await User.find();
    console.log(user)
    return res.json(user);
  }

  async store(req, res) {
    let login = req.body.login,
        password = req.body.password;
    if(login === "" && password === ""){
        req.session.login = 'teste';
        const user = await User.create(req.body);
        return res.json(user);
    }
    else {
        const user = await User.create(req.body);
        return res.json(user);
    }
  }
  async show(req, res) {
    const user = await User.findById(req.params.id);
    return res.json(user);
  }
}

module.exports = new UserController();