module.exports = {
    displayName: 'backend-auth',
    preset: '../../../jest.preset.js',
    // transform: {
    //     '^.+\\.[tj]sx?$': 'babel-jest',
    // },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../../coverage/libs/backend/auth',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
