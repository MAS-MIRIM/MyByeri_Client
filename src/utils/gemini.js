const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

const buildPromptFromBook = (book) => {
  const { title, author, totalChapters, notes = {} } = book;

  const chapterTexts = Array.from({ length: totalChapters }, (_, i) => {
    const num = i + 1;
    const note = notes[num] || "";
    return `챕터 ${num}: ${note || "(노트 없음)"}`;
  }).join("\n");

  return `
너는 독서 코치야.

아래 책의 정보를 보고, 사용자가 챕터별로 남긴 노트를 바탕으로 한글로 "독서 기록장"을 예쁘게 정리해줘.

형식은 아래 가이드를 최대한 따라줘:

- 제목, 저자, 읽은 기간(사용자가 입력하지 않았으므로 생략 가능)을 간단히 정리
- 이 책을 선택한 이유(노트에서 유추해서 2~3문장)
- 전체 줄거리/내용을 3~6문장 정도로 요약
- 인상 깊었던 챕터나 장면 2~4개를 골라 구체적으로 정리
- 이 책을 읽고 느낀 점, 생각의 변화, 앞으로 해보고 싶은 것 등을 3~6문장 정도로 정리
- 마지막에 한 줄 평을 한 문장으로 써줘

문장은 모두 자연스러운 한국어 일기 형식으로 작성해줘.
너는 반드시 사용자의 노트 내용을 최대한 반영해서 써야 하고, 노트에 없는 내용은 과하게 지어내지 말아줘.

책 정보:
- 제목: ${title}
- 저자: ${author}
- 총 챕터 수: ${totalChapters}

챕터별 노트:
${chapterTexts}
`.trim();
};

export const generateReadingRecord = async (book) => {
  if (!GEMINI_API_KEY) {
    console.warn("Gemini API Key가 설정되지 않았습니다.");
    return "";
  }

  try {
    const prompt = buildPromptFromBook(book);

    const response = await fetch(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error(
        "Gemini API 요청 실패:",
        response.status,
        response.statusText
      );
      return "";
    }

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("") || "";

    return text.trim();
  } catch (error) {
    console.error("Gemini API 호출 중 오류:", error);
    return "";
  }
};
