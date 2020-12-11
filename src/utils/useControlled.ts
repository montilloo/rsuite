import { useRef, useState, useCallback } from 'react';

/**
 * A hook for controlled value management.
 * 用于受控值管理的钩子。
 * In the case of passing the controlled value, the controlled value is returned, otherwise the value in state is returned.
 * 如果传递控制值，则返回控制值，否则返回状态值。
 * Generally used for a component including controlled and uncontrolled modes.
 * 通常用于包括受控和非受控模式的组件
 * @param controlledValue
 * @param defaultValue
 * @param formatValue
 */
function useControlled<T = any>(
  controlledValue: T,
  defaultValue: T,
  formatValue?: (value: T) => T
): [T, (value: React.SetStateAction<T>) => void, boolean] {
  const { current: isControlled } = useRef(controlledValue !== undefined);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  // If it is controlled, this directly returns the attribute value.
  let value = isControlled ? controlledValue : uncontrolledValue;

  value = formatValue ? formatValue(value) : value;

  const setValue = useCallback(
    (nextValue: React.SetStateAction<T>) => {
      // Only update the value in state when it is not under control.
      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }
    },
    [isControlled]
  );

  return [value, setValue, isControlled];
}

export default useControlled;
