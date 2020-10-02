/**
 * Tests if object is an array with at least 1 item.
 */
export function isArrayWithLength(test: any): boolean {
  return Array.isArray(test) && !!test.length;
}

/**
 * Tests for a non-array object - 'plain object'.
 */
export function isPlainObject(test: any): boolean {
  return test && (typeof test === 'object') && !Array.isArray(test);
}

/**
 * Immutable implementation of mergeDeep for two objects. Will return the merged result.
 * In first condition of if/else block - check that property is no 'animation', since we never want to merge that complex styled-component object.
 */
export function mergeDeep(target: any, source: any): any {
  const output = { ...target };

  Object.keys(source).forEach((key) => {
    const sourceKey = source[key];

    output[key] =
      (isPlainObject(sourceKey) && key !== 'animation')
        ? (key in target)
          ? mergeDeep(target[key], sourceKey)
          : sourceKey
        : sourceKey || '';
  });

  return output;
}
