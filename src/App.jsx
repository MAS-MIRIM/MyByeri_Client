import { useState, useEffect } from "react";
import AppContainer from "./components/ui/AppContainer";
import HomeView from "./views/HomeView";
import SearchView from "./views/SearchView";
import DetailView from "./views/DetailView";
import ChapterView from "./views/ChapterView";
import CompletedBooksView from "./views/CompletedBooksView";
import ReadingRecordView from "./views/ReadingRecordView";
import { loadBooks, saveBooks } from "./utils/storage";
import { generateReadingRecord } from "./utils/gemini";

function App() {
  const [view, setView] = useState("home");
  const [books, setBooks] = useState(() => loadBooks());
  const [currentBook, setCurrentBook] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);

  useEffect(() => {
    if (books.length > 0) {
      saveBooks(books);
    }
  }, [books]);

  // 완독한 책과 미완독 책 분리
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

  // 독서 기록장 업데이트를 위한 전역 함수
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

        // 모든 챕터를 완료했고 아직 독서 기록장이 없으면 딱 한 번만 생성
        if (
          newCompletedChapters.length === book.totalChapters &&
          !updatedBook.readingRecord
        ) {
          // 비동기로 독서 기록장 생성 (딱 한 번만)
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

  return (
    <AppContainer>
      {view === "home" && (
        <HomeView
          books={incompleteBooks}
          completedCount={completedBooks.length}
          onSearch={() => setView("search")}
          onSelectBook={(book) => {
            setCurrentBook(book);
            setView("detail");
          }}
          onDeleteBook={deleteBook}
          onViewCompleted={() => setView("completed")}
        />
      )}

      {view === "search" && (
        <SearchView onBack={() => setView("home")} onAddBook={addBook} />
      )}

      {view === "completed" && (
        <CompletedBooksView
          completedBooks={completedBooks}
          onBack={() => setView("home")}
          onSelectBook={(book) => {
            setCurrentBook(book);
            setView("detail");
          }}
          onDeleteBook={deleteBook}
        />
      )}

      {view === "detail" && currentBook && (
        <DetailView
          book={currentBook}
          onBack={() => {
            setView(
              currentBook.completedChapters.length === currentBook.totalChapters
                ? "completed"
                : "home"
            );
            setCurrentBook(null);
          }}
          onSelectChapter={(chapterNum) => {
            setCurrentChapter(chapterNum);
            setView("chapter");
          }}
          onViewReadingRecord={() => setView("readingRecord")}
        />
      )}

      {view === "chapter" && currentBook && currentChapter && (
        <ChapterView
          book={currentBook}
          chapterNum={currentChapter}
          onBack={() => {
            setView("detail");
            setCurrentChapter(null);
          }}
          onComplete={(note) => {
            completeChapter(currentBook.isbn, currentChapter, note);
            setView("detail");
            setCurrentChapter(null);
          }}
        />
      )}

      {view === "readingRecord" && currentBook && (
        <ReadingRecordView
          book={currentBook}
          onBack={() => setView("detail")}
          onUpdateRecord={updateReadingRecord}
          onDeleteRecord={deleteReadingRecord}
        />
      )}
    </AppContainer>
  );
}

export default App;
