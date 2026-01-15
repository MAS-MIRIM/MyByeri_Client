import Container from "../components/ui/Container";
import BookCard from "../components/BookCard";
import EmptyState from "../components/EmptyState";

const CompletedBooksView = ({ completedBooks, onSelectBook, onDeleteBook }) => {
  return (
    <Container>
      <div
        style={{
          fontSize: "1.25rem",
          fontWeight: "700",
          color: "#111827",
          marginBottom: "0.5rem",
          fontFamily: "Pretendard",
        }}
      >
        다 읽은 책
      </div>
      <div
        style={{
          fontSize: "0.95rem",
          color: "#6B7280",
          marginBottom: "1.5rem",
          fontFamily: "Pretendard",
        }}
      >
        총 {completedBooks.length}권을 완독했어요!
      </div>

      {completedBooks.length === 0 ? (
        <EmptyState
          message="아직 완독한 책이 없습니다"
          submessage="책을 읽고 챕터를 완료해보세요!"
        />
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {completedBooks.map((book) => (
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
};

export default CompletedBooksView;
