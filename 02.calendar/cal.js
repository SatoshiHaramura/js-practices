#!/usr/bin/env node

const { DateTime } = require('luxon')
const argv = require('minimist')(process.argv.slice(2))

class Cal {
  constructor (argv) {
    this.year = argv.y || DateTime.now().year
    this.month = argv.m || DateTime.now().month
    this.date = DateTime.fromObject({ year: this.year, month: this.month })
  }

  display () {
    const str = [
      `      ${this.month}月 ${this.year}`,
      '日 月 火 水 木 金 土',
      this.body()
    ].join('\n')

    process.stdout.write(str + '\n')
  }

  body () {
    const dates = []
    for (let i = 0; i < this.date.daysInMonth; i++) {
      dates[i] = this.date.plus({ days: i })
    }

    let str = ''
    dates.forEach(date => {
      const day = String(date.day).padStart(2, ' ')
      str += (date.weekday === 6) ? (day + '\n') : (day + ' ')
    })

    const blanks = '   '.repeat(this.date.weekday)

    return blanks + str
  }
}

const cal = new Cal(argv)
cal.display()
