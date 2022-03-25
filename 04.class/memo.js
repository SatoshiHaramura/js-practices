const fs = require('fs')
const argv = require('minimist')(process.argv.slice(2))

const { Select } = require('enquirer')

const memoFile = 'memo.json'
const json = fs.readFileSync(memoFile, 'utf8')
const memos = JSON.parse(json)

if (argv.l) {
  memos.forEach((value, index) => { console.log(value[0]) })
} else if (argv.r) {
  const prompt = new Select({
    message: 'Choose a note you want to see:',
    choices: memos.map((val, index) => { return { name: val[0], value: index } }),
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
} else if (argv.d) {
  const prompt = new Select({
    message: 'Choose a note you want to delete:',
    choices: memos.map((val, index) => { return { name: val[0], value: index } }),
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
} else {
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
