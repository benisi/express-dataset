class Event {
    constructor(dao) {
      this.dao = dao
    }
  
    createTable() {
      const sql = `
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY,
        type TEXT NOT NULL,
        actor_id INTEGER NOT NULL,
        repo_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(actor_id) REFERENCES actors(id) ON DELETE CASCADE,
        FOREIGN KEY(repo_id) REFERENCES repos(id) ON DELETE CASCADE
        )`
      return this.dao.run(sql)
    }

    create(id, type, actor_id, repo_id, created_at) {
      return this.dao.run(
        `INSERT INTO events (id, type, actor_id, repo_id, created_at)
          VALUES (?, ?, ?, ?, ?)`,
        [id, type, actor_id, repo_id, created_at])
    }

    deleteAll(){
      return this.dao.run(
        `DELETE FROM events`);
    }

    getById(id) {
      return this.dao.get(
        `SELECT * FROM events WHERE id = ?`,
        [id])
    }

    getAll() {
      return this.dao.all(
        `SELECT a.*, r.*, e.id, e.type, a.id AS actor_id, r.id AS repo_id
         FROM events e INNER JOIN actors a ON e.actor_id = a.id INNER JOIN repos r ON e.repo_id = r.id ORDER BY id ASC
         `)
    }

    getAllByActorId(actor_id){
      return this.dao.all(
        `SELECT a.*, r.*, e.id, e.type, a.id AS actor_id, r.id AS repo_id 
         FROM events e INNER JOIN actors a ON e.actor_id = a.id 
         INNER JOIN repos r ON e.repo_id = r.id WHERE actor_id = ? ORDER BY id ASC`,
        [actor_id])
    }

    dropTable() {
        const sql = `DROP TABLE IF EXISTS events;`
        return this.dao.run(sql)
      }
  }
  
  module.exports = Event;