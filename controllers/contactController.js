const mongodb = require("../data/database");

const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Contacts']
  try {
    const result = await mongodb.getDatabase().db().collection("contacts").find();
    const contacts = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message || "Error occurred while retrieving contacts" });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Contacts']
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("contacts")
      .find({ _id: contactId });
    const contacts = await result.toArray();

    if (contacts.length === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts[0]);
  } catch (error) {
    res.status(500).json({ message: error.message || "Error occurred while retrieving contact" });
  }
};

const createContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      company: req.body.company,
      notes: req.body.notes,
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("contacts")
      .insertOne(contact);

    if (response.acknowledged) {
      res.status(201).json({ id: response.insertedId, message: "Contact created successfully" });
    } else {
      res.status(500).json({ message: "Failed to create contact" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Error occurred while creating contact" });
  }
};

const updateContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  try {
    const contactId = new ObjectId(req.params.id);

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      company: req.body.company,
      notes: req.body.notes,
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("contacts")
      .replaceOne(
        {
          _id: contactId,
        },
        contact
      );

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(200).json({ message: "No changes made to contact" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Error occurred while updating contact" });
  }
};

const deleteContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  try {
    const contactId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("contacts")
      .deleteOne({
        _id: contactId,
      });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Error occurred while deleting contact" });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
