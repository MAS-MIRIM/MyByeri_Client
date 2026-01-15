import { Check, ChevronRight } from "lucide-react";

const ChapterButton = ({ chapterNum, isCompleted, note, onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: "100%",
      boxSizing: "border-box",
      padding: "1.125rem 1.25rem",
      borderRadius: "0.75rem",
      textAlign: "left",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      backgroundColor: isCompleted ? "#EAF6FF" : "white",
      border: isCompleted ? "1.5px solid #BFE3FF" : "1px solid #E5E7EB",
      cursor: "pointer",
      fontFamily: "Pretendard",
      boxShadow: isCompleted
        ? "0 1px 3px rgba(90, 164, 230, 0.12)"
        : "0 1px 2px rgba(0, 0, 0, 0.05)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = isCompleted
        ? "#E3F2FF"
        : "#FAFAFA";
      e.currentTarget.style.borderColor = isCompleted ? "#B1DAFF" : "#E0E0E0";
      e.currentTarget.style.boxShadow = isCompleted
        ? "0 2px 5px rgba(90, 164, 230, 0.1)"
        : "0 2px 3px rgba(0, 0, 0, 0.05)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = isCompleted ? "#EAF6FF" : "white";
      e.currentTarget.style.borderColor = isCompleted ? "#BFE3FF" : "#E5E7EB";
      e.currentTarget.style.boxShadow = isCompleted
        ? "0 1px 3px rgba(90, 164, 230, 0.12)"
        : "0 1px 2px rgba(0, 0, 0, 0.05)";
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div
          style={{
            width: "2.25rem",
            height: "2.25rem",
            borderRadius: "9999px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "600",
            backgroundColor: isCompleted ? "#7BC3FF" : "#F3F4F6",
            color: isCompleted ? "white" : "#6B7280",
            fontSize: "0.875rem",
            boxShadow: isCompleted
              ? "0 2px 4px rgba(123, 195, 255, 0.2)"
              : "none",
          }}
        >
          {isCompleted ? <Check size={16} /> : chapterNum}
        </div>
        <span
          style={{
            fontWeight: "600",
            color: "#111827",
            fontFamily: "Pretendard",
            fontSize: "0.9375rem",
          }}
        >
          챕터 {chapterNum}
        </span>
      </div>
      <ChevronRight size={20} color="#9ca3af" />
    </div>
    {isCompleted && note && (
      <p
        style={{
          marginTop: "0.5rem",
          marginLeft: "2.75rem",
          fontSize: "0.875rem",
          color: "#4b5563",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          fontFamily: "Pretendard",
        }}
      >
        {note}
      </p>
    )}
  </button>
);

export default ChapterButton;
