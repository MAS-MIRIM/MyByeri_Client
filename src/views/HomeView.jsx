import Container from "../components/ui/Container";
import LevelImage from "../assets/Level.png";

const HomeView = () => {
  const weeklyRecommendations = [
    { title: "월요일의 기록", author: "김하늘" },
    { title: "푸른 페이지", author: "이서연" },
    { title: "잔잔한 파도", author: "박지우" },
    { title: "서재의 빛", author: "최민준" },
    { title: "읽는 사람", author: "한지민" },
    { title: "저녁의 문장", author: "정유나" },
    { title: "느린 호흡", author: "오세진" },
  ];

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
            {weeklyRecommendations.map((book) => (
              <div
                key={book.title}
                style={{
                  minWidth: "180px",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "12px",
                  padding: "1rem",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                  flex: "0 0 auto",
                }}
              >
                <div
                  style={{
                    height: "180px",
                    borderRadius: "10px",
                    background:
                      "linear-gradient(135deg, #D7EFFF 0%, #F1F8FF 100%)",
                    marginBottom: "0.75rem",
                  }}
                />
                <div
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "0.35rem",
                    fontFamily: "Pretendard",
                  }}
                >
                  {book.title}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "#6B7280",
                    fontFamily: "Pretendard",
                  }}
                >
                  {book.author}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Container>
  );
};

export default HomeView;
