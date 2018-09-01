# Calendar List

Calendars are just plugins but with bigger impact

## Table of Content <!-- omit in toc -->

- [General Calendar Impacts](#general-calendar-impacts)
  - [Year](#year)
  - [Month](#month)
  - [Day of the Month](#day-of-the-month)
  - [Days in the Month](#days-in-the-month)
  - [Day of the Year](#day-of-the-year)
  - [Loaded plugins (also extended)](#loaded-plugins-also-extended)
    - [Leap Year](#leap-year)
    - [Week of Year](#week-of-year)
- [List of official calendars](#list-of-official-calendars)
  - [Islamic](#islamic)
    - [Parse/Format](#parseformat)
    - [Add](#add)
    - [Set](#set)
    - [StartOf/EndOf](#startofendof)
  - [Jalaali](#jalaali)
    - [Parse/Format](#parseformat-1)
    - [Add](#add-1)
    - [Set](#set-1)
    - [StartOf/EndOf](#startofendof-1)

## General Calendar Impacts

### Year

`.year(calendar?: string)`

Returns a `number` representing the `Carbon`'s desired calendar year.

```javascript
Carbon.parse().year("jalaali");
```

### Month

`.month(calendar?: string)`

Returns a `number` representing the `Carbon`'s desired calendar month.

```javascript
Carbon.parse().month("islamic");
```

### Day of the Month

`.day(calendar?: string)`

Returns a `number` representing the `Carbon`'s day of the desired calendar month.

```javascript
Carbon.parse().day("jalaali");
```

### Days in the Month

`.daysInMonth(calendar?: string)`

Returns a `number` representing the `Carbon`'s days in the desired calendar month.

```javascript
Carbon.parse().daysInMonth("islamic");
```

### Day of the Year

`.dayOfYear(calendar?: string)`

Returns a `number` representing the `Carbon`'s day of the desired calendar year.

```javascript
Carbon.parse().dayOfYear("jalaali");
```

### Loaded plugins (also extended)

#### Leap Year

`.isLeapYear(calendar?: string)`

Returns a `boolean` indicating whether the `Carbon`'s desired calendar year is a leap year or not.

```javascript
Carbon.parse().isLeapYear("islamic");
```

#### Week of Year

`.weekOfYear(calendar?: string)`

Returns a `number` indicating the `Carbon`'s week of the desired calendar year.

```javascript
Carbon.parse().weekOfYear("jalaali");
```

## List of official calendars

Current calendar algorithms are based on [Formilab's Calendar Converter](https://www.fourmilab.ch/documents/calendar) which seemed more accurate

### Islamic

Islamic (Hijri) Calendar is the lunar calendar used by Muslims everywhere to determine the proper days on which to observe the annual fasting, to attend Hajj, and to celebrate other Islamic holidays and festivals.

#### Parse/Format

List of extended parsing/formating format tokens

| Format  | Output           | Description                    |
| ------- | ---------------- | ------------------------------ |
| `iYY`   | 18               | Two-digit year                 |
| `iYYYY` | 2018             | Four-digit year                |
| `iM`    | 1-12             | The month, beginning at 1      |
| `iMM`   | 01-12            | The month, 2-digits            |
| `iMMM`  | Jan-Dec          | The abbreviated month name     |
| `iMMMM` | January-December | The full month name            |
| `iD`    | 1-31             | The day of the month           |
| `iDD`   | 01-31            | The day of the month, 2-digits |

#### Add

List of extended adding units

| Unit     | Shorthand | Description |
| -------- | --------- | ----------- |
| `iMonth` | `iM`      | Month       |
| `iYear`  | `iY`      | Year        |

#### Set

List of extended setting units

| Unit     | Shorthand | Description  |
| -------- | --------- | ------------ |
| `iDay`   | `iD`      | Day of Month |
| `iMonth` | `iM`      | Month        |
| `iYear`  | `iY`      | Year         |

#### StartOf/EndOf

List of extended edge units

| Unit     | Shorthand | Description |
| -------- | --------- | ----------- |
| `iMonth` | `iM`      | Month       |
| `iYear`  | `iY`      | Year        |

### Jalaali

Jalaali calendar is a solar calendar that was used in Persia, variants of which today are still in use in Iran as well as Afghanistan.

#### Parse/Format

List of extended parsing/formating format tokens

| Format  | Output           | Description                    |
| ------- | ---------------- | ------------------------------ |
| `jYY`   | 18               | Two-digit year                 |
| `jYYYY` | 2018             | Four-digit year                |
| `jM`    | 1-12             | The month, beginning at 1      |
| `jMM`   | 01-12            | The month, 2-digits            |
| `jMMM`  | Jan-Dec          | The abbreviated month name     |
| `jMMMM` | January-December | The full month name            |
| `jD`    | 1-31             | The day of the month           |
| `jDD`   | 01-31            | The day of the month, 2-digits |

#### Add

List of extended adding units

| Unit     | Shorthand | Description |
| -------- | --------- | ----------- |
| `jMonth` | `jM`      | Month       |
| `jYear`  | `jY`      | Year        |

#### Set

List of extended setting units

| Unit     | Shorthand | Description  |
| -------- | --------- | ------------ |
| `jDay`   | `jD`      | Day of Month |
| `jMonth` | `jM`      | Month        |
| `jYear`  | `jY`      | Year         |

#### StartOf/EndOf

List of extended edge units

| Unit     | Shorthand | Description |
| -------- | --------- | ----------- |
| `jMonth` | `jM`      | Month       |
| `jYear`  | `jY`      | Year        |
