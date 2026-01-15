import { Check, BookOpen } from "lucide-react";
import Container from "../components/ui/Container";
import BackButton from "../components/ui/BackButton";
import ProgressBar from "../components/ui/ProgressBar";
import ChapterButton from "../components/ChapterButton";
import Button from "../components/ui/Button";

const DetailView = ({ book, onBack, onSelectChapter, onViewReadingRecord }) => {
  const progress =
    book.totalChapters > 0
      ? (book.completedChapters.length / book.totalChapters) * 100
      : 0;
  const isComplete = progress === 100;
  const chapters = Array.from({ length: book.totalChapters }, (_, i) => i + 1);

  return (
    <Container padding="1.25rem 1.25rem 5rem 1.25rem">
      <BackButton onClick={onBack} />

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "1rem",
          boxShadow:
            "0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)",
          padding: "1.25rem",
          marginBottom: "1.25rem",
          border: "1px solid #E6F2FF",
        }}
      >
        <div
          style={{ display: "flex", gap: "1.5rem", marginBottom: "1.25rem" }}
        >
          <div
            style={{
              width: "8rem",
              height: "10rem",
              background: "linear-gradient(135deg, #BFE3FF 0%, #9DD7FF 100%)",
              borderRadius: "0.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.12)",
            }}
          >
            {book.cover ? (
              <img
                src={book.cover}
                alt={book.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "0.5rem",
                }}
              />
            ) : null}
          </div>

          <div style={{ flex: 1, marginTop: "0.75rem" }}>
            <h2
              style={{
                fontSize: "1.3rem",
                fontWeight: "600",
                marginBottom: "0.5rem",
                fontFamily: "Pretendard",
                lineHeight: "1.3",
              }}
            >
              {book.title}
            </h2>
            <p
              style={{
                color: "#6B7280",
                marginBottom: "1.25rem",
                fontFamily: "Pretendard",
                fontSize: "0.95rem",
              }}
            >
              {book.author}
            </p>

            <div style={{ marginBottom: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.875rem",
                  marginBottom: "0.5rem",
                }}
              >
                <span
                  style={{
                    color: "#6B7280",
                    fontFamily: "Pretendard",
                    fontWeight: "500",
                  }}
                >
                  읽은 챕터
                </span>
                <span
                  style={{
                    fontWeight: "700",
                    color: isComplete ? "#5AA4E6" : "#7BC3FF",
                    fontFamily: "Pretendard",
                    fontSize: "0.9375rem",
                  }}
                >
                  {book.completedChapters.length} / {book.totalChapters}
                </span>
              </div>
              <ProgressBar progress={progress} isComplete={isComplete} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "0.4rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#9CA3AF",
                    fontFamily: "Pretendard",
                  }}
                >
                  진행률
                </span>
                <span
                  style={{
                    fontWeight: "700",
                    color: isComplete ? "#7BC3FF" : "#9DD7FF",
                    fontFamily: "Pretendard",
                    fontSize: "0.85rem",
                  }}
                >
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          </div>
        </div>
        {isComplete && (
          <div>
            <div
              style={{
                backgroundColor: "#EAF6FF",
                border: "1px solid #BFE3FF",
                borderRadius: "0.5rem",
                padding: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              <Check size={24} color="#7BC3FF" />
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontWeight: "bold",
                    color: "#5AA4E6",
                    fontFamily: "Pretendard",
                  }}
                >
                  완독하셨습니다!
                </p>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#7BC3FF",
                    fontFamily: "Pretendard",
                  }}
                >
                  모든 챕터를 완료했어요 🎉
                </p>
              </div>
            </div>
            <Button
              onClick={onViewReadingRecord}
              variant="secondary"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              <BookOpen size={20} />
              독서 기록장 보기
            </Button>
          </div>
        )}
      </div>

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "1rem",
          boxShadow:
            "0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)",
          padding: "1.25rem",
          border: "1px solid #E6F2FF",
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
          챕터 목록
        </h3>
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {chapters.map((chapterNum) => (
            <ChapterButton
              key={chapterNum}
              chapterNum={chapterNum}
              isCompleted={book.completedChapters.includes(chapterNum)}
              note={book.notes[chapterNum]}
              onClick={() => onSelectChapter(chapterNum)}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default DetailView;
