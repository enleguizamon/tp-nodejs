class UserController {
  constructor(userService) {
    this.userService = userService;
  }
  //función para cuando necesite chequear la forma correcta de un objectId.
  isValidObjectId(id) {
    const ObjectID = require("mongodb").ObjectID;
    return ObjectID.isValid(id);
  }

  async getUsers(req, res) {
    try {
      const users = await this.userService.getUsers();
      if (users) {
        return res.status(200).json(users);
      } else {
        return res.status(400).send("no hay usuarios");
      }
    } catch (e) {
      console.log(e);
      res.status(500).send("error inesperado");
    }
  }

  async getUserById(req, res) {
    const { id } = req.params;

    if (!this.isValidObjectId(id)) {
      return res.status(400).send("ingrese un id válido");
    }

    try {
      const userById = await this.userService.getUserById(id);
      if (userById) {
        return res.status(200).json(userById);
      } else {
        return res.status(404).send("id inexistente");
      }
    } catch (e) {
      console.log(e);
      res.status(500).send("error inesperado");
    }
  }

  async addUser(req, res) {
    const { body } = req;
    const name = body.name.toLowerCase();

    if (!body.name || !body.password) {
      return res.status(401).send("nombre y password requeridos");
    }

    try {
      const response = await this.userService.addUser({ ...body, name });
      if (response) {
        return res.status(201).send("usuario creado");
      } else {
        return res.status(400).send("error en la creación del usuario");
      }
    } catch (e) {
      console.log(e);
      res.status(500).send("error inesperado");
    }
  }

  loginUser(req, res) {
    return res.status(200).send("usuario logueado");
  }

  async editUser(req, res) {
    const { id } = req.params;
    const { data } = req.body;

    if (!this.isValidObjectId(id)) {
      return res.status(400).send("ingrese un id válido");
    }

    try {
      const modified = await this.userService.editUser(id, data);

      if (modified) {
        return res.status(200).send("se editó el usuario");
      } else {
        return res.status(404).send("id inexistente");
      }
    } catch (e) {
      console.log(e);
      res.status(500).send("error inesperado");
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;

    if (!this.isValidObjectId(id)) {
      return res.status(400).send("ingrese un id válido");
    }

    try {
      const deleted = await this.userService.deleteUser(id);

      if (deleted) {
        console.log(deleted);
        return res.status(200).send("se borró el usuario");
      } else {
        return res.status(404).send("no se pudo borrar el usuario");
      }
    } catch (e) {
      console.log(e);
      res.status(500).send("error inesperado");
    }
  }
}

module.exports = UserController;
