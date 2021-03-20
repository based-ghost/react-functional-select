import { useEffect } from 'react';
import type { EffectCallback } from 'react';

/**
 * Run an effect only once (on initial mount).
 * Pass an empty array for the dependency list to ensure effect is only fired once.
 */
export const useMountEffect = (effect: EffectCallback): void => {
  useEffect(effect, []);
};