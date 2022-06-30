const AbstractManager = require("./AbstractManager");

class ProjectManager extends AbstractManager {
  static table = "project";

  insert(project) {
    return this.connection.query(
      `insert into ${ProjectManager.table} (name, customer, description, startDate, state) values (?, ?, ?, ?, ?)`,
      [
        project.name,
        project.customer,
        project.description,
        project.startDate,
        project.state,
      ]
    );
  }

  update(project) {
    return this.connection.query(
      `update ${ProjectManager.table} set title = ? where id = ?`,
      [project.title, project.id]
    );
  }
}

module.exports = ProjectManager;
