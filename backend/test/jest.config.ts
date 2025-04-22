export default {
    rootDir: '../',
    roots: ['<rootDir>/test/unit'],
    testMatch: ['**/*.spec.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest', // ✅ TypeScript を ts-jest で変換
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'], // これも忘れず
    moduleFileExtensions: ['ts', 'js', 'json'],
    testEnvironment: 'node',
};
