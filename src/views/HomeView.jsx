import { useEffect, useState } from "react";
import Container from "../components/ui/Container";
import LevelImage from "../assets/Level.png";
import { searchBooks } from "../utils/api";

const HomeView = () => {
  const [weeklyRecommendations, setWeeklyRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isActive = true;

    const fetchWeeklyRecommendations = async () => {
      setLoading(true);
      const books = await searchBooks("베스트셀러", {
        size: 7,
        sort: "latest",
        target: "title",
      });
      if (isActive) {
        setWeeklyRecommendations(books.slice(0, 7));
        setLoading(false);
      }
    };

    fetchWeeklyRecommendations();
    return () => {
      isActive = false;
    };
  }, []);

  return (
    <Container>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <h2
            style={{
              fontSize: "1.4rem",
              fontWeight: "500",
              margin: 0,
              fontFamily: "Pretendard",
            }}
          >
            희진님
          </h2>
          <p
            style={{
              marginTop: "0.5rem",
              marginBottom: 0,
              fontSize: "1.4rem",
              fontWeight: "500",
              fontFamily: "Pretendard",
            }}
          >
            오늘도 독서 뼈대를 세워보아요!
          </p>
        </div>

        <div style={{ margin: "0" }}>
          <img
            src={LevelImage}
            alt="Level"
            style={{
              width: "100%",
              display: "block",
              textAlign: "center",
            }}
          />
        </div>

        <section>
          <div
            style={{
              fontSize: "1.4rem",
              fontWeight: "500",
              margin: "1rem 0",
              fontFamily: "Pretendard",
            }}
          >
            이번주 책 추천
          </div>
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              overflowX: "auto",
              paddingBottom: "0.5rem",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {(loading ? Array.from({ length: 7 }) : weeklyRecommendations).map(
              (book, index) => (
                <div
                  key={book?.isbn || book?.title || `rec-${index}`}
                  style={{
                    minWidth: "200px",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "12px",
                    padding: "1rem",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                    flex: "0 0 auto",
                  }}
                >
                  <div
                    style={{
                      height: "200px",
                      borderRadius: "10px",
                      background:
                        "linear-gradient(135deg, #D7EFFF 0%, #F1F8FF 100%)",
                      marginBottom: "0.75rem",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {book?.cover && (
                      <img
                        src={book.cover}
                        alt={book.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "0.35rem",
                      fontFamily: "Pretendard",
                    }}
                  >
                    {loading ? "추천 도서" : book.title}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#6B7280",
                      fontFamily: "Pretendard",
                    }}
                  >
                    {loading ? "불러오는 중..." : book.author}
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      </div>
    </Container>
  );
};

export default HomeView;
