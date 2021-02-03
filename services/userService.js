const User = require("./../models/userModel");
const bcrypt = require("bcrypt");

class UserService {
  getUsers() {
    const users = User.find({}).exec();
    return users;
  }

  getUserById(id) {
    const user = User.findOne({ _id: id }).exec();
    return user;
  }

  async addUser(user) {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;

    const newUser = new User(user);
    return newUser.save();
  }

  getByName(name) {
    const query = User.findOne({ name }).exec();
    return query;
  }

  async editUser(id, data) {
    if (data.password) {
      const hash = await bcrypt.hash(data.password, 10);
      data.password = hash;
    } 

    const user = User.findByIdAndUpdate({ _id: id }, data).exec();
    return user;
  }

  async deleteUser(id) {
    const response = await User.deleteOne({ _id: id });
    //devuelve que está borrado por más que no exista ese id en la db
    //y {deletedCount: 0} en el console.log
    //para que no me diga borrado si el id no está en la db:
    if (response.deletedCount > 0) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = UserService;
