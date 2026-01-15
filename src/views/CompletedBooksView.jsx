import { BookOpen, Trophy } from "lucide-react";
import Container from "../components/ui/Container";
import BackButton from "../components/ui/BackButton";
import Header from "../components/ui/Header";
import BookCard from "../components/BookCard";
import EmptyState from "../components/EmptyState";

const CompletedBooksView = ({
  completedBooks,
  onBack,
  onSelectBook,
  onDeleteBook,
}) => {
  return (
    <Container>
      <BackButton onClick={onBack} />
      <Header
        title="Finished Reads"
        subtitle={`총 ${completedBooks.length}권을 완독했어요!`}
      />

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
