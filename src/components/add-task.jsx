import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Modal } from "./ui/modal";
import { Textarea } from "./ui/textarea";
import { useState, useEffect } from "react";
import { UrgencySelector } from "./urgency-selector";

export function AddTask({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState("low");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setDescription("");
      setUrgency("low");
    }
  }, [isOpen]);

  function handleSubmit() {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    onAdd({
      name: trimmedName,
      description: description.trim(),
      urgency,
    });
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Task">
      <div className="space-y-4">
        {/* Name */}
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter task name"
        />

        {/* Description */}
        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add an optional description"
          rows={4}
          className="mt-4"
        />

        <UrgencySelector value={urgency} onChange={setUrgency} />

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button onClick={handleSubmit}>Add Task</Button>
        </div>
      </div>
    </Modal>
  );
}
