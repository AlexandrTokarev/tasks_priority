import type { FC } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import { DraggableRow } from "./components/DraggableRow";
import { ITask } from "@/types/task";
import { useTasks } from "./TasksTable.hooks";

const columns = [
  { id: "id", label: "ИД", minWidth: 40, align: "center", type: "number" },
  {
    id: "name",
    label: "Название",
    minWidth: 250,
    align: "left",
    type: "string",
  },
  {
    id: "created",
    label: "Создана",
    minWidth: 170,
    align: "center",
    type: "datetime",
  },
  {
    id: "manager",
    label: "Автор",
    minWidth: 170,
    align: "center",
    type: "string",
  },
  {
    id: "priority",
    label: "Приоритет",
    maxWidth: 70,
    align: "center",
    type: "number",
  },
];

interface TaskTableProps {
  onSelectTask(task: ITask): void;
}

const TasksTable: FC<TaskTableProps> = ({ onSelectTask }) => {
  const { tasks, moveTasks } = useTasks();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      moveTasks(active.id, over?.id);
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>&nbsp;</TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="left"
                  style={{
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                  }}
                  variant="head"
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <SortableContext items={tasks}>
            <TableBody>
              {tasks.map((task) => (
                <DraggableRow
                  onDoubleClick={() => onSelectTask(task)}
                  key={task.id}
                  {...task}
                />
              ))}
            </TableBody>
          </SortableContext>
        </Table>
      </TableContainer>
    </DndContext>
  );
};

export { TasksTable };
