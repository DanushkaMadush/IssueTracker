import Card from "./Card";

interface Props {
  title: string;
  count: number;
  bgColor?: string;
  titleColor?: string;
  countColor?: string;
}

const StatsCard: React.FC<Props> = ({
  title,
  count,
  bgColor = "bg-white",
  titleColor = "text-black",
  countColor = "text-black",
}) => {
  return (
    <Card className={bgColor}>
      <p className={`text-sm ${titleColor}`}>{title}</p>
      <h2 className={`text-2xl font-bold ${countColor}`}>{count}</h2>
    </Card>
  );
};

export default StatsCard;
