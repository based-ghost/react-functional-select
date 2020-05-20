/**
 * @jest-environment node
 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Select } from '../src';

test('select element can be rendered using react-dom/server', () => {

  expect(() => renderToString(<Select />)).not.toThrow();

});
