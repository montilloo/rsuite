/**
 *
 * Safe chained function
 * 安全链函数
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 * 仅在需要时创建新函数，否则将传回现有函数或null。
 *
 * Largely copied directly from:
 * https://github.com/react-bootstrap/react-bootstrap/blob/master/src/utils/createChainedFunction.js
 *
 * @param {function} functions to chain
 * @returns {function|undefined}
 */

function createChainedFunction<T = any>(...funcs: T[]): T {
  return funcs
    .filter(f => f !== null && typeof f !== 'undefined')
    .reduce((acc: any, f: any) => {
      if (typeof f !== 'function') {
        throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
      }

      if (acc === undefined) {
        return f;
      }

      return function chainedFunction(...args: any[]) {
        acc.apply(this, args);
        f.apply(this, args);
      };
    }, undefined);
}

export default createChainedFunction;
