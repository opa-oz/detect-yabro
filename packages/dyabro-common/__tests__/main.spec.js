const dy = require('../lib');

const requests = {
    WINDOWS: {
        YABRO: [
            'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 YaBrowser/21.8.0 Yowser/2.5 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 YaBrowser/21.8.0 Yowser/2.5 Safari/537.36',
        ],
        FIREFOX: [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0'
        ],
        CHROME: [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
        ]
    },
    MACINTOSH: {
        YABRO: [
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_5_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 YaBrowser/21.8.0 Yowser/2.5 Safari/537.36',
        ],
        FIREFOX: [
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 11.5; rv:91.0) Gecko/20100101 Firefox/91.0'
        ],
        CHROME: [
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_5_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
        ]
    },
    IPHONE: {
        YABRO: [
            'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 YaBrowser/21.6.6.762 Mobile/15E148 Safari/604.1'
        ],
        FIREFOX: [
            'Mozilla/5.0 (iPhone; CPU iPhone OS 11_5_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/36.0 Mobile/15E148 Safari/605.1.15'
        ],
        CHROME: [
            'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/92.0.4515.90 Mobile/15E148 Safari/604.1'
        ]
    },
    IPAD: {
        YABRO: [
            'Mozilla/5.0 (iPad; CPU OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 YaBrowser/21.6.6.762 Mobile/15E148 Safari/605.1',
        ],
        FIREFOX: [
            'Mozilla/5.0 (iPad; CPU OS 11_5_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/36.0 Mobile/15E148 Safari/605.1.15'
        ],
        CHROME: [
            'Mozilla/5.0 (iPad; CPU OS 14_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/92.0.4515.90 Mobile/15E148 Safari/604.1'
        ]
    },
    IPOD: {
        YABRO: [
            'Mozilla/5.0 (iPod touch; CPU iPhone 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 YaBrowser/21.6.6.762 Mobile/15E148 Safari/605.1'
        ],
        FIREFOX: [
            'Mozilla/5.0 (iPod touch; CPU iPhone OS 11_5_2 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) FxiOS/36.0 Mobile/15E148 Safari/605.1.15'
        ],
        CHROME: [
            'Mozilla/5.0 (iPod; CPU iPhone OS 14_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/92.0.4515.90 Mobile/15E148 Safari/604.1'
        ]
    },
    ANDROID: {
        YABRO: [
            'Mozilla/5.0 (Linux; arm_64; Android 11; SM-G965F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 YaBrowser/21.3.4.59 Mobile Safari/537.36'
        ],
        FIREFOX: [
            'Mozilla/5.0 (Android 11; Mobile; rv:68.0) Gecko/68.0 Firefox/91.0',
            'Mozilla/5.0 (Android 11; Mobile; LG-M255; rv:91.0) Gecko/91.0 Firefox/91.0'
        ],
        CHROME: [
            'Mozilla/5.0 (Linux; Android 10; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Mobile Safari/537.36',
            'Mozilla/5.0 (Linux; Android 10; SM-A102U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Mobile Safari/537.36',
            'Mozilla/5.0 (Linux; Android 10; SM-G960U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Mobile Safari/537.36',
            'Mozilla/5.0 (Linux; Android 10; SM-N960U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Mobile Safari/537.36',
        ]
    },
    LINUX: {
        FIREFOX: [
            'Mozilla/5.0 (X11; Linux i686; rv:91.0) Gecko/20100101 Firefox/91.0',
            'Mozilla/5.0 (Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0',
            'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0'
        ],
        CHROME: [
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
        ]
    }
}

describe('Detect Yabro common', () => {

    Object.keys(requests).forEach(platformKey => {
        Object.keys(requests[platformKey]).forEach(browserKey => {
            requests[platformKey][browserKey].forEach(useragent => {

                it(`[Default] - ${platformKey}/${browserKey}`, () => {
                    let platform = 'unknown';
                    if (browserKey === 'YABRO') {
                        if (['IPAD', 'IPOD', 'IPHONE'].includes(platformKey)) {
                            platform = 'ios';
                        } else {
                            platform = platformKey.toLowerCase();
                        }
                    }

                    expect(dy.default(useragent)).toEqual({
                        isYabro: browserKey === 'YABRO',
                        isMobile: ['ANDROID', 'IPAD', 'IPHONE', 'IPOD'].includes(platformKey) && browserKey === 'YABRO',
                        platform
                    })
                })

                it(`[isYabro] - ${platformKey}/${browserKey}`, () => {
                    expect(dy.isYabro(useragent)).toEqual(browserKey === 'YABRO');
                })

                it(`[isMobileYabro] - ${platformKey}/${browserKey}`, () => {
                    expect(dy.isMobileYabro(useragent)).toEqual(
                        ['ANDROID', 'IPAD', 'IPHONE', 'IPOD'].includes(platformKey) && browserKey === 'YABRO'
                    );
                })

                it(`[isIOSYabro] - ${platformKey}/${browserKey}`, () => {
                    expect(dy.isIOSYabro(useragent)).toEqual(
                        ['IPAD', 'IPHONE', 'IPOD'].includes(platformKey) && browserKey === 'YABRO'
                    );
                })

                it(`[isAndroidYabro] - ${platformKey}/${browserKey}`, () => {
                    expect(dy.isAndroidYabro(useragent)).toEqual(
                        ['ANDROID'].includes(platformKey) && browserKey === 'YABRO'
                    );
                })

                it(`[isMacOSYabro] - ${platformKey}/${browserKey}`, () => {
                    expect(dy.isMacOSYabro(useragent)).toEqual(
                        ['MACINTOSH'].includes(platformKey) && browserKey === 'YABRO'
                    );
                })

                it(`[isWindowsYabro] - ${platformKey}/${browserKey}`, () => {
                    expect(dy.isWindowsYabro(useragent)).toEqual(
                        ['WINDOWS'].includes(platformKey) && browserKey === 'YABRO'
                    );
                })

                it(`[isLinuxYabro] - ${platformKey}/${browserKey}`, () => {
                    expect(dy.isLinuxYabro(useragent)).toEqual(
                        ['LINUX'].includes(platformKey) && browserKey === 'YABRO'
                    );
                })
            })
        })
    })

})
