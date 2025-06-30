import { Modal } from "./ui/modal";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useState, useEffect } from "react";
import { UrgencySelector } from "./urgency-selector";

export function EditTask({ isOpen, onClose, task, onSave }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState("low");

  useEffect(() => {
    if (isOpen && task) {
      setName(task.name || "");
      setDescription(task.description || "");
      setUrgency(task.urgency || "low");
    }
  }, [isOpen, task]);

  function handleSubmit() {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    onSave({
      ...task,
      name: trimmedName,
      description: description.trim(),
      urgency,
      updatedAt: new Date().toISOString(),
    });
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Task">
      <div className="space-y-4">
        {/* Name */}
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Edit task name"
        />

        {/* Description */}
        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Edit the task description"
          rows={4}
          className="mt-4"
        />

        <UrgencySelector value={urgency} onChange={setUrgency} />

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </div>
      </div>
    </Modal>
  );
}
