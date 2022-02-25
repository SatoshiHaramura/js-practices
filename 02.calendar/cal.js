#!/usr/bin/env node

const { DateTime } = require('luxon')
const argv = require('minimist')(process.argv.slice(2))
class Calendar {
  constructor (argv) {
    this.year = argv.y || DateTime.now().year
    this.month = argv.m || DateTime.now().month
    this.date = DateTime.fromObject({ year: this.year, month: this.month })
  }

  display () {
    const dates = []
    for (let i = 0; i < this.date.daysInMonth; i++) {
      dates[i] = this.date.plus({ days: i })
    }

    console.log(`      ${this.month}月 ${this.year}`)
    console.log('日 月 火 水 木 金 土')
    process.stdout.write('   '.repeat(this.date.weekday))
    for (const date of dates) {
      process.stdout.write(String(date.day).toString().padStart(2, ' '))
      date.weekday === 6 ? process.stdout.write('\n') : process.stdout.write(' ')
    }
    process.stdout.write('\n')
  }
}

const calendar = new Calendar(argv)
calendar.display()
