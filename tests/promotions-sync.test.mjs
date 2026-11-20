import assert from 'node:assert/strict';
import { test } from 'node:test';
import { ZenkyStorefront } from '../dist/zenky-storefront-api.es.js';

test('sync promotions returns events and closest promotion with order authentication', async () => {
  const result = { events: [], closest_promotion: null };
  let request;
  const sdk = new ZenkyStorefront({}, async (url, options) => {
    request = { url: String(url), options };
    return new Response(JSON.stringify({ data: result }));
  });
  assert.deepEqual(
    await sdk.orders.checkPromotionsSync('store', {
      id: 'order',
      token: 'order-token',
      api_token: 'customer-token',
    }),
    result,
  );
  assert.match(request.url, /orders\/order\/loyalty\/promotions\/check\/sync\?token=order-token/);
  assert.equal(request.options.method, 'POST');
  assert.equal(new Headers(request.options.headers).get('Authorization'), 'Bearer customer-token');
});

test('legacy promotions dispatch remains available', async () => {
  const sdk = new ZenkyStorefront({}, async (url) => {
    assert.match(String(url), /promotions\/check\?token=/);
    return new Response(JSON.stringify({ data: { dispatched: true } }));
  });
  assert.equal(
    await sdk.orders.dispatchPromotionsChecker('store', { id: 'order', token: 'token' }),
    true,
  );
});

test('reward product requests preserve promotion identifiers', async () => {
  const sdk = new ZenkyStorefront({}, async (url) => {
    const params = new URL(String(url)).searchParams;
    assert.equal(params.get('promotion_id'), 'promotion');
    assert.equal(params.get('promotion_reward_id'), 'reward');
    return new Response(JSON.stringify({ data: [], meta: { pagination: {} } }));
  });
  await sdk.products.getProducts('store', {
    promotion_id: 'promotion',
    promotion_reward_id: 'reward',
  });
});
