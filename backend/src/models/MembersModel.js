const AbstractManager = require("./AbstractManager");

class MembersManager extends AbstractManager {
  static table = "member";

  insert(member) {
    return this.connection.query(
      `insert into ${MembersManager.table} (firstname, lastname, phoneNumber, email, password, skills, agency) values (?, ?, ?, ?, ?, ?, ?)`,
      [
        member.firstname,
        member.lastname,
        member.phoneNumber,
        member.email,
        member.password,
        member.skills,
        member.agency,
      ]
    );
  }

  findByEmail(member) {
    return this.connection
      .query(`SELECT * FROM ${MembersManager.table} WHERE email = ?`, [
        member.email,
      ])
      .then((res) => res[0]);
  }

  findById(member) {
    return this.connection
      .query(`SELECT * FROM ${MembersManager.table} WHERE id = ?`, [member.id])
      .then((res) => res[0]);
  }

  update(member) {
    return this.connection.query(
      `update ${MembersManager.table} set phoneNumber = ?, email = ?, password = ? where id = ?`,
      [member.phoneNumber, member.email, member.password, member.id]
    );
  }
}

module.exports = MembersManager;
