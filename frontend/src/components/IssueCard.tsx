// components/issues/IssueCard.tsx
import Card from "./Card";

interface Props {
  title: string;
  status: string;
  priority: string;
  severity: string;
  textColor?: string;
  bgColor?: string;
  onClick?: () => void;
}

const IssueCard: React.FC<Props> = ({
  title,
  status,
  priority,
  severity,
  textColor = "text-black",
  bgColor = "bg-white",
  onClick,
}) => {
  return (
    <Card
      className={`cursor-pointer ${bgColor} ${textColor}`}
      onClick={onClick}
    >
      <h3 className="font-semibold">{title}</h3>
      <p>Status: {status}</p>
      <p>Priority: {priority}</p>
      <p>Severity: {severity}</p>
    </Card>
  );
};

export default IssueCard;
