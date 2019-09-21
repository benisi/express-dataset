class Actor {
    constructor(dao) {
      this.dao = dao
    }
  
    createTable() {
      const sql = `
      CREATE TABLE IF NOT EXISTS actors (
        id INTEGER PRIMARY KEY,
        login INTEGER UNIQUE NOT NULL,
        avatar_url TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
      return this.dao.run(sql)
    }

    create(id, login, avatar_url) {
      return this.dao.run(
        `INSERT INTO actors (id, login, avatar_url)
          VALUES (?, ?, ?)`,
        [id, login, avatar_url])
    }

    update(actorData) {
      const { id, avatar_url } = actorData
      return this.dao.run(
        `UPDATE actors SET avatar_url = ? WHERE id = ?`,
        [avatar_url, id]
      )
    }

    getById(id) {
      return this.dao.get(
        `SELECT * FROM actors WHERE id = ?`,
        [id])
    }

    getAllActorsWithEventCount(){
      return this.dao.all(
        `SELECT a.id, a.login, a.avatar_url, COUNT(e.actor_id) AS event_count, e.created_at AS timestamp
         FROM actors a LEFT JOIN events e ON a.id = e.actor_id GROUP BY
         a.id ORDER BY
         event_count DESC, timestamp DESC, a.login;
         `)
    }

    dropTable() {
      const sql = `DROP TABLE IF EXISTS actors;`
      return this.dao.run(sql)
    }

    
  }
  
  module.exports = Actor;