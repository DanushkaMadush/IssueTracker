import Modal from "./Modal";
import Button from "./Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  issue: {
    title: string;
    description: string;
    status: string;
    priority: string;
    severity: string;
  } | null;
  onResolve: () => void;
  onUpdate: () => void;
}

const IssueDetailsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  issue,
  onResolve,
  onUpdate,
}) => {
  if (!issue) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold mb-2">{issue.title}</h2>
      <p className="mb-2">{issue.description}</p>

      <p>Status: {issue.status}</p>
      <p>Priority: {issue.priority}</p>
      <p>Severity: {issue.severity}</p>

      <div className="flex gap-2 mt-4">
        <Button onClick={onResolve}>Mark as Resolved</Button>
        <Button variant="secondary" onClick={onUpdate}>
          Update
        </Button>
        <Button variant="tertiary" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default IssueDetailsModal;