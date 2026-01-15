import { Check, ChevronRight } from "lucide-react";

const ChapterButton = ({ chapterNum, isCompleted, note, onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: "100%",
      padding: "1.125rem 1.25rem",
      borderRadius: "0.75rem",
      textAlign: "left",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      backgroundColor: isCompleted ? "#E8F5E9" : "white",
      border: isCompleted ? "1.5px solid #A5D6A7" : "1px solid #E5E7EB",
      cursor: "pointer",
      fontFamily: "Pretendard",
      boxShadow: isCompleted
        ? "0 1px 3px rgba(76, 175, 80, 0.12)"
        : "0 1px 2px rgba(0, 0, 0, 0.05)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = isCompleted
        ? "#C8E6C9"
        : "#F9FAFB";
      e.currentTarget.style.transform = "translateY(-1px)";
      e.currentTarget.style.boxShadow = isCompleted
        ? "0 4px 8px rgba(76, 175, 80, 0.15)"
        : "0 2px 4px rgba(0, 0, 0, 0.08)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = isCompleted ? "#E8F5E9" : "white";
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = isCompleted
        ? "0 1px 3px rgba(76, 175, 80, 0.12)"
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
            backgroundColor: isCompleted ? "#66BB6A" : "#F3F4F6",
            color: isCompleted ? "white" : "#6B7280",
            fontSize: "0.875rem",
            boxShadow: isCompleted
              ? "0 2px 4px rgba(102, 187, 106, 0.2)"
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
