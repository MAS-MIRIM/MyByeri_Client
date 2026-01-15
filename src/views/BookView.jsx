import Container from "../components/ui/Container";
import BookCard from "../components/BookCard";
import EmptyState from "../components/EmptyState";

const BookView = ({ books, onSelectBook, onDeleteBook }) => {
  return (
    <Container>
      {books.length === 0 ? (
        <EmptyState
          message="아직 등록된 책이 없습니다"
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
