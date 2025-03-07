import { atom, StoreValue } from 'nanostores'
import { equal } from 'uvu/assert'
import { test } from 'uvu'

import { formatter } from '../index.js'

test('has number and date formatter', () => {
  let locale = atom('en')
  let format = formatter(locale)

  let f: StoreValue<typeof format> | undefined
  format.subscribe(value => {
    f = value
  })
  if (typeof f === 'undefined') throw new Error('t was not set')

  equal(f.number(10000), '10,000')
  equal(f.time(new Date(86400000)), '1/2/1970')

  if (!process.version.startsWith('v12.')) {
    locale.set('ru')
    equal(f.number(10000), '10 000')
    equal(f.time(new Date(86400000)), '02.01.1970')
  }
})

test.run()
