const fs = require('fs')
const arg = require('minimist')(process.argv.slice(2))

const { Select } = require('enquirer')

const memoFile = 'memo.json'
const json = fs.readFileSync(memoFile, 'utf8')
const memos = JSON.parse(json)

class Memo {
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
      memos.push(lines)
      fs.writeFileSync(memoFile, JSON.stringify(memos))
    })
  }

  list () {
    memos.forEach((value, index) => { console.log(value[0]) })
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
        memos[index].forEach(value => console.log(value))
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
        memos.splice(answer, 1)
        fs.writeFileSync(memoFile, JSON.stringify(memos))
      })
      .catch(console.error)
  }

  #collectMemoFirstLine() {
    return memos.map((val, index) => { return { name: val[0], value: index } })
  }
}

const memo = new Memo(arg)

if (arg.l) {
  memo.list()
} else if (arg.r) {
  memo.refer()
} else if (arg.d) {
  memo.delete()
} else {
  memo.append()
}
