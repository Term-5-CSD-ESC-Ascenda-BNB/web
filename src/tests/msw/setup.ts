import { setupServer } from 'msw/node';
import { beforeAll, afterAll, afterEach } from 'vitest';

// Create a base server that can be extended by individual tests
export const server = setupServer();

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

// Reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios).
afterEach(() => {
  server.resetHandlers();
});

// Clean up after the tests are finished.
afterAll(() => {
  server.close();
});

export { http, HttpResponse } from 'msw';
