import { useSortable } from "@dnd-kit/sortable";
import { ItemType } from "../types";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  item: ItemType;
}
export const Item = ({ item }: Props) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    data: {
      type: "Item",
      item,
    },
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div
      className="  bg-stone-950  p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <div
        className="
        h-[90%]
        w-full resize-none border-none rounded bg-transparent text-white focus:outline-none
        "
      >
        {item.content}
      </div>
    </div>
  );
};
