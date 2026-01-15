import { Book } from "lucide-react";

const EmptyState = ({ message, submessage }) => (
  <div
    style={{
      textAlign: "center",
      padding: "6rem 2rem",
    }}
  >
    <div
      style={{
        width: "5rem",
        height: "5rem",
        borderRadius: "9999px",
        backgroundColor: "#F3F4F6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 1.5rem",
      }}
    >
      <Book size={40} color="#9CA3AF" />
    </div>
    <p style={{ color: "#374151", fontFamily: "Pretendard", fontSize: "1.125rem", fontWeight: "600", marginBottom: "0.5rem" }}>{message}</p>
    {submessage && (
      <p
        style={{ color: "#9CA3AF", fontSize: "0.9375rem", marginTop: "0.5rem", fontFamily: "Pretendard", lineHeight: "1.6" }}
      >
        {submessage}
      </p>
    )}
  </div>
);

export default EmptyState;
