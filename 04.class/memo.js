const arg = require('minimist')(process.argv.slice(2))
const { Select } = require('enquirer')
const fileName = 'memo.json'

class Memo {
  constructor(fileName) {
    this.dataStorage = new DataStorage(fileName)
    this.memos = JSON.parse(this.dataStorage.json)
  }

  append () {
    process.stdin.setEncoding('utf8')

    const lines = []

    const reader = require('readline').createInterface({
      input: process.stdin
    })

    reader.on('line', (line) => {
      lines.push(line)
    })

    reader.on('close', () => {
      this.memos.push(lines)
      this.dataStorage.write(this.memos)
    })
  }

  list () {
    this.memos.forEach((value, index) => console.log(value[0]))
  }

  refer () {
    const prompt = new Select({
      message: 'Choose a note you want to see:',
      choices: this.#collectMemoFirstLine(),
      result () {
        return this.focused.value
      }
    })

    prompt.run()
      .then((answer) => {
        let index = answer
        if (typeof answer === 'string') {
          index = 0
        }
        this.memos[index].forEach(value => console.log(value))
      })
      .catch(console.error)
  }

  delete () {
    const prompt = new Select({
      message: 'Choose a note you want to delete:',
      choices: this.#collectMemoFirstLine(),
      result () {
        return this.focused.value
      }
    })

    prompt.run()
      .then((answer) => {
        this.memos.splice(answer, 1)
        this.dataStorage.write(this.memos)
      })
      .catch(console.error)
  }

  #collectMemoFirstLine() {
    return this.memos.map((val, index) => ({ name: val[0], value: index }))
  }
}

class DataStorage {
  constructor(fileName) {
    this.fileName = fileName
    this.fs = require('fs')
    this.json = this.fs.readFileSync(this.fileName, 'utf8')
  }

  write(json) {
    this.fs.writeFileSync(this.fileName, JSON.stringify(json))
  }
}

const memo = new Memo(fileName)

if (arg.l) {
  memo.list()
} else if (arg.r) {
  memo.refer()
} else if (arg.d) {
  memo.delete()
} else {
  memo.append()
}
