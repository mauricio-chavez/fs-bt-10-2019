const sqlite = require('sqlite3').verbose()

class Database {
  constructor(filename) {
    this.db = new sqlite.Database(filename, err => {
      if (err) throw err
    })
  }

  getConnection() {
    if (!this.db) throw new Error('Not connection available')
    return this.db
  }

  close() {
    this.db.close()
  }
}

module.exports = Database
