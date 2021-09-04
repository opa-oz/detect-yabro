// @ts-ignore
import request from 'supertest';
// @ts-ignore
import express from 'express';
import detectYabro from '../src';
import { NextFunction } from 'express';

const app = express();

const requests = {
    WINDOWS: {
        YABRO: [
            'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 YaBrowser/21.8.0 Yowser/2.5 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 YaBrowser/21.8.0 Yowser/2.5 Safari/537.36'
        ],
        FIREFOX: ['Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0'],
        CHROME: [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
        ]
    },
    MAC_OS: {
        YABRO: [
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_5_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 YaBrowser/21.8.0 Yowser/2.5 Safari/537.36'
        ],
        FIREFOX: ['Mozilla/5.0 (Macintosh; Intel Mac OS X 11.5; rv:91.0) Gecko/20100101 Firefox/91.0'],
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
            'Mozilla/5.0 (iPad; CPU OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 YaBrowser/21.6.6.762 Mobile/15E148 Safari/605.1'
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
            'Mozilla/5.0 (Linux; Android 10; SM-N960U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Mobile Safari/537.36'
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
};

app.use(detectYabro());

// @ts-ignore
app.get('/ping', function (req: Request, res: Response, next: NextFunction): void {
    // @ts-ignore
    res.status(200).json(res.locals['yabro']);
});

describe('Get Yabro data', function () {
    it('request without UserAgent', function (done) {
        request(app)
            .get('/ping')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.isYabro).toEqual(false);
                expect(response.body.isMobile).toEqual(false);
                done();
            })
            .catch((err) => done(err));
    });

    describe('Windows', () => {
        requests.WINDOWS.YABRO.forEach((userAgent, key) => {
            it(`#${key + 1} Yabro`, (done) => {
                request(app)
                    .get('/ping')
                    .set('Accept', 'application/json')
                    .set('User-Agent', userAgent)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.isYabro).toEqual(true);
                        expect(response.body.isMobile).toEqual(false);
                        expect(response.body.platform).toEqual('windows');
                        done();
                    })
                    .catch((err) => done(err));
            });
        });

        requests.WINDOWS.FIREFOX.forEach((userAgent, key) => {
            it(`#${key + 1} Firefox`, (done) => {
                request(app)
                    .get('/ping')
                    .set('Accept', 'application/json')
                    .set('User-Agent', userAgent)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.isYabro).toEqual(false);
                        expect(response.body.isMobile).toEqual(false);
                        expect(response.body.platform).toEqual('unknown');
                        done();
                    })
                    .catch((err) => done(err));
            });
        });

        requests.WINDOWS.CHROME.forEach((userAgent, key) => {
            it(`#${key + 1} Chrome`, (done) => {
                request(app)
                    .get('/ping')
                    .set('Accept', 'application/json')
                    .set('User-Agent', userAgent)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.isYabro).toEqual(false);
                        expect(response.body.isMobile).toEqual(false);
                        expect(response.body.platform).toEqual('unknown');
                        done();
                    })
                    .catch((err) => done(err));
            });
        });
    });
    describe('MacOS', () => {
        requests.MAC_OS.YABRO.forEach((userAgent, key) => {
            it(`#${key + 1} Yabro`, (done) => {
                request(app)
                    .get('/ping')
                    .set('Accept', 'application/json')
                    .set('User-Agent', userAgent)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.isYabro).toEqual(true);
                        expect(response.body.isMobile).toEqual(false);
                        expect(response.body.platform).toEqual('macintosh');
                        done();
                    })
                    .catch((err) => done(err));
            });
        });

        requests.MAC_OS.FIREFOX.forEach((userAgent, key) => {
            it(`#${key + 1} Firefox`, (done) => {
                request(app)
                    .get('/ping')
                    .set('Accept', 'application/json')
                    .set('User-Agent', userAgent)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.isYabro).toEqual(false);
                        expect(response.body.isMobile).toEqual(false);
                        expect(response.body.platform).toEqual('unknown');
                        done();
                    })
                    .catch((err) => done(err));
            });
        });

        requests.MAC_OS.CHROME.forEach((userAgent, key) => {
            it(`#${key + 1} Chrome`, (done) => {
                request(app)
                    .get('/ping')
                    .set('Accept', 'application/json')
                    .set('User-Agent', userAgent)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.isYabro).toEqual(false);
                        expect(response.body.isMobile).toEqual(false);
                        expect(response.body.platform).toEqual('unknown');
                        done();
                    })
                    .catch((err) => done(err));
            });
        });
    });
    describe('Linux', () => {
        requests.LINUX.FIREFOX.forEach((userAgent, key) => {
            it(`#${key + 1} Firefox`, (done) => {
                request(app)
                    .get('/ping')
                    .set('Accept', 'application/json')
                    .set('User-Agent', userAgent)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.isYabro).toEqual(false);
                        expect(response.body.isMobile).toEqual(false);
                        expect(response.body.platform).toEqual('unknown');
                        done();
                    })
                    .catch((err) => done(err));
            });
        });

        requests.LINUX.CHROME.forEach((userAgent, key) => {
            it(`#${key + 1} Chrome`, (done) => {
                request(app)
                    .get('/ping')
                    .set('Accept', 'application/json')
                    .set('User-Agent', userAgent)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.isYabro).toEqual(false);
                        expect(response.body.isMobile).toEqual(false);
                        expect(response.body.platform).toEqual('unknown');
                        done();
                    })
                    .catch((err) => done(err));
            });
        });
    });
    describe('iPhone', () => {
        requests.IPHONE.YABRO.forEach((userAgent, key) => {
            it(`#${key + 1} Yabro`, (done) => {
                request(app)
                    .get('/ping')
                    .set('Accept', 'application/json')
                    .set('User-Agent', userAgent)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.isYabro).toEqual(true);
                        expect(response.body.isMobile).toEqual(true);
                        expect(response.body.platform).toEqual('ios');
                        done();
                    })
                    .catch((err) => done(err));
            });
        });

        requests.IPHONE.FIREFOX.forEach((userAgent, key) => {
            it(`#${key + 1} Firefox`, (done) => {
                request(app)
                    .get('/ping')
                    .set('Accept', 'application/json')
                    .set('User-Agent', userAgent)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.isYabro).toEqual(false);
                        expect(response.body.isMobile).toEqual(false);
                        expect(response.body.platform).toEqual('unknown');
                        done();
                    })
                    .catch((err) => done(err));
            });
        });

        requests.IPHONE.CHROME.forEach((userAgent, key) => {
            it(`#${key + 1} Chrome`, (done) => {
                request(app)
                    .get('/ping')
                    .set('Accept', 'application/json')
                    .set('User-Agent', userAgent)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.isYabro).toEqual(false);
                        expect(response.body.isMobile).toEqual(false);
                        expect(response.body.platform).toEqual('unknown');
                        done();
                    })
                    .catch((err) => done(err));
            });
        });
    });
    describe('iPad', () => {
        requests.IPAD.YABRO.forEach((userAgent, key) => {
            it(`#${key + 1} Yabro`, (done) => {
                request(app)
                    .get('/ping')
                    .set('Accept', 'application/json')
                    .set('User-Agent', userAgent)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.isYabro).toEqual(true);
                        expect(response.body.isMobile).toEqual(true);
                        expect(response.body.platform).toEqual('ios');
                        done();
                    })
                    .catch((err) => done(err));
            });
        });

        requests.IPAD.FIREFOX.forEach((userAgent, key) => {
            it(`#${key + 1} Firefox`, (done) => {
                request(app)
                    .get('/ping')
                    .set('Accept', 'application/json')
                    .set('User-Agent', userAgent)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.isYabro).toEqual(false);
                        expect(response.body.isMobile).toEqual(false);
                        expect(response.body.platform).toEqual('unknown');
                        done();
                    })
                    .catch((err) => done(err));
            });
        });

        requests.IPAD.CHROME.forEach((userAgent, key) => {
            it(`#${key + 1} Chrome`, (done) => {
                request(app)
                    .get('/ping')
                    .set('Accept', 'application/json')
                    .set('User-Agent', userAgent)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.isYabro).toEqual(false);
                        expect(response.body.isMobile).toEqual(false);
                        expect(response.body.platform).toEqual('unknown');
                        done();
                    })
                    .catch((err) => done(err));
            });
        });
    });
    describe('iPod', () => {
        requests.IPOD.YABRO.forEach((userAgent, key) => {
            it(`#${key + 1} Yabro`, (done) => {
                request(app)
                    .get('/ping')
                    .set('Accept', 'application/json')
                    .set('User-Agent', userAgent)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.isYabro).toEqual(true);
                        expect(response.body.isMobile).toEqual(true);
                        expect(response.body.platform).toEqual('ios');
                        done();
                    })
                    .catch((err) => done(err));
            });
        });

        requests.IPOD.FIREFOX.forEach((userAgent, key) => {
            it(`#${key + 1} Firefox`, (done) => {
                request(app)
                    .get('/ping')
                    .set('Accept', 'application/json')
                    .set('User-Agent', userAgent)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.isYabro).toEqual(false);
                        expect(response.body.isMobile).toEqual(false);
                        expect(response.body.platform).toEqual('unknown');
                        done();
                    })
                    .catch((err) => done(err));
            });
        });

        requests.IPOD.CHROME.forEach((userAgent, key) => {
            it(`#${key + 1} Chrome`, (done) => {
                request(app)
                    .get('/ping')
                    .set('Accept', 'application/json')
                    .set('User-Agent', userAgent)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.isYabro).toEqual(false);
                        expect(response.body.isMobile).toEqual(false);
                        expect(response.body.platform).toEqual('unknown');
                        done();
                    })
                    .catch((err) => done(err));
            });
        });
    });
    describe('Android', () => {
        requests.ANDROID.YABRO.forEach((userAgent, key) => {
            it(`#${key + 1} Yabro`, (done) => {
                request(app)
                    .get('/ping')
                    .set('Accept', 'application/json')
                    .set('User-Agent', userAgent)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.isYabro).toEqual(true);
                        expect(response.body.isMobile).toEqual(true);
                        expect(response.body.platform).toEqual('android');
                        done();
                    })
                    .catch((err) => done(err));
            });
        });

        requests.ANDROID.FIREFOX.forEach((userAgent, key) => {
            it(`#${key + 1} Firefox`, (done) => {
                request(app)
                    .get('/ping')
                    .set('Accept', 'application/json')
                    .set('User-Agent', userAgent)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.isYabro).toEqual(false);
                        expect(response.body.isMobile).toEqual(false);
                        expect(response.body.platform).toEqual('unknown');
                        done();
                    })
                    .catch((err) => done(err));
            });
        });

        requests.ANDROID.CHROME.forEach((userAgent, key) => {
            it(`#${key + 1} Chrome`, (done) => {
                request(app)
                    .get('/ping')
                    .set('Accept', 'application/json')
                    .set('User-Agent', userAgent)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.isYabro).toEqual(false);
                        expect(response.body.isMobile).toEqual(false);
                        expect(response.body.platform).toEqual('unknown');
                        done();
                    })
                    .catch((err) => done(err));
            });
        });
    });
});
