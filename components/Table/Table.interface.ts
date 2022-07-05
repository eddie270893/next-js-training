import { ReactElement } from "react";

export type OnClickType = (type: string, value: any) => void;

export interface TableColumn {
  id: string;
  label: string;
  sortable?: boolean;
  className?: string;
  render: (
    value: any,
    onClick?: OnClickType
  ) => ReactElement;
}

export interface TableProps {
  columns: TableColumn[];
  data: any[];
  onClick: OnClickType;
}
