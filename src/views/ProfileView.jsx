import CompletedBooksView from "./CompletedBooksView";

const ProfileView = ({
  completedBooks,
  onSelectBook,
  onDeleteBook,
}) => {
  return (
    <CompletedBooksView
      completedBooks={completedBooks}
      onSelectBook={onSelectBook}
      onDeleteBook={onDeleteBook}
    />
  );
};

export default ProfileView;
