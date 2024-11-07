import type { FC } from "react";
import { IconButton, TableCell, TableRow, TableRowProps } from "@mui/material";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import type { ITask } from "@/types/task";
import { formatDate } from "@/utils";

interface DraggableRowProps extends ITask, Pick<TableRowProps, 'onDoubleClick'> {}

const DraggableRow: FC<DraggableRowProps> = ({ id, priority, title, created, manager, onDoubleClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow ref={setNodeRef} style={style} onDoubleClick={onDoubleClick}>
      <TableCell align="left">
        <IconButton {...attributes} {...listeners}>
          <DragIndicatorIcon />
        </IconButton>
      </TableCell>
      <TableCell align="left">{id}</TableCell>
      <TableCell align="left">{title}</TableCell>
      <TableCell align="left">{formatDate(created)}</TableCell>
      <TableCell align="left">{manager}</TableCell>
      <TableCell align="left">{priority}</TableCell>
    </TableRow>
  );
};

export { DraggableRow };
