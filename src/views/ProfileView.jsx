import Container from "../components/ui/Container";
import CompletedBooksView from "./CompletedBooksView";

const ProfileView = ({ completedBooks, onSelectBook, onDeleteBook, onBack }) => {
  return (
    <Container>
      <CompletedBooksView
        completedBooks={completedBooks}
        onBack={onBack}
        onSelectBook={onSelectBook}
        onDeleteBook={onDeleteBook}
      />
    </Container>
  );
};

export default ProfileView;
