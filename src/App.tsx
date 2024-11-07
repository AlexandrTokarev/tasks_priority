import { Container } from "@mui/material";
import { useState, type FC } from "react"

import type { ITask } from "./types/task";

import { TaskModal, TasksTable } from "./components";

const App: FC = () => {
  const [modal, setModal] = useState<{ open: boolean, task: ITask | null }>({ open: false, task: null});

	const handleSelectTask = (task: ITask) => {
		setModal({open: true, task});
	};

	const handleCloseModal = () => {
		setModal({ open: false, task: null });
	};

  return (
    <Container maxWidth="xl" fixed>
      <TasksTable onSelectTask={handleSelectTask} />
      <TaskModal open={modal.open} task={modal.task} onClose={handleCloseModal} />
    </Container>
  );
}

export { App };
