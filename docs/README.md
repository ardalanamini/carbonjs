# API Reference

Instead of modifying the native `Date.prototype`, Carbon.js creates a wrapper for the Date object, called `Carbon` object.

The `Carbon` object is immutable, that is, all API operations that change the `Carbon` object in some way will return a new instance of it.

## Table of Content <!-- omit in toc -->

- [Parsing](#parsing)
  - [Constructor](#constructor)
    - [List of all available parse formats](#list-of-all-available-parse-formats)
    - [ISO 8601 string](#iso-8601-string)
    - [Unix Timestamp (milliseconds since the Unix Epoch - Jan 1 1970, 12AM UTC)](#unix-timestamp-milliseconds-since-the-unix-epoch---jan-1-1970-12am-utc)
    - [Native Javascript Date object](#native-javascript-date-object)
  - [Clone](#clone)
  - [Validation](#validation)
- [Get and Set](#get-and-set)
  - [Year](#year)
  - [Month](#month)
  - [Day of the Month](#day-of-the-month)
  - [Day of the Week](#day-of-the-week)
  - [Hour](#hour)
  - [Minute](#minute)
  - [Second](#second)
  - [Millisecond](#millisecond)
  - [Set](#set)
    - [List of all available units](#list-of-all-available-units)
- [Manipulating](#manipulating)
  - [Add](#add)
  - [Subtract](#subtract)
  - [Start of Time](#start-of-time)
  - [End of Time](#end-of-time)
- [Displaying](#displaying)
  - [Format](#format)
    - [List of all available formats](#list-of-all-available-formats)
  - [Difference](#difference)
  - [Unix Timestamp (milliseconds)](#unix-timestamp-milliseconds)
  - [Unix Timestamp (seconds)](#unix-timestamp-seconds)
  - [Days in the Month](#days-in-the-month)
  - [As Javascript Date](#as-javascript-date)
  - [As Array](#as-array)
  - [As JSON](#as-json)
  - [As ISO 8601 String](#as-iso-8601-string)
  - [As Object](#as-object)
  - [As String](#as-string)
- [Query](#query)
  - [Is Before](#is-before)
  - [Is Same](#is-same)
  - [Is After](#is-after)
  - [Is a Carbonjs](#is-a-carbonjs)
- [Internationalization](#internationalization)
- [Plugin APIs](#plugin-apis)
  - [Day of Year](#day-of-year)
  - [Is Between](#is-between)
  - [Leap Year](#leap-year)
  - [Relative Time](#relative-time)
  - [Week of Year](#week-of-year)
- [Calendars API (used as plugin)](#calendars-api-used-as-plugin)
  - [Islamic Calendar](#islamic-calendar)
  - [Jalaali Calendar](#jalaali-calendar)

## Parsing

### Constructor

`new Carbon(input?: string | number | Date | Carbon, format?: string, locale?: string)`

or

`Carbon.parse(input?: string | number | Date | Carbon, format?: string, locale?: string)`

Calling it without parameters returns a fresh `Carbon` object with the current date and time.

```javascript
new Carbon();

Carbon.parse();

new Carbon();

Carbon.parse("2018-22-1", "YYYY-DD-MM");

new Carbon("2018-22-1", "YYYY-DD-MM", "es");
```

#### List of all available parse formats

| Format | Output           | Description                       |
| ------ | ---------------- | --------------------------------- |
| `YY`   | 18               | Two-digit year                    |
| `YYYY` | 2018             | Four-digit year                   |
| `M`    | 1-12             | The month, beginning at 1         |
| `MM`   | 01-12            | The month, 2-digits               |
| `MMM`  | Jan-Dec          | The abbreviated month name        |
| `MMMM` | January-December | The full month name               |
| `D`    | 1-31             | The day of the month              |
| `DD`   | 01-31            | The day of the month, 2-digits    |
| `H`    | 0-23             | The hour                          |
| `HH`   | 00-23            | The hour, 2-digits                |
| `h`    | 1-12             | The hour, 12-hour clock           |
| `hh`   | 01-12            | The hour, 12-hour clock, 2-digits |
| `m`    | 0-59             | The minute                        |
| `mm`   | 00-59            | The minute, 2-digits              |
| `s`    | 0-59             | The second                        |
| `ss`   | 00-59            | The second, 2-digits              |
| `SSS`  | 000-999          | The millisecond, 3-digits         |
| `A`    | AM/PM            | -                                 |
| `a`    | am/pm            | -                                 |

Carbon.js also parses other date formats by default.

#### [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) string

```javascript
Carbon.parse('2018-04-04T16:00:00.000Z');
```

#### Unix Timestamp (milliseconds since the Unix Epoch - Jan 1 1970, 12AM UTC)

```javascript
new Carbon(1318781876406);
```

#### Native Javascript Date object

```javascript
Carbon.parse(new Date(2018, 8, 18));
```

### Clone

`.clone() | new Carbon(original: Carbon) | Carbon.parse(original: Carbon)`

Returns a cloned `Carbon`.

```javascript
Carbon.parse().clone();

// passing a Carbonjs object to a constructor will also clone it
new Carbon(Carbon.parse('2019-01-25'));
```

### Validation

`.isValid()`

Returns a `boolean` indicating whether the `Carbon`'s date is valid.

```javascript
Carbon.parse().isValid();
```

## Get and Set

### Year

`.year()`

Returns a `number` representing the `Carbon`'s year.

```javascript
Carbon.parse().year();
```

### Month

`.month()`

Returns a `number` representing the `Carbon`'s month.

```javascript
Carbon.parse().month();
```

### Day of the Month

`.day()`

Returns a `number` representing the `Carbon`'s day of the month.

```javascript
Carbon.parse().day();
```

### Day of the Week

`.weekday()`

Returns a `number` representing the `Carbon`'s day of the week

```javascript
Carbon.parse().weekday();
```

### Hour

`.hour()`

Returns a `number` representing the `Carbon`'s hour.

```javascript
Carbon.parse().hour();
```

### Minute

`.minute()`

Returns a `number` representing the `Carbon`'s minute.

```javascript
Carbon.parse().minute();
```

### Second

`.second()`

Returns a `number` representing the `Carbon`'s second.

```javascript
Carbon.parse().second();
```

### Millisecond

`.millisecond()`

Returns a `number` representing the `Carbon`'s millisecond.

```javascript
Carbon.parse().millisecond();
```

### Set

`.set(unit: string, value: number)`

Returns a `Carbon` with the applied changes.

```javascript
Carbon.parse().set('day', 1);
Carbon.parse().set('month', 3); // April
Carbon.parse().set('second', 30);
```

#### List of all available units

| Unit          | Shorthand | Description                              |
| ------------- | --------- | ---------------------------------------- |
| `day`         | `d`       | Day of Month                             |
| `weekday`     | -         | Day of Week (Sunday as 0, Saturday as 6) |
| `month`       | `M`       | Month                                    |
| `year`        | `y`       | Year                                     |
| `hour`        | `h`       | Hour                                     |
| `minute`      | `m`       | Minute                                   |
| `second`      | `s`       | Second                                   |
| `millisecond` | `ms`      | Millisecond                              |

## Manipulating

`Carbon` objects can be manipulated in many ways.

```javascript
Carbon.parse('2019-01-25')
  .add(1, 'day')
  .subtract(1, 'year')
  .toString(); // Fri, 26 Jan 2018 00:00:00 GMT
```

### Add

`.add(value: number, unit: string)`

Returns a cloned `Carbon` with a specified amount of time added.

```javascript
Carbon.parse().add(7, 'day');
```

### Subtract

`.subtract(value: number, unit: string)`

Returns a cloned `Carbon` with a specified amount of time subtracted.

```javascript
Carbon.parse().subtract(7, 'year');
```

### Start of Time

`.startOf(unit: string)`

Returns a cloned `Carbon` set to the start of the specified unit of time.

```javascript
Carbon.parse().startOf('week');
```

### End of Time

`.endOf(unit: string)`

Returns a cloned `Carbon` set to the end of the specified unit of time.

```javascript
Carbon.parse().endOf('month');
```

## Displaying

### Format

`.format(stringWithTokens: string)`

Returns a `string` with the `Carbon`'s formatted date.
To escape characters, wrap them in square (e.g. `[G]`).

```javascript
Carbon.parse().format(); // current date in ISO6801, without fraction seconds e.g. '2020-04-02T08:02:17-05:00'

Carbon.parse('2019-01-25').format('{YYYY} MM-DDTHH:mm:ssZ[Z]'); // '{2019} 01-25T00:00:00-02:00Z'

Carbon.parse('2019-01-25').format('DD/MM/YYYY'); // '25/01/2019'
```

#### List of all available formats

| Format | Output           | Description                           |
| ------ | ---------------- | ------------------------------------- |
| `YY`   | 18               | Two-digit year                        |
| `YYYY` | 2018             | Four-digit year                       |
| `M`    | 1-12             | The month, beginning at 1             |
| `MM`   | 01-12            | The month, 2-digits                   |
| `MMM`  | Jan-Dec          | The abbreviated month name            |
| `MMMM` | January-December | The full month name                   |
| `D`    | 1-31             | The day of the month                  |
| `DD`   | 01-31            | The day of the month, 2-digits        |
| `d`    | 0-6              | The day of the week, with Sunday as 0 |
| `dd`   | Su-Sa            | The min name of the day of the week   |
| `ddd`  | Sun-Sat          | The short name of the day of the week |
| `dddd` | Sunday-Saturday  | The name of the day of the week       |
| `H`    | 0-23             | The hour                              |
| `HH`   | 00-23            | The hour, 2-digits                    |
| `h`    | 1-12             | The hour, 12-hour clock               |
| `hh`   | 01-12            | The hour, 12-hour clock, 2-digits     |
| `m`    | 0-59             | The minute                            |
| `mm`   | 00-59            | The minute, 2-digits                  |
| `s`    | 0-59             | The second                            |
| `ss`   | 00-59            | The second, 2-digits                  |
| `SSS`  | 000-999          | The millisecond, 3-digits             |
| `Z`    | +5:00            | The offset from UTC                   |
| `ZZ`   | +0500            | The offset from UTC, 2-digits         |
| `A`    | AM/PM            | -                                     |
| `a`    | am/pm            | -                                     |

- More available formats `Q Do k kk X x ...` in plugin [`AdvancedFormat`](./Plugins.md#advanced-format)

### Difference

`.diff(compared: Carbon, unit: string (default: 'milliseconds'), float?: boolean)`

Returns a `number` indicating the difference of two `Carbon`s in the specified unit.

```javascript
const date1 = Carbon.parse('2019-01-25');
const date2 = Carbon.parse('2018-06-05');
date1.diff(date2); // 20214000000
date1.diff(date2, 'months'); // 7
date1.diff(date2, 'months', true); // 7.645161290322581
date1.diff(date2, 'days'); // 233
```

### Unix Timestamp (milliseconds)

`.valueOf()`

Returns the `number` of milliseconds since the Unix Epoch for the `Carbon`.

```javascript
Carbon.parse('2019-01-25').valueOf(); // 1548381600000
```

### Unix Timestamp (seconds)

`.unix()`

Returns the `number` of seconds since the Unix Epoch for the `Carbon`.

```javascript
Carbon.parse('2019-01-25').unix(); // 1548381600
```

### Days in the Month

`.daysInMonth()`

Returns the `number` of days in the `Carbon`'s month.

```javascript
Carbon.parse('2019-01-25').daysInMonth(); // 31
```

### As Javascript Date

`.toDate()`

Returns a copy of the native `Date` object parsed from the `Carbon` object.

```javascript
Carbon.parse('2019-01-25').toDate();
```

### As Array

`.toArray()`

Returns an `array` that mirrors the parameters from new Date().

```javascript
Carbon.parse('2019-01-25').toArray(); // [ 2019, 0, 25, 0, 0, 0, 0 ]
```

### As JSON

`.toJSON()`

Returns the `Carbon` formatted in an ISO8601 `string`.

```javascript
Carbon.parse('2019-01-25').toJSON(); // '2019-01-25T02:00:00.000Z'
```

### As ISO 8601 String

`.toISOString()`

Returns the `Carbon` formatted in an ISO8601 `string`.

```javascript
Carbon.parse('2019-01-25').toISOString(); // '2019-01-25T02:00:00.000Z'
```

### As Object

`.toObject()`

Returns an `object` with the date's properties.

```javascript
Carbon.parse('2019-01-25').toObject();
/* { years: 2019,
     months: 0,
     date: 25,
     hours: 0,
     minutes: 0,
     seconds: 0,
     milliseconds: 0 } */
```

### As String

`.toString()`

Returns a `string` representation of the date.

```javascript
Carbon.parse('2019-01-25').toString(); // 'Fri, 25 Jan 2019 02:00:00 GMT'
```

## Query

### Is Before

`.isBefore(compared: Carbon)`

Returns a `boolean` indicating whether the `Carbon`'s date is before the other supplied `Carbon`'s.

```javascript
Carbon.parse().isBefore(Carbon.parse()); // false
```

### Is Same

`.isSame(compared: Carbonjs)`

Returns a `boolean` indicating whether the `Carbon`'s date is the same as the other supplied `Carbon`'s.

```javascript
Carbon.parse().isSame(Carbon.parse()); // true
```

### Is After

`.isAfter(compared: Carbonjs)`

Returns a `boolean` indicating whether the `Carbon`'s date is after the other supplied `Carbon`'s.

```javascript
Carbon.parse().isAfter(Carbon.parse()); // false
```

### Is a Carbonjs

`.isCarbon(compared: any)`

Returns a `boolean` indicating whether a variable is a `Carbon` object or not.

```javascript
Carbon.isCarbon(Carbon.parse()); // true
Carbon.isCarbon(new Date()); // false
```

## Internationalization

Carbon.js has great support for internationalization. see the docs [here](./I18n.md)

## Plugin APIs

Any plugin will be loaded only once

### Day of Year

`.dayOfYear` to get day of the year

plugin [`DayOfYear`](./Plugins.md#day-of-year)

### Is Between

`.isBetween` to check if a date is between two other dates

plugin [`IsBetween`](./Plugins.md#is-between)

### Leap Year

`.isLeapYear` to get is a leap year or not

plugin [`LeapYear`](./Plugins.md#leap-year)

### Relative Time

`.from` `.to` `.fromNow` `.toNow` to get relative time

plugin [`RelativeTime`](./Plugins.md#relative-time)

### Week of Year

`.weekOfYear` to get week of the year

plugin [`WeekOfYear`](./Plugins.md#week-of-year)

## Calendars API (used as plugin)

### Islamic Calendar

To parse, manipulate and format islamic calendar dates

plugin [`IslamicCalendar`](./Calendars.md#islamic)

### Jalaali Calendar

To parse, manipulate and format jalaali (persian) calendar dates

plugin [`JalaaliCalendar`](./Calendars.md#jalaali)
