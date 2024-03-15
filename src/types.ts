export type ColumnBoxType = {
  items: ItemType[];
};
export type ItemType = {
  id: number;
  columnId: number;
  content: string;
};

export type ColumnType = {
  id: number;
  title: string;
};
