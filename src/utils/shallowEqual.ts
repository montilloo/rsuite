/**
 * From: https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/core/shallowEqual.js
 * @providesModule shallowEqual
 * @typechecks
 * @flow
 */

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * Object.is() 方法判断两个值是否为同一个值。返回一个 Boolean 类型标示两个参数是否是同一个值。
 * 都是 undefined
 * 都是 null
 * 都是 true 或 false
 * 都是相同长度的字符串且相同字符按相同顺序排列
 * 都是相同对象（意味着每个对象有同一个引用）
 * 都是数字且
 * 都是 +0
 * 都是 -0
 * 都是 NaN
 * 或都是非零而且非 NaN 且为同一个值
 * 与== 运算不同。  == 运算符在判断相等前对两边的变量(如果它们不是同一类型) 进行强制转换 (这种行为的结果会将 "" == false 判断为 true), 而 Object.is不会强制转换两边的值。
 * 与=== 运算也不相同。 === 运算符 (也包括 == 运算符) 将数字 -0 和 +0 视为相等 ，而将Number.NaN 与NaN视为不相等.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x: any, y: any): boolean {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  }
  // Step 6.a: NaN == NaN
  return x !== x && y !== y;
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 * 通过迭代对象上的键并在任何键的值在参数之间不严格相等时返回false来执行相等操作。 当所有键的值严格相等时返回true。
 */
function shallowEqual(objA: any, objB: any): boolean {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i += 1) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

export default shallowEqual;
