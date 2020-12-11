import React from 'react';

// React.isValidElement(object)
// 验证对象是否为 React 元素，返回值为 true 或 false。
export default function reactToString(element) {
  const nodes = [];
  const recursion = elmt => {
    React.Children.forEach(elmt.props.children, child => {
      if (React.isValidElement(child)) {
        recursion(child);
      } else if (typeof child === 'string') {
        nodes.push(child);
      }
    });
  };

  recursion(element);
  return nodes;
}
