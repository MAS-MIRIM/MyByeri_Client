import { Search, BookOpen } from "lucide-react";
import Container from "../components/ui/Container";
import Header from "../components/ui/Header";
import BookCard from "../components/BookCard";
import EmptyState from "../components/EmptyState";

const HomeView = ({
  books,
  completedCount,
  onSearch,
  onSelectBook,
  onDeleteBook,
  onViewCompleted,
}) => (
  <Container>
    <Header
      title="MYBYERI"
      subtitle="처음부터 끝까지 읽게 만들기 위한 나만의 독서 뼈대"
    />

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
            "0 3px 8px rgba(76, 175, 80, 0.15), 0 1px 3px rgba(0, 0, 0, 0.06)";
          e.target.style.backgroundColor = "#D1E7DD";
          e.target.style.borderColor = "#A5D6A7";
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

    <button
      onClick={onSearch}
      style={{
        width: "100%",
        marginBottom: "2rem",
        padding: "1rem 1.5rem",
        backgroundColor: "white",
        borderRadius: "0.875rem",
        boxShadow:
          "0 2px 4px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.625rem",
        color: "#374151",
        fontWeight: "600",
        border: "1px solid #E5E7EB",
        cursor: "pointer",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        fontFamily: "Pretendard",
      }}
      onMouseEnter={(e) => {
        e.target.style.boxShadow =
          "0 3px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)";
        e.target.style.backgroundColor = "#FAFAFA";
        e.target.style.borderColor = "#D1D5DB";
      }}
      onMouseLeave={(e) => {
        e.target.style.boxShadow =
          "0 2px 4px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)";
        e.target.style.backgroundColor = "white";
        e.target.style.borderColor = "#E5E7EB";
      }}
    >
      <Search size={20} />책 검색하고 추가하기
    </button>

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
