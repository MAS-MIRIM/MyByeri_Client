import { Book } from "lucide-react";

const SearchResultItem = ({ book, selected, onClick }) => (
  <div
    onClick={onClick}
    style={{
      backgroundColor: "white",
      borderRadius: "0.875rem",
      padding: "1.25rem",
      cursor: "pointer",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      border: selected ? "2px solid #66BB6A" : "1px solid #E5E7EB",
      boxShadow: selected 
        ? "0 4px 12px rgba(102, 187, 106, 0.2), 0 2px 4px rgba(0, 0, 0, 0.08)" 
        : "0 1px 2px rgba(0, 0, 0, 0.05)",
    }}
    onMouseEnter={(e) => {
      if (!selected) {
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.borderColor = "#D1D5DB";
      }
    }}
    onMouseLeave={(e) => {
      if (!selected) {
        e.currentTarget.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.05)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "#E5E7EB";
      }
    }}
  >
    <div style={{ display: "flex", gap: "1.25rem" }}>
      <div
        style={{
          width: "4.5rem",
          height: "6rem",
          background: "linear-gradient(135deg, #A5D6A7 0%, #81C784 100%)",
          borderRadius: "0.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        {book.cover ? (
          <img
            src={book.cover}
            alt={book.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "0.25rem",
            }}
          />
        ) : (
          <Book size={24} color="white" />
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3
          style={{
            fontWeight: "700",
            color: "#111827",
            marginBottom: "0.375rem",
            fontFamily: "Pretendard",
            fontSize: "1rem",
            lineHeight: "1.4",
          }}
        >
          {book.title}
        </h3>
        <p style={{ fontSize: "0.875rem", color: "#6B7280", fontFamily: "Pretendard", marginBottom: "0.25rem" }}>{book.author}</p>
        {book.publisher && (
          <p
            style={{
              fontSize: "0.8125rem",
              color: "#9CA3AF",
              marginTop: "0.25rem",
              fontFamily: "Pretendard",
            }}
          >
            {book.publisher}
          </p>
        )}
      </div>
    </div>
  </div>
);

export default SearchResultItem;
