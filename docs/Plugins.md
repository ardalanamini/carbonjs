# Plugin List

A plugin is an independent module that can be added to Carbon.js to extend functionality or add new features.

By default, Carbon.js comes with core code only and no installed plugin.

You can load multiple plugins based on your need.

## Table of Content <!-- omit in toc -->

- [API](#api)
  - [Extend](#extend)
- [Installation](#installation)
- [List of official plugins](#list-of-official-plugins)
  - [Advanced Format](#advanced-format)
  - [Day Of Year](#day-of-year)
  - [Is Between](#is-between)
  - [Leap Year](#leap-year)
  - [Relative Time](#relative-time)
    - [Time from now](#time-from-now)
    - [Time from X](#time-from-x)
    - [Time to now](#time-to-now)
    - [Time to X](#time-to-x)
  - [Week Of Year](#week-of-year)
- [Customize](#customize)

## API

### Extend

* Returns Carbon

Use a plugin.

```javascript
import plugin;

Carbon.extend(plugin);
Carbon.extend(plugin, options); // with plugin options
```

## Installation

```typescript
import * as Carbon from 'carbonjs'
import * as AdvancedFormat from 'carbonjs/lib/plugins/Advanced-format' // load on demand

Carbon.extend(AdvancedFormat) // use plugin
```

## List of official plugins

### Advanced Format

* AdvancedFormat extends `Carbon.parse().format` API to supply more format options.

```typescript
import * as advancedFormat from 'carbonjs/lib/plugins/advanced-format'

Carbon.extend(advancedFormat)

Carbon.parse().format('Q Do k kk X x')
```

List of added formats:

| Format | Output | Description |
|--------|--------|-------------|
| `Q` | 1-4 | Quarter |
| `Do` | 1st 2nd ... 31st | Day of Month with ordinal |
| `k` | 1-23 | The hour, beginning at 1 |
| `kk` | 01-23 | The hour, 2-digits, beginning at 1 |
| `X` | 1360013296 | Unix Timestamp in second |
| `x` | 1360013296123 | Unix Timestamp in millisecond |

### Day Of Year

* WeekOfYear adds `.dayOfYear()` API to returns a `number` indicating the `Carbon`'s day of the year.

```javascript
import dayOfYear from 'carbonjs/lib/plugins/day-of-year'

Carbon.extend(dayOfYear)

new Carbon('2018-01-31').dayOfYear() // 31
```

### Is Between

* IsBetween adds `.isBetween()` API to returns a `boolean` indicating if a date is between two other dates.

```javascript
import isBetween from 'carbonjs/lib/plugins/is-between'

Carbon.extend(isBetween)

Carbon.parse('2010-10-20').isBetween('2010-10-19', new Carbon('2010-10-25')); // true
```

### Leap Year

* IsLeapYear adds `.isLeapYear` API to returns a `boolean` indicating whether the `Carbon`'s year is a leap year or not.

```typescript
import * as leapYear from 'carbonjs/lib/plugins/leap-year'

Carbon.extend(leapYear)

Carbon.parse('2000-01-01').isLeapYear(); // true
```

### Relative Time

* RelativeTime adds `.from` `.to` `.fromNow` `.toNow` APIs to formats date to relative time strings (e.g. 3 hours ago).

```typescript
import * as relativeTime from 'carbonjs/lib/plugins/relative-time'

Carbon.extend(relativeTime)

Carbon.parse().from(Carbon.parse('1990')) // 2 years ago
Carbon.parse().from(Carbon.parse(), true) // 2 years

Carbon.parse().fromNow()

Carbon.parse().to(Carbon.parse())

Carbon.parse().toNow()
```

#### Time from now

`.fromNow(withoutSuffix?: boolean)`

Returns the `string` of relative time from now.

#### Time from X

`.from(compared: Carbon, withoutSuffix?: boolean)`

Returns the `string` of relative time from X.

#### Time to now

`.toNow(withoutSuffix?: boolean)`

Returns the `string` of relative time to now.

#### Time to X

`.to(compared: Carbon, withoutSuffix?: boolean)`

Returns the `string` of relative time to X.

| Range | Key | Sample Output |
|-------|-----|---------------|
| 0 to 44 seconds | s | a few seconds ago |
| 45 to 89 seconds | m | a minute ago |
| 90 seconds to 44 minutes | mm | 2 minutes ago ... 44 minutes ago |
| 45 to 89 minutes | h | an hour ago |
| 90 minutes to 21 hours | hh | 2 hours ago ... 21 hours ago |
| 22 to 35 hours | d | a day ago |
| 36 hours to 25 days | dd | 2 days ago ... 25 days ago |
| 26 to 45 days | M | a month ago |
| 46 days to 10 months | MM | 2 months ago ... 10 months ago |
| 11 months to 17months | y | a year ago |
| 18 months+ | yy | 2 years ago ... 20 years ago |

### Week Of Year

* WeekOfYear adds `.weekOfYear()` API to returns a `number` indicating the `Carbon`'s week of the year.

```javascript
import weekOfYear from 'carbonjs/lib/plugins/week-of-year'

Carbon.extend(weekOfYear)

new Carbon('06/27/2018').weekOfYear() // 26
```

## Customize

You could build your own Carbon.js plugin to meet different needs.

Feel free to open a pull request to share your plugin.

Template of a Carbon.js plugin.

```javascript
module.exports = (Base, options) => {
  const proto = Base.prototype;

  // extend Carbon
  // e.g. add Carbon.isSameOrBefore()
  proto.isSameOrBefore = function (arguments) {}

  // overriding existing API
  // e.g. extend Carbon.parse().format()
  const oldFormat = proto.format
  proto.format = function (arguments) {
    // original format result
    const result = oldFormat.apply(this, arguments)
    // return modified result
  }
}
```
