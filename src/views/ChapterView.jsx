import { useState } from "react";
import { Check } from "lucide-react";
import Container from "../components/ui/Container";
import BackButton from "../components/ui/BackButton";
import TextArea from "../components/ui/TextArea";
import Button from "../components/ui/Button";

const ChapterView = ({ book, chapterNum, onBack, onComplete }) => {
  const [note, setNote] = useState(book.notes[chapterNum] || "");
  const isCompleted = book.completedChapters.includes(chapterNum);
  const MIN_LENGTH = 10;

  const handleComplete = () => {
    if (note.trim().length < MIN_LENGTH) {
      alert(`최소 ${MIN_LENGTH}자 이상 입력해주세요`);
      return;
    }
    onComplete(note);
  };

  return (
    <Container>
      <BackButton onClick={onBack} />

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "1rem",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)",
          padding: "2rem",
          border: "1px solid rgba(0, 0, 0, 0.04)",
        }}
      >
        <div style={{ marginBottom: "2rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "0.5rem",
            }}
          >
            <div
              style={{
                width: "3rem",
                height: "3rem",
                borderRadius: "9999px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                color: "white",
                backgroundColor: isCompleted ? "#66BB6A" : "#81C784",
                fontSize: "1.125rem",
                boxShadow: isCompleted 
                  ? "0 4px 8px rgba(102, 187, 106, 0.3)" 
                  : "0 4px 8px rgba(129, 199, 132, 0.25)",
              }}
            >
              {isCompleted ? <Check size={22} /> : chapterNum}
            </div>
            <div>
              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: "700",
                  color: "#111827",
                  fontFamily: "Pretendard",
                  lineHeight: "1.3",
                  marginBottom: "0.25rem",
                }}
              >
                챕터 {chapterNum}
              </h2>
              <p style={{ fontSize: "0.9375rem", color: "#6B7280", fontFamily: "Pretendard" }}>
                {book.title}
              </p>
            </div>
          </div>
        </div>

        {isCompleted ? (
          <div
            style={{
              backgroundColor: "#E8F5E9",
              border: "1.5px solid #A5D6A7",
              borderRadius: "0.75rem",
              padding: "1.25rem",
              marginBottom: "2rem",
              boxShadow: "0 1px 3px rgba(76, 175, 80, 0.1)",
            }}
          >
            <p
              style={{
                color: "#4CAF50",
                fontWeight: "600",
                marginBottom: "0.375rem",
                fontFamily: "Pretendard",
                fontSize: "0.9375rem",
              }}
            >
              ✅ 완료한 챕터
            </p>
            <p style={{ fontSize: "0.875rem", color: "#66BB6A", fontFamily: "Pretendard" }}>
              이미 완료 처리된 챕터입니다
            </p>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "#F0F9F4",
              border: "1.5px solid #C8E6C9",
              borderRadius: "0.75rem",
              padding: "1.25rem",
              marginBottom: "2rem",
              boxShadow: "0 1px 3px rgba(102, 187, 106, 0.08)",
            }}
          >
            <p
              style={{
                color: "#66BB6A",
                fontWeight: "600",
                marginBottom: "0.375rem",
                fontFamily: "Pretendard",
                fontSize: "0.9375rem",
              }}
            >
              📖 챕터를 읽으셨나요?
            </p>
            <p style={{ fontSize: "0.875rem", color: "#81C784", fontFamily: "Pretendard" }}>
              감상이나 요약을 남겨주세요
            </p>
          </div>
        )}

        <div style={{ marginBottom: "1.5rem" }}>
          <label
            style={{
              display: "block",
              fontWeight: "500",
              color: "#374151",
              marginBottom: "0.5rem",
              fontFamily: "Pretendard",
            }}
          >
            감상 또는 요약 (최소 {MIN_LENGTH}자)
          </label>
          <TextArea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="이 챕터에서 가장 기억에 남는 내용이나 느낀 점을 적어보세요..."
            disabled={isCompleted}
          />
          <p
            style={{
              fontSize: "0.875rem",
              color: "#6b7280",
              marginTop: "0.25rem",
              fontFamily: "Pretendard",
            }}
          >
            {note.length} / {MIN_LENGTH}자 {note.length >= MIN_LENGTH && "✓"}
          </p>
        </div>

        {!isCompleted ? (
          <Button
            onClick={handleComplete}
            disabled={note.trim().length < MIN_LENGTH}
          >
            챕터 완료하기
          </Button>
        ) : (
          <div
            style={{
              textAlign: "center",
              color: "#6b7280",
              fontSize: "0.875rem",
              fontFamily: "Pretendard",
            }}
          >
            완료된 챕터는 수정할 수 없습니다
          </div>
        )}
      </div>
    </Container>
  );
};

export default ChapterView;
