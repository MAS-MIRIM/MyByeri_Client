import { Book, Loader2, Edit2, Save, X, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import TextArea from "../components/ui/TextArea";

const ReadingRecordView = ({
  book,
  onUpdateRecord,
  onDeleteRecord,
}) => {
  const [record, setRecord] = useState(book.readingRecord || "");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(!book.readingRecord);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecord, setEditedRecord] = useState(record);

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
    <Container>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "0.75rem",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          padding: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1.5rem" }}>
          <div
            style={{
              width: "8rem",
              height: "11rem",
              background: "linear-gradient(to bottom right, #BFE3FF, #9DD7FF)",
              borderRadius: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
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

          <div style={{ flex: 1 }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#1f2937",
                marginBottom: "0.5rem",
              }}
            >
              {book.title}
            </h2>
            <p style={{ color: "#4b5563", marginBottom: "1rem" }}>
              {book.author}
            </p>
            <div
              style={{
                padding: "0.75rem 1rem",
                backgroundColor: "#EAF6FF",
                borderRadius: "0.5rem",
                color: "#5AA4E6",
                fontWeight: "600",
                fontSize: "0.875rem",
              }}
            >
              📖 독서 기록장
            </div>
          </div>
        </div>
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
                {record.split("\n").map((line, index) => {
                  if (
                    line.trim().startsWith("#") ||
                    line.trim().match(/^[가-힣]+:$/)
                  ) {
                    return (
                      <h3
                        key={index}
                        style={{
                          fontWeight: "bold",
                          fontSize: "1.125rem",
                          color: "#5AA4E6",
                          marginTop: index > 0 ? "1.5rem" : "0",
                          marginBottom: "0.75rem",
                        }}
                      >
                        {line.replace(/^#+\s*/, "")}
                      </h3>
                    );
                  }
                  return (
                    <p key={index} style={{ marginBottom: "0.75rem" }}>
                      {line || "\u00A0"}
                    </p>
                  );
                })}
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
