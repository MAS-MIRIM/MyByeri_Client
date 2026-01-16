import { ChevronLeft } from "lucide-react";

const BackButton = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      marginBottom: "0.75rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      color: "#6B7280",
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: "0.9375rem",
      fontFamily: "Pretendard",
      fontWeight: "500",
      transition: "all 0.2s",
      padding: "0.5rem",
      marginLeft: "-0.5rem",
      borderRadius: "0.5rem",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.color = "#5AA4E6";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.color = "#6B7280";
    }}
  >
    <ChevronLeft size={20} />
    돌아가기
  </button>
);

export default BackButton;
