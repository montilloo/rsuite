import React from 'react';
// React组件可有效呈现大型列表和表格数据
import VirtualizedList, { ListProps } from 'react-virtualized/dist/commonjs/List';
import VirtualizedAutoSizer, { AutoSizerProps } from 'react-virtualized/dist/commonjs/AutoSizer';

export interface ListInstance {
  child: Element;
  scrollToRow?: (index: number) => void;
}

export type { ListProps, AutoSizerProps };
export const List = (VirtualizedList as any) as React.ComponentType<ListProps>;
export const AutoSizer = (VirtualizedAutoSizer as any) as React.ComponentType<AutoSizerProps>;
