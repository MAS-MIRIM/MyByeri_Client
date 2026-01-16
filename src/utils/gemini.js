export const generateReadingRecord = async (book) => {
  if (!book) return "";

  const completedCount = book.completedChapters?.length || 0;
  const totalChapters = book.totalChapters || 0;
  const progress =
    totalChapters > 0
      ? Math.round((completedCount / totalChapters) * 100)
      : 0;

  const notes = book.notes || {};
  const sortedNotes = Object.keys(notes)
    .map((key) => Number(key))
    .filter((num) => Number.isFinite(num))
    .sort((a, b) => a - b)
    .map((chapterNum) => ({
      chapterNum,
      note: notes[chapterNum],
    }))
    .filter((item) => item.note && item.note.trim().length > 0);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const truncateText = (text, maxChars) => {
    if (text.length <= maxChars) return text;
    const clipped = text.slice(0, maxChars);
    const lastSpace = clipped.lastIndexOf(" ");
    return `${clipped.slice(0, Math.max(lastSpace, 0))}...`;
  };

  const firstSentence = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return "";
    const parts = trimmed.split(/[\n.!?。]/).map((part) => part.trim());
    return parts.find((part) => part.length > 0) || trimmed;
  };

  const findSentenceByKeywords = (keywords) => {
    for (const { note } of sortedNotes) {
      const sentences = note.split(/[\n.!?。]/);
      const match = sentences.find((sentence) =>
        keywords.some((keyword) => sentence.includes(keyword))
      );
      if (match && match.trim()) {
        return match.trim();
      }
    }
    return "";
  };

  const buildNarrative = () => {
    if (sortedNotes.length === 0) {
      return "아직 챕터 기록이 없어서 내용을 정리할 수 없습니다.";
    }

    return sortedNotes
      .map(({ note }) => note.trim())
      .join(" ")
      .replace(/\s+/g, " ");
  };

  const narrative = buildNarrative();
  const combinedNotes = sortedNotes.map((item) => item.note.trim()).join(" ");
  const summary = combinedNotes
    ? truncateText(narrative, 320)
    : "챕터 기록이 없어 줄거리 요약을 작성할 수 없습니다.";
  const highlight = sortedNotes.reduce(
    (current, item) =>
      item.note.trim().length > current.note.trim().length ? item : current,
    { note: "" }
  );
  const highlightText = highlight.note
    ? highlight.note.trim()
    : "기록이 없어 인상 깊은 부분을 고르기 어렵습니다.";
  const feelingLine =
    findSentenceByKeywords(["느꼈", "느낌", "생각", "깨달", "배웠", "인상"]) ||
    "기록을 종합하면 인물의 선택과 결과가 나에게도 생각할 거리를 남겼다.";
  const questionLine =
    findSentenceByKeywords(["왜", "의문", "납득", "동의", "비판", "?"]) ||
    "작품이 제시한 결론이 유일한 해답인지 의문이 남는다.";
  const motivationSeed = sortedNotes.length
    ? firstSentence(sortedNotes[0].note)
    : "";
  const motivation = motivationSeed
    ? `첫 기록에서 드러난 "${motivationSeed}"라는 관심이 이 책을 읽게 한 계기가 되었다.`
    : "이 책을 고른 이유를 한두 문장으로 정리해보자.";
  const oneLine = combinedNotes
    ? truncateText(narrative, 90)
    : "기록이 없어 한줄 정리를 작성할 수 없습니다.";

  const lines = [
    "도서 정보:",
    `- 제목: ${book.title || "-"}`,
    `- 저자: ${book.author || "-"}`,
    `- 출판사: ${book.publisher || "-"}`,
    `- 읽은 날짜: ${book.readingDate || formatDate(new Date())}`,
    "",
    "읽은 동기:",
    motivation,
    "",
    "줄거리 요약:",
    summary,
    "",
    "인상 깊은 부분:",
    `문장·장면: ${highlightText}`,
    "이유: 이 부분이 이야기의 핵심 흐름을 압축해 보여주기 때문이다.",
    "",
    "느낀 점:",
    feelingLine,
    "",
    "질문·비판:",
    questionLine,
    "",
    "한줄 정리:",
    oneLine,
  ];

  return lines.join("\n");
};
