const User = require("../models/UserModel");

class UserController {

  async index(req, res) {
    const user = await User.find();
    user.filter( (item) => {
      if(item.username === req.query.username && item.password === req.query.password){
        return res.redirect('/cad');
      }
    })
    return res.redirect('/');
  }

  async store(req, res) {
    let login = req.body.login,
        password = req.body.password;
    if(login !== "" && password !== ""){
        req.session.login = 'teste';
        const user = await User.create(req.body);
        return res.redirect('/');
      }
    else {
        const user = await User.create(req.body);
        return res.redirect('/cad');
    }
  }
  async show(req, res) {
    const user = await User.findById(req.params.id);
    return res.json(user);
  }
}

module.exports = new UserController();