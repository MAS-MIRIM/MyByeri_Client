import { BookOpen } from "lucide-react";
import Container from "../components/ui/Container";
import BookCard from "../components/BookCard";
import EmptyState from "../components/EmptyState";

const HomeView = ({
  books,
  completedCount,
  onSelectBook,
  onDeleteBook,
  onViewCompleted,
}) => (
  <Container>
    {completedCount > 0 && (
      <button
        onClick={onViewCompleted}
        style={{
          width: "100%",
          marginBottom: "1rem",
          padding: "1rem 1.5rem",
          backgroundColor: "#E8F5E9",
          borderRadius: "0.875rem",
          boxShadow:
            "0 2px 4px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.625rem",
          color: "#4CAF50",
          fontWeight: "600",
          border: "1px solid #C8E6C9",
          cursor: "pointer",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          fontFamily: "Pretendard",
        }}
        onMouseEnter={(e) => {
          e.target.style.boxShadow =
            "0 2px 6px rgba(76, 175, 80, 0.12), 0 1px 2px rgba(0, 0, 0, 0.05)";
          e.target.style.backgroundColor = "#E0F2E1";
          e.target.style.borderColor = "#B8DBC0";
        }}
        onMouseLeave={(e) => {
          e.target.style.boxShadow =
            "0 2px 4px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)";
          e.target.style.backgroundColor = "#E8F5E9";
          e.target.style.borderColor = "#C8E6C9";
        }}
      >
        <BookOpen size={20} />
        완독한 책 {completedCount}권 보기
      </button>
    )}

    {books.length === 0 ? (
      <EmptyState
        message="아직 읽고 있는 책이 없습니다"
        submessage="첫 책을 추가해보세요!"
      />
    ) : (
      <div style={{ display: "grid", gap: "1.25rem" }}>
        {books.map((book) => (
          <BookCard
            key={book.isbn}
            book={book}
            onClick={() => onSelectBook(book)}
            onDelete={onDeleteBook}
          />
        ))}
      </div>
    )}
  </Container>
);

export default HomeView;
