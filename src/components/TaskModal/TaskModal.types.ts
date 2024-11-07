import { DialogProps } from "@mui/material";
import { ITask } from "@/types/task";

export interface TaskModalProps extends DialogProps {
  task: ITask | null;
}
