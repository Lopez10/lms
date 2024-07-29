export default {
	preset: 'ts-jest',
	testEnvironment: 'node',
	clearMocks: true,
	testMatch: ['**/*.integration-test.ts'],
	setupFilesAfterEnv: ['./jest.integration.setup.ts'],
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	roots: ['<rootDir>'],
	moduleFileExtensions: ['ts', 'js'],
};
