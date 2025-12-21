import { educationalVideos, courses } from "./education";
import { entertainmentContent } from "./entertainment";
import { getContentBySubjectAndClass, boards } from "./subjects";

export const getContentById = (id) => {
  // Check if ID is a dynamic string ID (e.g., "CBSE-10-Science-0")
  if (typeof id === "string" && id.includes("-") && !id.startsWith("ent-")) {
    const parts = id.split("-");

    // Check if the first part is a board
    const boardValues = Object.values(boards);
    const boardKeys = Object.keys(boards);
    let board = boards.CBSE; // Default
    let startIndex = 0;

    if (boardKeys.includes(parts[0]) || boardValues.includes(parts[0])) {
      board = parts[0];
      startIndex = 1;
    }

    // Remaining parts starting from startIndex
    // We expect at least classLevel, subject, index
    if (parts.length >= startIndex + 3) {
      let classLevel;
      let subject;
      let index = parseInt(parts[parts.length - 1]);

      if (parts[startIndex] === "Pre" && parts[startIndex + 1] === "school") {
        classLevel = "Pre-school";
        subject = parts.slice(startIndex + 2, parts.length - 1).join("-");
      } else {
        classLevel = parseInt(parts[startIndex]);
        subject = parts.slice(startIndex + 1, parts.length - 1).join("-");
      }

      const items = getContentBySubjectAndClass(subject, classLevel, board);
      if (items && items[index]) {
        return items[index];
      }
    }
  }

  return [...educationalVideos, ...courses, ...entertainmentContent].find(
    (item) => item.id == id // Use loose equality to match string/number
  );
};
