import { Check, Book, Loader2, Edit2, Save, X, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import Container from "../components/ui/Container";
import BackButton from "../components/ui/BackButton";
import Button from "../components/ui/Button";
import TextArea from "../components/ui/TextArea";
import ProgressBar from "../components/ui/ProgressBar";

const ReadingRecordView = ({
  book,
  onBack,
  onUpdateRecord,
  onDeleteRecord,
}) => {
  const [record, setRecord] = useState(book.readingRecord || "");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(!book.readingRecord);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecord, setEditedRecord] = useState(record);
  const progress =
    book.totalChapters > 0
      ? (book.completedChapters.length / book.totalChapters) * 100
      : 0;
  const isComplete = progress === 100;

  useEffect(() => {
    setRecord(book.readingRecord || "");
    setEditedRecord(book.readingRecord || "");
  }, [book.readingRecord]);

  useEffect(() => {
    if (
      !book.readingRecord &&
      book.completedChapters.length === book.totalChapters
    ) {
      generateRecord();
    }
  }, []);

  const generateRecord = async () => {
    setIsGenerating(true);
    setIsLoading(true);

    try {
      const { generateReadingRecord } = await import("../utils/gemini");
      const generatedRecord = await generateReadingRecord(book);

      if (generatedRecord) {
        setRecord(generatedRecord);
        setEditedRecord(generatedRecord);
        if (onUpdateRecord) {
          onUpdateRecord(book.isbn, generatedRecord);
        } else if (window.updateBookReadingRecord) {
          window.updateBookReadingRecord(book.isbn, generatedRecord);
        }
      } else {
        alert("독서 기록장 생성에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("독서 기록장 생성 오류:", error);
      alert("독서 기록장 생성 중 오류가 발생했습니다.");
    } finally {
      setIsGenerating(false);
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (onUpdateRecord) {
      onUpdateRecord(book.isbn, editedRecord);
    } else if (window.updateBookReadingRecord) {
      window.updateBookReadingRecord(book.isbn, editedRecord);
    }
    setRecord(editedRecord);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedRecord(record);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (
      window.confirm(
        "독서 기록장을 삭제하시겠습니까? 삭제 후에는 다시 생성할 수 있습니다."
      )
    ) {
      if (onDeleteRecord) {
        onDeleteRecord(book.isbn);
      } else if (window.deleteBookReadingRecord) {
        window.deleteBookReadingRecord(book.isbn);
      }
      setRecord("");
      setEditedRecord("");
      setIsEditing(false);
      setIsLoading(false);
    }
  };

  return (
    <Container padding="0 1rem 5rem 1rem">
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
        <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1.25rem" }}>
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
            ) : (
              <Book size={48} color="white" />
            )}
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
          </div>
        )}
      </div>

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "0.75rem",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          padding: "1.5rem",
        }}
      >
        {isLoading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "3rem",
              gap: "1rem",
            }}
          >
            <Loader2
              size={48}
              color="#9DD7FF"
              style={{ animation: "spin 1s linear infinite" }}
            />
            <p style={{ color: "#4b5563", fontSize: "1rem" }}>
              {isGenerating
                ? "독서 기록장을 생성하고 있어요..."
                : "독서 기록장을 불러오는 중..."}
            </p>
          </div>
        ) : record ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              {!isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: "#9DD7FF",
                      color: "white",
                      border: "none",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontWeight: "500",
                      fontSize: "0.875rem",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#7BC3FF")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#9DD7FF")
                    }
                  >
                    <Edit2 size={16} />
                    수정
                  </button>
                  <button
                    onClick={handleDelete}
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: "#ef4444",
                      color: "white",
                      border: "none",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontWeight: "500",
                      fontSize: "0.875rem",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#dc2626")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#ef4444")
                    }
                  >
                    <Trash2 size={16} />
                    삭제
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: "#9DD7FF",
                      color: "white",
                      border: "none",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontWeight: "500",
                      fontSize: "0.875rem",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#7BC3FF")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#9DD7FF")
                    }
                  >
                    <Save size={16} />
                    저장
                  </button>
                  <button
                    onClick={handleCancel}
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: "#6b7280",
                      color: "white",
                      border: "none",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontWeight: "500",
                      fontSize: "0.875rem",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#4b5563")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#6b7280")
                    }
                  >
                    <X size={16} />
                    취소
                  </button>
                </>
              )}
            </div>

            {isEditing ? (
              <TextArea
                value={editedRecord}
                onChange={(e) => setEditedRecord(e.target.value)}
                rows={20}
                placeholder="독서 기록장 내용을 입력하세요..."
              />
            ) : (
              <div
                style={{
                  lineHeight: "1.8",
                  color: "#1f2937",
                  whiteSpace: "pre-wrap",
                  fontSize: "1rem",
                }}
              >
                {record}
              </div>
            )}
          </>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "3rem",
              color: "#6b7280",
            }}
          >
            <p style={{ marginBottom: "1rem" }}>
              {book.completedChapters.length === book.totalChapters
                ? "독서 기록장이 없습니다. 생성해보세요!"
                : "모든 챕터를 완료하면 독서 기록장을 생성할 수 있습니다."}
            </p>
            {book.completedChapters.length === book.totalChapters && (
              <Button onClick={generateRecord} disabled={isGenerating}>
                {isGenerating ? "생성 중..." : "독서 기록장 생성하기"}
              </Button>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Container>
  );
};

export default ReadingRecordView;
