// Jest configuration for api
const base = require('../../jest.config.base.js');
const pack = require('./package.json');

module.exports = {
    ...base,
    roots: ['<rootDir>/src', '<rootDir>/__tests__'],
    name: pack.name,
    displayName: pack.name
};
