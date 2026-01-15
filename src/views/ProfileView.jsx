import Container from "../components/ui/Container";
import CompletedBooksView from "./CompletedBooksView";

const ProfileView = ({
  completedBooks,
  onSelectBook,
  onDeleteBook,
}) => {
  return (
    <Container>
      <CompletedBooksView
        completedBooks={completedBooks}
        onSelectBook={onSelectBook}
        onDeleteBook={onDeleteBook}
      />
    </Container>
  );
};

export default ProfileView;
