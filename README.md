# carbonjs [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Typescript%20ready%20date%20library%20alternative%20to%20Moment&url=https://github.com/ardalanamini/carbonjs&via=ardalanamini&hashtags=carbonjs,nodejs,dayjs,moment,typescript,date,time,immutable,developers,fast)

Typescript ready date library alternative to Moment.js

[![Npm Version](https://img.shields.io/npm/v/carbonjs.svg)](https://www.npmjs.com/package/carbonjs)
[![TypeScript Version](https://img.shields.io/npm/types/carbonjs.svg)](https://www.typescriptlang.org)
[![Build Status](https://api.travis-ci.com/ardalanamini/carbonjs.svg?branch=master)](https://travis-ci.com/ardalanamini/carbonjs)
[![Coverage Status](https://codecov.io/gh/ardalanamini/carbonjs/branch/master/graph/badge.svg)](https://codecov.io/gh/ardalanamini/carbonjs)
[![Package Quality](https://npm.packagequality.com/shield/carbonjs.svg)](https://packagequality.com/#?package=carbonjs)
[![Npm Total Downloads](https://img.shields.io/npm/dt/carbonjs.svg)](https://www.npmjs.com/package/carbonjs)
[![Npm Monthly Downloads](https://img.shields.io/npm/dm/carbonjs.svg)](https://www.npmjs.com/package/carbonjs)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/carbonjs.svg)](https://www.npmjs.com/package/carbonjs)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/carbonjs.svg)](https://www.npmjs.com/package/carbonjs)
[![Open Issues](https://img.shields.io/github/issues-raw/ardalanamini/carbonjs.svg)](https://github.com/ardalanamini/carbonjs/issues?q=is%3Aopen+is%3Aissue)
[![Closed Issues](https://img.shields.io/github/issues-closed-raw/ardalanamini/carbonjs.svg)](https://github.com/ardalanamini/carbonjs/issues?q=is%3Aissue+is%3Aclosed)
[![Tested With Jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![Known Vulnerabilities](https://snyk.io/test/github/ardalanamini/carbonjs/badge.svg?targetFile=package.json)](https://snyk.io/test/github/ardalanamini/carbonjs?targetFile=package.json)
[![Dependencies Status](https://david-dm.org/ardalanamini/carbonjs.svg)](https://david-dm.org/ardalanamini/carbonjs)
[![Pull Requests](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](https://github.com/ardalanamini/carbonjs/pulls)
[![License](https://img.shields.io/github/license/ardalanamini/carbonjs.svg)](https://github.com/ardalanamini/carbonjs/blob/master/LICENSE)
[![Github Stars](https://img.shields.io/github/stars/ardalanamini/carbonjs.svg?style=social&label=Stars)](https://github.com/ardalanamini/carbonjs)
[![Github Forks](https://img.shields.io/github/forks/ardalanamini/carbonjs.svg?style=social&label=Fork)](https://github.com/ardalanamini/carbonjs)

> Carbon.js is a minimalist JavaScript library that parses, validates, manipulates, and displays dates and times for modern browsers with a largely Moment.js-compatible API.

## Table of Content <!-- omit in toc -->

- [Features](#features)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
    - [API](#api)
    - [I18n](#i18n)
    - [Plugin](#plugin)
- [Versioning](#versioning)
- [Authors](#authors)
- [License](#license)
- [Support](#support)

## Features

- :clock3: Familiar Moment.js API & patterns
- :muscle: Immutable
- :fire: Chainable
- :globe_with_meridians: I18n support
- :gear: Plugin support
- :gear: Calendar support (as part of plugin support)

## Getting Started

### Installation

```bash
npm i -s carbonjs
```

### Usage

#### API

It's easy to use Carbon.js APIs to parse, validate, manipulate, and display dates and times.

```javascript
import * as Carbon from "carbonjs";

Carbon.parse("2018-08-08"); // parse

new Carbon().format("{YYYY} MM-DDTHH:mm:ss SSS [Z] A"); // display

Carbon.parse().set("month", 3).month(); // get & set

new Carbon().add(1, "year"); // manipulate

Carbon.parse().isBefore(Carbon.parse()); // query
```

#### I18n

Day.js has great support for internationalization.

But none of them will be included in your build unless you use it.

```javascript
import "carbonjs/lib/locales/es"; // load locale package on demand

Carbon.locale("es"); // use Spanish locale globally

Carbon.parse("2018-05-05").locale("zh-cn").format(); // use Chinese Simplified locale in a specific instance
```

#### Plugin

A plugin is an independent module that can be added to Day.js to extend functionality or add new features.

```javascript
import * as advancedFormat from 'carbonjs/lib/plugins/advancedFormat' // load on demand

Carbon.extend(advancedFormat) // use plugin

Carbon.parse().format('Q Do k kk X x') // more available formats
```

:books:[Full API Reference](https://carbon.js.org)

## Versioning

We use [SemVer](http://semver.org) for versioning. For the versions available, see the [tags on this repository](https://github.com/ardalanamini/carbonjs/tags).

## Authors

- **Ardalan Amini** - *Owner/Developer* - [@ardalanamini](https://github.com/ardalanamini)

See also the list of [contributors](https://github.com/ardalanamini/carbonjs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Support

If my work helps you, please consider

[![Become A Patron](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://www.patreon.com/ardalanamini)

[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ardalanamini)
