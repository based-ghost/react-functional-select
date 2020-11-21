/**
 * Tests if object is an array with at least 1 item.
 */
export function isArrayWithLength(test: any): boolean {
  return Array.isArray(test) && !!test.length;
}

/**
 * Tests for a 'plain, classic' object (non-primitive type that is not an array).
 */
export function isPlainObject(test: any): boolean {
  return (test !== null) && (typeof test === 'object') && !Array.isArray(test);
}

/**
 * Immutable implementation of mergeDeep for two objects. Will return the merged result.
 * In first condition of if/else block - check that property is no 'animation', since we never want to merge that complex styled-component object.
 */
export const mergeDeep = <T>(target: any, source: any): T => {
  const output = { ...target };

  Object.keys(source).forEach((key) => {
    const sourceProp = source[key] || '';

    output[key] =
      (isPlainObject(sourceProp) && key !== 'animation')
        ? (key in target)
          ? mergeDeep(target[key], sourceProp)
          : sourceProp
        : sourceProp;
  });

  return output;
};
