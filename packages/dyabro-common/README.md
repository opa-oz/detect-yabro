# @detect-yabro/common

> Common library to detect Yandex.Browser.

## Install

Using npm:

```sh
npm install @detect-yabro/common
```

or using yarn:

```sh
yarn add @detect-yabro/common --dev
```

## API

### Default
**Description:** Collect all available data about Yabro from User Agent

**Interface:**
```typescript
enum Platforms {
  WINDOWS = 'windows',
  MAC_OS = 'macintosh',
  LINUX = 'linux',
  ANDROID = 'android',
  IOS = 'ios',
  UNKNOWN = 'unknown'
}

type YabroDetectionSummarized = {
  isYabro: boolean;
  isMobile: boolean;
  platform?: Platforms;
};

default(userAgent: string): YabroDetectionSummarized;
```

**Examples:**
```typescript
import detectYabro from '@detect-yabro/common'

// MacOS Yabro
detectYabro(
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_5_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 YaBrowser/21.8.0 Yowser/2.5 Safari/537.36'
) // { "isYabro": true, isMobileYabro: false, platform: "macintosh"}


// Windows Yabro
detectYabro(
  'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 YaBrowser/21.8.0 Yowser/2.5 Safari/537.36'
) // { "isYabro": true, isMobileYabro: false, platform: "windows"}


// iPad Yabro
detectYabro(
  'Mozilla/5.0 (iPad; CPU OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 YaBrowser/21.6.6.762 Mobile/15E148 Safari/605.1'
) // { "isYabro": true, isMobileYabro: true, platform: "ios"}


// Negative case (chrome for Android)
detectYabro(
  'Mozilla/5.0 (Linux; Android 10; SM-A102U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Mobile Safari/537.36',
) // { "isYabro": false, isMobileYabro: false, platform: "unknown"}
```
----

### isYabro
**Description:** Check if UserAgent belongs to Yandex.Browser

**Interface:**
```typescript
isYabro(userAgent: string): boolean;
```
----

### isMobileYabro
**Description:** Check if UserAgent belongs to Mobile Yandex.Browser (iOs+Android)

**Interface:**
```typescript
isMobileYabro(userAgent: string): boolean;
```
----

### isIOSYabro & isAndroidYabro
**Description:** Same, but separately

**Interface:**
```typescript
isIOSYabro(userAgent: string): boolean;

isAndroidYabro(userAgent: string): boolean;
```
----

### isWindowsYabro & isLinuxYabro & isMacOSYabro
**Description:** Same, but for desktop browsers

**Interface:**
```typescript
isWindowsYabro(userAgent: string): boolean;

isLinuxYabro(userAgent: string): boolean;

isMacOSYabro(userAgent: string): boolean;
```
----
