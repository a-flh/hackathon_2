require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../models");

class MembersController {
  static browse = (req, res) => {
    models.member
      .findAll()
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static read = (req, res) => {
    const member = req.body;
    member.id = parseInt(req.params.id, 10);

    models.member
      .findById(member)
      .then(([rows]) => {
        if (rows == null) {
          res.sendStatus(404);
        } else {
          res.send(rows);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static edit = async (req, res) => {
    const { phoneNumber, email, password } = req.body;
    const id = parseInt(req.params.id, 10);
    const hash = await bcrypt.hash(password, 10);

    models.member
      .update({ id, phoneNumber, email, password: hash })
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static add = async (req, res) => {
    const {
      firstname,
      lastname,
      email,
      phoneNumber,
      password,
      skills,
      agency,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const findByEmail = await models.member.findByEmail(email);
    try {
      if (findByEmail.length > 0) {
        return res.status(400).json({
          status: 400,
          message: "Email already exists",
        });
      }
      models.member
        .insert({
          firstname,
          lastname,
          email,
          phoneNumber,
          password: hash,
          skills,
          agency,
        })
        .then((result) => {
          res.status(201).send({
            id: result[0].insertId,
            message: "member created",
          });
        })
        .catch((err) => {
          console.error(err.message);
          res.sendStatus(500);
        });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
    return "";
  };

  static login = async (req, res) => {
    const { email, password } = req.body;

    models.member
      .findByEmail({ email, password })
      .then(async (result) => {
        if (result.length === 0) {
          return result.status(400).json({
            status: 400,
            message: "member not found",
          });
        }
        const isPasswordValid = await bcrypt.compare(
          password,
          result[0].password
        );
        if (!isPasswordValid) {
          return res.status(400).json({
            status: 400,
            message: "Password is incorrect",
          });
        }
        const token = jwt.sign(
          {
            id: result[0].id,
            email: result[0].email,
          },
          process.env.SECRET_JWT,
          {
            expiresIn: "1h",
          }
        );
        return res.cookie("apsideMemberToken", token).json({
          message: "member logged",
          role: result[0].role,
          id: result[0].id,
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ status: "error", message: err.message });
      });
    return "";
  };

  static logout = async (req, res) => {
    try {
      return res
        .clearCookie("apsideMemberToken")
        .status(200)
        .json({ message: "Logout successful" });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

  static delete = (req, res) => {
    models.member
      .delete(req.params.id)
      .then(() => {
        res.status(204).json({ message: "member deleted" });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
}

module.exports = MembersController;
