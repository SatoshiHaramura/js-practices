class DataStorage {
  constructor (fileName) {
    this.fileName = fileName
    this.fs = require('fs')
    this.json = this.fs.readFileSync(this.fileName, 'utf8')
  }

  write (json) {
    this.fs.writeFileSync(this.fileName, JSON.stringify(json))
  }
}

module.exports.DataStorage = DataStorage
