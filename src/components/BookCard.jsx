import { X, Check } from "lucide-react";
import Card from "./ui/Card";
import BookCover from "./ui/BookCover";
import ProgressBar from "./ui/ProgressBar";

const BookCard = ({ book, onClick, onDelete }) => {
  const progress =
    book.totalChapters > 0
      ? (book.completedChapters.length / book.totalChapters) * 100
      : 0;
  const isComplete = progress === 100;

  return (
    <div style={{ position: "relative" }}>
      <Card onClick={onClick}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm("이 책을 삭제하시겠습니까?")) {
              onDelete(book.isbn);
            }
          }}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            padding: "0.5rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            borderRadius: "9999px",
            opacity: 0,
            transition: "opacity 0.2s",
          }}
          className="delete-btn"
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#fee2e2")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          <X size={20} color="#ef4444" />
        </button>

        <div style={{ display: "flex", gap: "1.25rem" }}>
          <BookCover cover={book.cover} title={book.title} />

          <div style={{ flex: 1, minWidth: 0 }}>
            <h3
              style={{
                fontWeight: "700",
                fontSize: "1.25rem",
                color: "#111827",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                marginBottom: "0.5rem",
                fontFamily: "Pretendard",
                lineHeight: "1.4",
              }}
            >
              {book.title}
            </h3>
            <p
              style={{
                color: "#6B7280",
                fontSize: "0.9375rem",
                marginBottom: "1rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontFamily: "Pretendard",
                lineHeight: "1.5",
              }}
            >
              {book.author}
            </p>

            <div style={{ marginBottom: "0.75rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "0.875rem",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ color: "#6B7280", fontFamily: "Pretendard", fontWeight: "500" }}>
                  {book.completedChapters.length} / {book.totalChapters} 챕터
                </span>
                <span
                  style={{
                    fontWeight: "700",
                    color: isComplete ? "#5AA4E6" : "#7BC3FF",
                    fontFamily: "Pretendard",
                    fontSize: "0.9375rem",
                  }}
                >
                  {Math.round(progress)}%
                </span>
              </div>
              <ProgressBar progress={progress} isComplete={isComplete} />
            </div>

            {isComplete && (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  color: "#5AA4E6",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  fontFamily: "Pretendard",
                  backgroundColor: "#EAF6FF",
                  padding: "0.375rem 0.75rem",
                  borderRadius: "0.5rem",
                }}
              >
                <Check size={16} />
                완독!
              </div>
            )}
          </div>
        </div>
      </Card>
      <style>{`
        .delete-btn:hover { opacity: 1 !important; }
      `}</style>
    </div>
  );
};

export default BookCard;
