module.exports = {
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    testRegex: '(/__tests__/.*.(test|spec)).(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverage: true,
    coveragePathIgnorePatterns: ['(tests/.*.mock).(jsx?|tsx?)$'],
    verbose: true
};
