import React from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { colors } from "../theme/colors";

interface Props {
  showPrev: boolean;
  showNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

const arrowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "36px",
  height: "36px",
  borderRadius: "10px",
  border: `1px solid ${colors.border}`,
  cursor: "pointer",
  transition: "all 0.2s ease",
};

const PaginationArrows: React.FC<Props> = ({
  showPrev,
  showNext,
  onPrev,
  onNext,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "12px",
        marginTop: "16px",
      }}
    >
      {showPrev && (
        <div
          style={arrowStyle}
          onClick={onPrev}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = colors.surface;
            e.currentTarget.style.borderColor = colors.primary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = colors.border;
          }}
        >
          <FiChevronUp color={colors.text} />
        </div>
      )}

      {showNext && (
        <div
          style={arrowStyle}
          onClick={onNext}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = colors.surface;
            e.currentTarget.style.borderColor = colors.primary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = colors.border;
          }}
        >
          <FiChevronDown color={colors.text} />
        </div>
      )}
    </div>
  );
};

export default PaginationArrows;