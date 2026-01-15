import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AppContainer from "./components/ui/AppContainer";
import TopBar from "./components/ui/TopBar";
import NavBar from "./components/ui/NavBar";
import HomeView from "./views/HomeView";
import BookView from "./views/BookView";
import PuzzleView from "./views/PuzzleView";
import ProfileView from "./views/ProfileView";
import SearchView from "./views/SearchView";
import DetailView from "./views/DetailView";
import ChapterView from "./views/ChapterView";
import ReadingRecordView from "./views/ReadingRecordView";
import { loadBooks, saveBooks } from "./utils/storage";
import { generateReadingRecord } from "./utils/gemini";

function App() {
  const [view, setView] = useState("home");
  const [books, setBooks] = useState(() => loadBooks());
  const [currentBook, setCurrentBook] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (books.length > 0) {
      saveBooks(books);
    }
  }, [books]);

  const completedBooks = books.filter(
    (book) =>
      book.totalChapters > 0 &&
      book.completedChapters.length === book.totalChapters
  );
  const incompleteBooks = books.filter(
    (book) =>
      book.totalChapters === 0 ||
      book.completedChapters.length < book.totalChapters
  );

  useEffect(() => {
    window.updateBookReadingRecord = (bookId, readingRecord) => {
      setBooks((prevBooks) =>
        prevBooks.map((book) => {
          if (book.isbn === bookId) {
            return { ...book, readingRecord };
          }
          return book;
        })
      );
    };
    window.deleteBookReadingRecord = (bookId) => {
      setBooks((prevBooks) =>
        prevBooks.map((book) => {
          if (book.isbn === bookId) {
            return { ...book, readingRecord: null };
          }
          return book;
        })
      );
    };
    return () => {
      delete window.updateBookReadingRecord;
      delete window.deleteBookReadingRecord;
    };
  }, []);

  const updateReadingRecord = (bookId, readingRecord) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => {
        if (book.isbn === bookId) {
          return { ...book, readingRecord };
        }
        return book;
      })
    );
  };

  const deleteReadingRecord = (bookId) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => {
        if (book.isbn === bookId) {
          return { ...book, readingRecord: null };
        }
        return book;
      })
    );
  };

  const addBook = (bookData) => {
    const newBook = {
      ...bookData,
      completedChapters: [],
      notes: {},
      readingRecord: null,
    };
    setBooks([...books, newBook]);
  };

  const completeChapter = async (bookId, chapterNum, note) => {
    const updatedBooks = books.map((book) => {
      if (book.isbn === bookId) {
        const newCompletedChapters = [
          ...new Set([...book.completedChapters, chapterNum]),
        ];
        const updatedBook = {
          ...book,
          completedChapters: newCompletedChapters,
          notes: { ...book.notes, [chapterNum]: note },
        };

        if (
          newCompletedChapters.length === book.totalChapters &&
          !updatedBook.readingRecord
        ) {
          generateReadingRecord(updatedBook)
            .then((record) => {
              if (record) {
                setBooks((prevBooks) =>
                  prevBooks.map((b) =>
                    b.isbn === bookId ? { ...b, readingRecord: record } : b
                  )
                );
              }
            })
            .catch((error) => {
              console.error("독서 기록장 생성 실패:", error);
            });
        }

        return updatedBook;
      }
      return book;
    });

    setBooks(updatedBooks);
  };

  const deleteBook = (bookId) => {
    setBooks(books.filter((book) => book.isbn !== bookId));
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 30 : -30,
      opacity: 0,
    }),
  };

  const slideTransition = {
    type: "tween",
    ease: [0.4, 0, 0.2, 1],
    duration: 0.3,
  };

  const navigate = (newView, newDirection = 1) => {
    setDirection(newDirection);
    setView(newView);
  };

  const isMenuView = ["home", "book", "puzzle", "profile"].includes(view);

  return (
    <AppContainer>
      <TopBar
        onSearch={() => navigate("search", 1)}
        onLogoClick={() => navigate("home", -1)}
        showSearch={isMenuView}
      />

      <AnimatePresence mode="wait" custom={direction}>
        {view === "home" && (
          <motion.div
            key="home"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            style={{ width: "100%" }}
          >
            <HomeView />
          </motion.div>
        )}

        {view === "book" && (
          <motion.div
            key="book"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            style={{ width: "100%" }}
          >
            <BookView
              books={incompleteBooks}
              onSelectBook={(book) => {
                setCurrentBook(book);
                navigate("detail", 1);
              }}
              onDeleteBook={deleteBook}
            />
          </motion.div>
        )}

        {view === "puzzle" && (
          <motion.div
            key="puzzle"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            style={{ width: "100%" }}
          >
            <PuzzleView />
          </motion.div>
        )}

        {view === "profile" && (
          <motion.div
            key="profile"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            style={{ width: "100%" }}
          >
            <ProfileView
              completedBooks={completedBooks}
              onSelectBook={(book) => {
                setCurrentBook(book);
                navigate("detail", 1);
              }}
              onDeleteBook={deleteBook}
            />
          </motion.div>
        )}

        {view === "search" && (
          <motion.div
            key="search"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            style={{ width: "100%" }}
          >
            <SearchView
              onBack={() => navigate("home", -1)}
              onAddBook={addBook}
            />
          </motion.div>
        )}

        {view === "detail" && currentBook && (
          <motion.div
            key={`detail-${currentBook.isbn}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            style={{ width: "100%" }}
          >
            <DetailView
              book={currentBook}
              onBack={() => {
                const backView =
                  currentBook.completedChapters.length ===
                  currentBook.totalChapters
                    ? "profile"
                    : "book";
                setCurrentBook(null);
                navigate(backView, -1);
              }}
              onSelectChapter={(chapterNum) => {
                setCurrentChapter(chapterNum);
                navigate("chapter", 1);
              }}
              onViewReadingRecord={() => navigate("readingRecord", 1)}
            />
          </motion.div>
        )}

        {view === "chapter" && currentBook && currentChapter && (
          <motion.div
            key={`chapter-${currentBook.isbn}-${currentChapter}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            style={{ width: "100%" }}
          >
            <ChapterView
              book={currentBook}
              chapterNum={currentChapter}
              onBack={() => {
                setCurrentChapter(null);
                navigate("detail", -1);
              }}
              onComplete={(note) => {
                completeChapter(currentBook.isbn, currentChapter, note);
                setCurrentChapter(null);
                navigate("detail", -1);
              }}
            />
          </motion.div>
        )}

        {view === "readingRecord" && currentBook && (
          <motion.div
            key={`readingRecord-${currentBook.isbn}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            style={{ width: "100%" }}
          >
            <ReadingRecordView
              book={currentBook}
              onUpdateRecord={updateReadingRecord}
              onDeleteRecord={deleteReadingRecord}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {isMenuView && (
        <NavBar
          currentView={view}
          onNavigate={(viewId) => navigate(viewId, 1)}
        />
      )}
    </AppContainer>
  );
}

export default App;
