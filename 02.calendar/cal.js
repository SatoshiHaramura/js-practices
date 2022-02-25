#!/usr/bin/env node

const { DateTime } = require('luxon')

const argv = require('minimist')(process.argv.slice(2))
const dt = DateTime.now()
const date = DateTime.fromObject({ year: argv.y ? argv.y : dt.year, month: argv.m ? argv.m : dt.month })

const dates = []
for (let i = 0; i < date.daysInMonth; i++) {
  dates[i] = date.plus({ days: i })
}

console.log(`      ${date.month}月 ${date.year}`)
console.log('日 月 火 水 木 金 土')
process.stdout.write('   '.repeat(date.weekday))
for (const date of dates) {
  process.stdout.write(String(date.day).toString().padStart(2, ' '))
  date.weekday === 6 ? process.stdout.write('\n') : process.stdout.write(' ')
}
process.stdout.write('\n')
