import { useMemo, useState } from "react";
import { fakeTasks } from "@/data/fakeTasks";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

export const useTasks = () => {
  const [tasks, setTasks] = useState(fakeTasks);

  const moveTasks = (activeId: UniqueIdentifier, overId?: UniqueIdentifier) => {
    const oldIndex = tasks.findIndex((task) => task.id === activeId);
    const newIndex = tasks.findIndex((task) => task.id === overId);

    const [startIdx, endIdx] =
      newIndex < oldIndex ? [newIndex, oldIndex] : [oldIndex, newIndex];
    const newTasks = arrayMove(tasks, oldIndex, newIndex);

    // изменяем поле priority
    for (let i = startIdx; i <= endIdx; i++) {
      newTasks[i].priority = i + 1;
    }

    setTasks(newTasks);
  };

  const sortedTasks = useMemo(() => {
    return tasks.sort((a, b) => a.priority - b.priority);
  }, [tasks]);

  return {
    tasks: sortedTasks,
    moveTasks,
  };
};
