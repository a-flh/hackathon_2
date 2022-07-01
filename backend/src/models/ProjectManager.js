const AbstractManager = require("./AbstractManager");

class ProjectManager extends AbstractManager {
  static table = "project";

  insert(project) {
    return this.connection.query(
      `insert into ${ProjectManager.table} (name, customer, description, startDate, state, currentMembers) values (?, ?, ?, ?, ?, ?)`,
      [
        project.name,
        project.customer,
        project.description,
        project.startDate,
        project.state,
        project.currentMembers,
      ]
    );
  }

  /* insertMember(project) {
    return this.connection.query(
      `insert into ${ProjectManager.table} currentMembers values ? where id = ?`,
      [project.currentMembers, project.id]
    );
  } */

  update(project) {
    return this.connection.query(
      `update ${ProjectManager.table} set currentMembers = ? where id = ?`,
      [project.currentMembers, project.id]
    );
  }
}

module.exports = ProjectManager;
