import React from "react";
import Card from "./Card";
import { colors } from "../theme/colors";

type StatsVariant = "default" | "success" | "warning" | "danger";

interface Props {
  title: string;
  count: number;
  variant?: StatsVariant;
}

const variantStyles: Record<StatsVariant, { bg: string; accent: string }> = {
  default: {
    bg: colors.card,
    accent: colors.primary,
  },
  success: {
    bg: colors.surface,
    accent: colors.statusResolved,
  },
  warning: {
    bg: colors.surface,
    accent: colors.statusInProgress,
  },
  danger: {
    bg: colors.surface,
    accent: colors.statusOpen,
  },
};

const StatsCard: React.FC<Props> = ({ title, count, variant = "default" }) => {
  const { bg, accent } = variantStyles[variant];

  return (
    <Card
      style={{
        backgroundColor: bg,
        borderLeft: `4px solid ${accent}`,
      }}
    >
      <p
        style={{
          fontSize: "0.85rem",
          color: colors.textMuted,
          marginBottom: "6px",
        }}
      >
        {title}
      </p>

      <h2
        style={{
          fontSize: "1.6rem",
          fontWeight: 700,
          color: accent,
        }}
      >
        {count}
      </h2>
    </Card>
  );
};

export default StatsCard;