/**
 * @jest-environment node
 */
import { Select } from '../src';
import { renderToString } from 'react-dom/server';

test('select element can be rendered using react-dom/server', async () => {
  expect(() => renderToString(<Select />)).not.toThrow();
});
