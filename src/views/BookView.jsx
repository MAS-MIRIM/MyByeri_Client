import Container from "../components/ui/Container";
import BookCard from "../components/BookCard";
import EmptyState from "../components/EmptyState";

const BookView = ({ books, onSelectBook, onDeleteBook }) => {
  return (
    <Container>
      <div
        style={{
          fontSize: "1.25rem",
          fontWeight: "700",
          color: "#111827",
          marginBottom: "1.25rem",
          fontFamily: "Pretendard",
        }}
      >
        지금 읽고 있는 책
      </div>
      {books.length === 0 ? (
        <EmptyState
          message="지금 읽고 있는 책이 없습니다"
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
};

export default BookView;
