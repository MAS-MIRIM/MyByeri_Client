import { useState } from "react";
import Container from "../components/ui/Container";
import BackButton from "../components/ui/BackButton";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import SearchResultItem from "../components/SearchResultItem";
import { searchBooks } from "../utils/api";

const SearchView = ({ onBack, onAddBook }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [totalChapters, setTotalChapters] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    const books = await searchBooks(query);
    setResults(books);
    setLoading(false);
  };

  const handleAddBook = () => {
    const chapters = parseInt(totalChapters);
    if (!chapters || chapters < 1) {
      alert("챕터 수를 1 이상 입력해주세요");
      return;
    }

    onAddBook({
      ...selectedBook,
      totalChapters: chapters,
    });

    onBack();
  };

  return (
    <Container>
      <BackButton onClick={onBack} />

      <div style={{ marginBottom: "1.5rem", display: "flex", gap: "0.5rem" }}>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          placeholder="책 제목을 입력하세요"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: loading ? "#9ca3af" : "#7BC3FF",
            color: "white",
            borderRadius: "0.75rem",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            whiteSpace: "nowrap",
            fontFamily: "Pretendard",
            fontWeight: "600",
            boxShadow: loading
              ? "none"
              : "0 2px 4px rgba(123, 195, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.06)",
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.target.style.backgroundColor = "#6FB9F2";
              e.target.style.boxShadow =
                "0 2px 6px rgba(123, 195, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.06)";
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.target.style.backgroundColor = "#7BC3FF";
              e.target.style.boxShadow =
                "0 2px 4px rgba(123, 195, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.06)";
            }
          }}
        >
          {loading ? "검색 중..." : "검색"}
        </button>
      </div>

      {results.length > 0 && (
        <div
          style={{ display: "grid", gap: "0.75rem", marginBottom: "1.5rem" }}
        >
          {results.map((book) => (
            <SearchResultItem
              key={book.isbn}
              book={book}
              selected={selectedBook?.isbn === book.isbn}
              onClick={() => setSelectedBook(book)}
            />
          ))}
        </div>
      )}

      {selectedBook && (
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "1rem",
            padding: "2rem",
            boxShadow:
              "0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)",
            border: "1px solid rgba(0, 0, 0, 0.04)",
          }}
        >
          <h3
            style={{
              fontWeight: "700",
              fontSize: "1.25rem",
              marginBottom: "1.5rem",
              fontFamily: "Pretendard",
              color: "#111827",
            }}
          >
            책 정보 입력
          </h3>
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "0.5rem",
                fontFamily: "Pretendard",
              }}
            >
              총 챕터 수 *
            </label>
            <Input
              type="number"
              min="1"
              value={totalChapters}
              onChange={(e) => setTotalChapters(e.target.value)}
              placeholder="예: 12"
            />
            <p
              style={{
                fontSize: "0.75rem",
                color: "#6b7280",
                marginTop: "0.25rem",
                fontFamily: "Pretendard",
              }}
            >
              책의 전체 챕터(장) 개수를 입력하세요
            </p>
          </div>
          <Button onClick={handleAddBook}>내 책장에 추가하기</Button>
        </div>
      )}
    </Container>
  );
};

export default SearchView;
