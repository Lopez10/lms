export default {
	preset: 'ts-jest',
	testEnvironment: 'node',
	clearMocks: true,
	testMatch: ['**/*.integration-test.ts'],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	roots: ['<rootDir>'],
	moduleFileExtensions: ['ts', 'js'],
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.json',
		},
	},
};
