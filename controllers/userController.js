const mongodb = require("../data/database");

const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const result = await mongodb.getDatabase().db().collection("users").find();
    const users = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message || "Error occurred while retrieving users" });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("users")
      .find({ _id: userId });
    const users = await result.toArray();

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users[0]);
  } catch (error) {
    res.status(500).json({ message: error.message || "Error occurred while retrieving user" });
  }
};

const createUser = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      city: req.body.city,
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("users")
      .insertOne(user);

    if (response.acknowledged) {
      res.status(201).json({ id: response.insertedId, message: "User created successfully" });
    } else {
      res.status(500).json({ message: "Failed to create user" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Error occurred while creating user" });
  }
};

const updateUser = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const userId = new ObjectId(req.params.id);

    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      city: req.body.city,
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("users")
      .replaceOne(
        {
          _id: userId,
        },
        user
      );

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(200).json({ message: "No changes made to user" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Error occurred while updating user" });
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const userId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("users")
      .deleteOne({
        _id: userId,
      });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Error occurred while deleting user" });
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
