import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  ZenkyError,
  ZenkyStorefront,
} from '../dist/zenky-storefront-api.es.js';

const requests = {
  profile: (sdk) => sdk.store.getStore('store'),
  page: (sdk) => sdk.store.getWebsitePage('store', 'website', 'page'),
};

for (const [name, request] of Object.entries(requests)) {
  for (const [format, body, contentType] of [
    ['empty', null, 'text/plain'],
    ['HTML', '<html><body>Not Found</body></html>', 'text/html'],
    ['malformed JSON', '{', 'application/json'],
  ]) {
    test(`${name}: preserves 404 for ${format} errors`, async () => {
      const sdk = new ZenkyStorefront(
        {},
        async () =>
          new Response(body, {
            status: 404,
            statusText: 'Not Found',
            headers: { 'Content-Type': contentType },
          }),
      );
      await assert.rejects(request(sdk), (error) => {
        assert.ok(error instanceof ZenkyError);
        assert.equal(error.status, 404);
        assert.equal(error.err, null);
        assert.equal(error.message, 'Not Found');
        return true;
      });
    });
  }
}

test('preserves structured JSON error details', async () => {
  const detail = {
    message: 'Store not found',
    original_message: 'Missing store',
    http_code: 404,
    error_code: 'STORE_NOT_FOUND',
    meta: { store_id: 'store' },
  };
  const sdk = new ZenkyStorefront(
    {},
    async () =>
      new Response(JSON.stringify({ error: detail }), { status: 404 }),
  );
  await assert.rejects(sdk.store.getStore('store'), (error) => {
    assert.ok(error instanceof ZenkyError);
    assert.equal(error.status, 404);
    assert.equal(error.message, detail.message);
    assert.deepEqual(error.err, detail);
    return true;
  });
});

test('preserves unauthenticated fallback for an empty 401', async () => {
  const sdk = new ZenkyStorefront(
    {},
    async () => new Response(null, { status: 401 }),
  );
  await assert.rejects(sdk.store.getStore('store'), (error) => {
    assert.ok(error instanceof ZenkyError);
    assert.equal(error.status, 401);
    assert.equal(error.message, 'Unauthenticated.');
    return true;
  });
});

test('provides a fallback when statusText is empty', async () => {
  const sdk = new ZenkyStorefront(
    {},
    async () => new Response(null, { status: 502 }),
  );
  await assert.rejects(sdk.store.getStore('store'), (error) => {
    assert.ok(error instanceof ZenkyError);
    assert.equal(error.status, 502);
    assert.equal(error.message, 'HTTP 502');
    return true;
  });
});
