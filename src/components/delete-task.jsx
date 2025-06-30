import { Modal } from "./ui/modal";
import { Button } from "./ui/button";

export function DeleteTask({ isOpen, onClose, onConfirm, taskName }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Delete">
      <div className="space-y-6">
        <p>
          Are you sure you want to delete <strong>{taskName}</strong>? This
          action cannot be undone.
        </p>

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
