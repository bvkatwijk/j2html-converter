
import { test } from 'uvu';
import * as assert from 'uvu/assert';
import * as index from './index.js';

test("asJava", () => assert.equal(index.asJava('<div></div>'), 'div()'));

test('JSON', () => {
  const input = {
    foo: 'hello',
    bar: 'world'
  };

  const output = JSON.stringify(input);

  assert.snapshot(output, `{"foo":"hello","bar":"world"}`);
  assert.equal(JSON.parse(output), input, 'matches original');
});

test.run();