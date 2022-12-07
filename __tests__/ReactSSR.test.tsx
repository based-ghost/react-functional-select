import React from 'react';
import { Select } from '../src';
import { renderToString } from 'react-dom/server';

test('Select component can be rendered using react-dom/server', () => {
  expect(() => renderToString(<Select />)).not.toThrowError();
});
