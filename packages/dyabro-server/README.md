# @detect-yabro/server

> Server library to detect Yandex.Browser for ExpressJS.

[![Latest Stable Version](https://img.shields.io/npm/v/@detect-yabro/server/latest.svg)](https://www.npmjs.com/package/@detect-yabro/server)
[![@detect-yabro/server](https://snyk.io/advisor/npm-package/@detect-yabro/server/badge.svg)](https://snyk.io/advisor/npm-package/@detect-yabro/server)

## Install

Using npm:

```sh
npm install @detect-yabro/server
```

or using yarn:

```sh
yarn add @detect-yabro/server --dev
```

## API

### Middleware
**Description:** Looking for `user-agent` header and parse it, storing result into `res.locals['yabro']` 

**Example:**
```typescript
import express from 'express';
import detectYabro from '@detect-yabro/server';

const app = express();

app.use(detectYabro.express());

app.get('*', (req, res, next)=>{
  const yabro = res.locals['yabro']; // { "isYabro": true, isMobileYabro: false, platform: "macintosh"}
})
```
----

### Note
There are proxy for all methods from [@detect-yabro/common](https://github.com/opa-oz/detect-yabro/blob/main/README.md)
