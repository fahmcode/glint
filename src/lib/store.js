import { generateId, loadFromStorage, saveToStorage } from "./utils";

let tasks = loadFromStorage() || [];

export function fetchTasks() {
  return [...tasks];
}

export function addTask({ name, description, urgency = "medium" }) {
  const now = new Date().toISOString();
  const newTask = {
    id: generateId(),
    name,
    description,
    status: "todo",
    urgency,
    createdAt: now,
    updatedAt: now,
  };
  tasks = [newTask, ...tasks];
  saveToStorage(tasks);
  return newTask;
}

export function editTask(id, updates) {
  let updatedTask = null;
  tasks = tasks.map((task) => {
    if (task.id === id) {
      updatedTask = {
        ...task,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      return updatedTask;
    }
    return task;
  });
  saveToStorage(tasks);
  return updatedTask;
}

export function deleteTask(id) {
  const initialLength = tasks.length;
  tasks = tasks.filter((task) => task.id !== id);
  const changed = tasks.length < initialLength;
  if (changed) saveToStorage(tasks);
  return changed;
}

export function updateTaskStatus(id, newStatus) {
  let updatedTask = null;
  tasks = tasks.map((task) => {
    if (task.id === id) {
      updatedTask = {
        ...task,
        status: newStatus,
        updatedAt: new Date().toISOString(),
      };
      return updatedTask;
    }
    return task;
  });
  saveToStorage(tasks);
  return updatedTask;
}
