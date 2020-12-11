import classNames from 'classnames';
// 创建一个函数，该函数接收 func 的参数，要么调用func返回的结果，如果 func 所需参数已经提供，则直接返回 func 所执行的结果。或返回一个函数，接受余下的func 参数的函数，可以使用 func.length 强制需要累积的参数个数。
import curry from 'lodash/curry';

export const globalKey = 'rs-';
export const getClassNamePrefix = () => {
  if (typeof __RSUITE_CLASSNAME_PREFIX__ !== 'undefined') {
    return (__RSUITE_CLASSNAME_PREFIX__ as any) as string;
  }
  return globalKey;
};
export const defaultClassPrefix = (name: string) => `${getClassNamePrefix()}${name}`;

export function prefix(pre: string, className: string | string[]): string {
  if (!pre || !className) {
    return '';
  }

  if (Array.isArray(className)) {
    return classNames(className.filter(name => !!name).map(name => `${pre}-${name}`));
  }

  // TODO Compatible with V4
  if (pre[pre.length - 1] === '-') {
    return `${pre}${className}`;
  }

  return `${pre}-${className}`;
}

export default curry(prefix);
