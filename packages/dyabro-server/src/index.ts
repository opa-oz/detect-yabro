import checkYabro from '@detect-yabro/common';
import { Request, Response } from 'express';

export {
    isIOSYabro,
    isMacOSYabro,
    isWindowsYabro,
    isMobileYabro,
    Platforms,
    isYabro,
    isAndroidYabro,
    isLinuxYabro
} from '@detect-yabro/common';

const detectYabro =
    () =>
    (req: Request, res: Response, next: () => void): void => {
        const ua = req?.headers['user-agent'];

        const result = checkYabro(`${ua}`);

        if ('function' === typeof res.locals) {
            res.locals({ yabro: result });
        } else {
            res.locals.yabro = result;
        }
        next();
    };

export const express = detectYabro;
export default detectYabro;
