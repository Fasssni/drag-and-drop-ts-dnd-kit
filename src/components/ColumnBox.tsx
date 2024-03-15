import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { ColumnType, ItemType } from "../types";
import { Item } from "./Item";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";

interface Props {
  items: ItemType[];
  column: ColumnType;
}
export const ColumnBox = ({ items, column }: Props) => {
  const itemIds = useMemo(() => items.map((item) => item.id), [items]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      className="bg-stone-900 w-[350px] h-[500px] max-h-[500px] flex flex-col"
      style={style}
    >
      <div
        className="
      bg-mainBackgroundColor
      text-md
      h-[60px]
      cursor-grab
      rounded-md
      rounded-b-none
      p-3
      font-bold
      border-columnBackgroundColor
      border-4
      flex
      items-center
      justify-between
      "
        {...attributes}
        {...listeners}
        ref={setNodeRef}
      >
        <h4 className="text-lg">{column.title}</h4>
      </div>
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={itemIds}>
          {items.map((item) => {
            return <Item item={item} key={item.id} />;
          })}
        </SortableContext>
      </div>
    </div>
  );
};
