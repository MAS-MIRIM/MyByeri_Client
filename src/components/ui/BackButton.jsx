import { ChevronLeft } from "lucide-react";

const BackButton = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      marginBottom: "2rem",
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
      e.target.style.color = "#374151";
      e.target.style.backgroundColor = "#F3F4F6";
    }}
    onMouseLeave={(e) => {
      e.target.style.color = "#6B7280";
      e.target.style.backgroundColor = "transparent";
    }}
  >
    <ChevronLeft size={20} />
    돌아가기
  </button>
);

export default BackButton;
