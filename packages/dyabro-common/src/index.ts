const Devices = {
    MOBILE: 'Mobile'.toLowerCase(),
    IPHONE: 'iPhone'.toLowerCase(),
    IPAD: 'iPad'.toLowerCase(),
    IPOD: 'iPod'.toLowerCase()
};

export enum Platforms {
    WINDOWS = 'windows',
    MAC_OS = 'macintosh',
    LINUX = 'linux',
    ANDROID = 'android',
    IOS = 'ios',
    UNKNOWN = 'unknown'
}

const Yabro = 'YaBrowser'.toLowerCase();

const checkYabro = (userAgent: string): boolean => {
    return userAgent.includes(Yabro);
};

const checkPlatform = (userAgent: string, platform: string): boolean => {
    return userAgent.includes(platform);
};

const checkDevice = (userAgent: string, device: string | string[]): boolean => {
    if (Array.isArray(device)) {
        return device.some((d) => userAgent.includes(d));
    }

    return userAgent.includes(device);
};

const checkParams = (
    userAgent: string,
    { platform, device }: { platform?: string; device?: string | string[] }
): boolean => {
    const isSuitablePlatform = platform ? checkPlatform(userAgent, platform) : true;
    const isSuitableDevice = device ? checkDevice(userAgent, device) : true;
    const isYabro = checkYabro(userAgent);

    return isSuitableDevice && isSuitablePlatform && isYabro;
};

export const isMobileYabro = (userAgent: string): boolean => {
    const lowerAgent = `${userAgent}`.toLowerCase();
    return checkParams(lowerAgent, { device: Devices.MOBILE });
};
export const isYabro = (userAgent: string): boolean => {
    const lowerAgent = `${userAgent}`.toLowerCase();
    return checkParams(lowerAgent, {});
};
export const isIOSYabro = (userAgent: string): boolean => {
    const lowerAgent = `${userAgent}`.toLowerCase();
    return checkParams(lowerAgent, { device: [Devices.IPAD, Devices.IPHONE, Devices.IPOD] });
};
export const isAndroidYabro = (userAgent: string): boolean => {
    const lowerAgent = `${userAgent}`.toLowerCase();
    return checkParams(lowerAgent, { platform: Platforms.LINUX, device: Devices.MOBILE });
};
export const isMacOSYabro = (userAgent: string): boolean => {
    const lowerAgent = `${userAgent}`.toLowerCase();
    return checkParams(lowerAgent, { platform: Platforms.MAC_OS });
};
export const isWindowsYabro = (userAgent: string): boolean => {
    const lowerAgent = `${userAgent}`.toLowerCase();
    return checkParams(lowerAgent, { platform: Platforms.WINDOWS });
};
export const isLinuxYabro = (userAgent: string): boolean => {
    const lowerAgent = `${userAgent}`.toLowerCase();
    return checkParams(lowerAgent, { platform: Platforms.LINUX }) && !isMobileYabro(lowerAgent);
};

export type YabroDetectionSummarized = {
    isYabro: boolean;
    isMobile: boolean;
    platform?: Platforms;
};

export default (userAgent: string): YabroDetectionSummarized => {
    const lowerAgent = `${userAgent}`.toLowerCase();

    const result: YabroDetectionSummarized = {
        isYabro: isYabro(lowerAgent),
        isMobile: isMobileYabro(lowerAgent)
    };
    let platform: Platforms = Platforms.UNKNOWN;

    if (isWindowsYabro(lowerAgent)) {
        platform = Platforms.WINDOWS;
    } else if (isMacOSYabro(lowerAgent)) {
        platform = Platforms.MAC_OS;
    } else if (isLinuxYabro(lowerAgent)) {
        if (result.isMobile) {
            platform = Platforms.ANDROID;
        } else {
            platform = Platforms.LINUX;
        }
    } else if (isIOSYabro(lowerAgent)) {
        platform = Platforms.IOS;
    } else if (result.isMobile && checkParams(lowerAgent, { platform: Platforms.LINUX })) {
        platform = Platforms.ANDROID;
    }

    if (platform) {
        result.platform = platform;
    }
    return result;
};
