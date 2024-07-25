export default {
	clearMocks: true,
	testMatch: ['**/*.test.ts'],
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	roots: ['<rootDir>'],
	moduleFileExtensions: ['ts', 'js'],
};
