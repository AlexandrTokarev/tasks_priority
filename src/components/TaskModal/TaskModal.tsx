import type { FC } from "react";
import { Dialog, DialogTitle } from "@mui/material";

import { TaskModalProps } from "./TaskModal.types";

const TaskModal: FC<TaskModalProps> = ({ task, ...restProps }) => {
  return (
    <Dialog {...restProps}>
      <DialogTitle>{task?.title}</DialogTitle>
    </Dialog>
  );
};

export { TaskModal };
