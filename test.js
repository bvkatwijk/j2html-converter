import { test } from 'uvu';
import * as assert from 'uvu/assert';

import * as index from './index.js';

test("asJava", () => assert.equal(index.asJava('<div></div>'), 'div()'));

test.run();