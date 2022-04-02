const arg = require('minimist')(process.argv.slice(2))
const moduleObject = require('../lib/memo.cjs')
const dataPath = '../data/memo.json'

const memo = new moduleObject.Memo(dataPath)

function main () {
  if (arg.l) {
    memo.list()
  } else if (arg.r) {
    memo.refer()
  } else if (arg.d) {
    memo.delete()
  } else {
    memo.append()
  }
}

main()
