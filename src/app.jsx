import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";

import { AddTask } from "./components/add-task";
import { EditTask } from "./components/edit-task";
import { DeleteTask } from "./components/delete-task";

import { formatDate } from "./lib/utils";
import {
  addTask,
  deleteTask,
  editTask,
  fetchTasks,
  updateTaskStatus,
} from "./lib/store";
import { Task } from "./components/tsak";
import { TaskDetails } from "./components/task-details";

export default function App() {
  const [isAddOpen, setAddOpen] = useState(false);
  const [tasks, setTasks] = useState(() => fetchTasks());

  const [isEditOpen, setEditOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [taskToDelete, setTaskToDelete] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [taskDetails, setTaskDetails] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  function handleDeleteClick(task) {
    setTaskToDelete(task);
    setDeleteModalOpen(true);
  }

  function handleConfirmDelete(taskId) {
    deleteTask(taskId);
    setTasks(fetchTasks());
    setDeleteModalOpen(false);
    setTaskToDelete(null);
  }

  function handleEdit(task) {
    setEditingTask(task);
    setEditOpen(true);
  }

  function handleSave(editedTask) {
    editTask(editedTask);
    setTasks((prev) =>
      prev.map((t) => (t.id === editedTask.id ? editedTask : t))
    );
  }

  useEffect(() => {
    setTasks(fetchTasks());
  }, []);

  const handleAdd = (task) => {
    if (!task) return;

    addTask(task);
    setTasks(fetchTasks());
  };

  const openDetails = (task) => {
    setTaskDetails(task);
    setDetailsOpen(true);
  };

  function handleToggleStatus(task) {
    if (task.status === "done") return;

    const nextStatusMap = {
      todo: "progress",
      progress: "done",
    };

    const nextStatus = nextStatusMap[task.status] || "todo";
    updateTaskStatus(task.id, nextStatus);
    setTasks(fetchTasks());
  }

  return (
    <div className="min-h-screen flex flex-col bg-white p-6 text-gray-900 items-center justify-center">
      <Card
        title="Tasks"
        actions={
          <div className="flex gap-2 items-center">
            <Button
              size="icon"
              title="Add Task"
              variant="secondary"
              onClick={() => setAddOpen(true)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        }
      >
        <ul className="divide-y divide-gray-200">
          {tasks.length === 0 ? (
            <li className="py-6 text-center text-gray-400 select-none">
              No tasks yet. Add your first task above!
            </li>
          ) : (
            tasks.map((task) => (
              <li key={task.id}>
                <Task
                  task={{
                    ...task,
                    createdAt: formatDate(task.createdAt),
                  }}
                  onToggle={handleToggleStatus}
                  onEdit={() => handleEdit(task)}
                  onOpen={() => openDetails(task)}
                  onDelete={() => handleDeleteClick(task)}
                />
              </li>
            ))
          )}
        </ul>
      </Card>

      <AddTask
        isOpen={isAddOpen}
        onAdd={handleAdd}
        onClose={() => setAddOpen(false)}
      />

      <EditTask
        isOpen={isEditOpen}
        onClose={() => setEditOpen(false)}
        task={editingTask}
        onSave={handleSave}
      />

      <DeleteTask
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => handleConfirmDelete(taskToDelete?.id)}
        taskName={taskToDelete?.name}
      />

      <TaskDetails
        task={taskDetails}
        isOpen={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      />
    </div>
  );
}
