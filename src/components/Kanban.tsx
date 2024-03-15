import { useMemo, useState } from "react";
import { ColumnType, ItemType } from "../types";
import { ColumnBox } from "./ColumnBox";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
const defaultCols: ColumnType[] = [
  {
    id: 1,
    title: "Todo",
  },
  {
    id: 2,
    title: "Work in progress",
  },
  {
    id: 3,
    title: "Done",
  },
];

const defaultItems: ItemType[] = [
  {
    id: 1,
    columnId: 1,
    content: "List admin APIs for dashboard",
  },
  {
    id: 2,
    columnId: 1,
    content:
      "Develop user registration functionality with OTP delivered on SMS after email confirmation and phone number confirmation",
  },
  {
    id: 3,
    columnId: 2,
    content: "Conduct security testing",
  },
  {
    id: 4,
    columnId: 2,
    content: "Analyze competitors",
  },
  {
    id: 5,
    columnId: 2,
    content: "Create UI kit documentation",
  },
  {
    id: 6,
    columnId: 3,
    content: "Dev meeting",
  },
  {
    id: 7,
    columnId: 3,
    content: "Deliver dashboard prototype",
  },
  {
    id: 8,
    columnId: 3,
    content: "Optimize application performance",
  },
  {
    id: 9,
    columnId: 3,
    content: "Implement data validation",
  },
  {
    id: 10,
    columnId: 3,
    content: "Design database schema",
  },
  {
    id: 11,
    columnId: 3,
    content: "Integrate SSL web certificates into workflow",
  },
  {
    id: 12,
    columnId: 2,
    content: "Implement error logging and monitoring",
  },
  {
    id: 13,
    columnId: 2,
    content: "Design and implement responsive UI",
  },
];

export const Kanban = () => {
  const [cols, setCols] = useState<ColumnType[]>(defaultCols);
  const [items, setItems] = useState<ItemType[]>(defaultItems);
  const [activeCol, setActiveCol] = useState<ColumnType | null>(null);
  const [activeItem, setActiveItem] = useState<ItemType | null>(null);

  const colIds = useMemo(() => cols.map((col) => col.id), [cols]);
  return (
    <main className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-auto px-[40px]">
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={colIds}>
              {cols.map((column) => {
                return (
                  <ColumnBox
                    items={items.filter((item) => item.columnId === column.id)}
                    column={column}
                    key={column.id}
                  />
                );
              })}
            </SortableContext>
          </div>
        </div>
      </DndContext>
    </main>
  );

  function onDragStart(e: DragStartEvent) {
    if (e.active.data.current?.type === "Column") {
      setActiveCol(e.active.data.current.column);
      console.log(e.active.data.current.column);
      return;
    }
    if (e.active.data.current?.type === "Item") {
      setActiveItem(e.active.data.current.item);
      console.log(e.active.data.current?.item);
    }
  }

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e;

    const isColumn = active.data.current?.type === "Column";
    console.log("over:", over, "active", active);
    if (isColumn) {
      if (active.id === over?.id) return;
      setCols((columns) => {
        const activeColumnIndex = columns.findIndex(
          (col) => col.id === active.id
        );
        const overColumnIndex = columns.findIndex((col) => col.id === over?.id);

        return arrayMove(columns, activeColumnIndex, overColumnIndex);
      });
      return;
    }
    if (active.id === over?.id) return;
    setItems((items) => {
      const activeItemIndex = items.findIndex((item) => item.id === active.id);
      const overItemIndex = items.findIndex((item) => item.id === over?.id);
      items[activeItemIndex].columnId = items[overItemIndex].columnId;

      return arrayMove(items, activeItemIndex, overItemIndex);
    });
  }
};
