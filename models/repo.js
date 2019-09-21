class Repo {
    constructor(dao) {
      this.dao = dao
    }
  
    createTable() {
      const sql = `
      CREATE TABLE IF NOT EXISTS repos (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        url TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
      return this.dao.run(sql)
    }

    create(id, name, url) {
      return this.dao.run(
        `INSERT INTO repos (id, name, url)
          VALUES (?, ?, ?)`,
        [id, name, url])
    }
    getById(id) {
      return this.dao.get(
        `SELECT * FROM repos WHERE id = ?`,
        [id])
    }

    dropTable() {
        const sql = `DROP TABLE IF EXISTS repos;`
        return this.dao.run(sql)
      }
  }
  
  module.exports = Repo;