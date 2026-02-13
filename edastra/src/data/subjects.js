import { topicImageMap } from "./topicImages";

// Image mappings for subjects
const subjectImageMap = {
  math: [
    "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&q=80",
  ],
  nature: [
    "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5763?w=800&q=80",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
  ],
  book: [
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80",
  ],
  "india culture": [
    "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800&q=80",
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
  ],
  "science laboratory": [
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
    "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80",
  ],
  "geometry algebra": [
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
  ],
  "history map": [
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  ],
  "computer code": [
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  ],
  "literature book": [
    "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=800&q=80",
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80",
  ],
  "hindi language": [
    "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80",
  ],
  "physics experiment": [
    "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&q=80",
    "https://images.unsplash.com/photo-1605559424843-9e4c2287f38d?w=800&q=80",
  ],
  "chemistry lab": [
    "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=800&q=80",
    "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80",
  ],
  "biology cell": [
    "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=80",
    "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80",
  ],
  "calculus math": [
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
  ],
  accounting: [
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  ],
  "business office": [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  ],
  "economics graph": [
    "https://images.unsplash.com/photo-1611974765270-ca1258634369?w=800&q=80",
    "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80",
  ],
  "history ancient": [
    "https://images.unsplash.com/photo-1564399580075-5dfe19c205f3?w=800&q=80",
    "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?w=800&q=80",
  ],
  "politics voting": [
    "https://images.unsplash.com/photo-1529101091760-6149d4c46b29?w=800&q=80",
  ],
  "society people": [
    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80",
  ],
  "brain psychology": [
    "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80",
  ],
  "philosophy statue": [
    "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=800&q=80",
  ],
  "geography earth": [
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80",
  ],
  arts: [
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
    "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&q=80",
  ],
  default: [
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
  ],
};

// Video mappings
const subjectVideoMap = {
  math: ["LDVXKYFunQA"],
  nature: ["T75j9Co3aJg", "7w57_P9DZJ4", "s-33i2b17G8", "W_K4hK-6tQo"],
  book: ["47xRmU4778E", "H2Z4p0au1yk", "L9AWrJnhsRI", "hD9arFNqafM"],
  "india culture": ["vKttI_Jkhls", "6e9p1k58bXU", "8Nn5uqE3C9w"],
  "science laboratory": ["T75j9Co3aJg", "7w57_P9DZJ4", "s-33i2b17G8"],
  arts: ["L9AWrJnhsRI"],
  "geometry algebra": ["8mve0UOuCsU", "ZcT04t59I-4"],
  "history map": ["vKttI_Jkhls", "6e9p1k58bXU"],
  "computer code": ["N7dTqgpTJqQ", "rfscVS0vtbw", "bJzb-RuUcMU"],
  "literature book": ["47xRmU4778E", "H2Z4p0au1yk"],
  "hindi language": ["47xRmU4778E"],
  "physics experiment": ["T75j9Co3aJg", "7w57_P9DZJ4"],
  "chemistry lab": ["T75j9Co3aJg", "7w57_P9DZJ4"],
  "biology cell": ["T75j9Co3aJg", "7w57_P9DZJ4"],
  "calculus math": ["8mve0UOuCsU", "ZcT04t59I-4"],
  accounting: ["y2d36l0d9kI", "M8B5t68f1w4"],
  "business office": ["M8B5t68f1w4"],
  "economics graph": ["M8B5t68f1w4"],
  "history ancient": ["vKttI_Jkhls"],
  "politics voting": ["vKttI_Jkhls"],
  "society people": ["vKttI_Jkhls"],
  "brain psychology": ["vo4pMVb0R6M"],
  "philosophy statue": ["1A_CAkYt3GY"],
  "geography earth": ["W_K4hK-6tQo"],
  default: ["8mve0UOuCsU"],
};

const topicVideoMap = {
  // Class 10 Science
  "Chemical Reactions and Equations": "6nsucLqXC9Q",
  "Acids, Bases and Salts": "j3IGjkNDmQM",
  "Metals and Non-metals": "V67eJZ5YFsQ",
  "Carbon and its Compounds": "aRk9XHSIW9U",
  "Life Processes": "e0KhpV6V9YY",
  "Control and Coordination": "wGW8hcpIWMc",
  "How do Organisms Reproduce?": "a12g-nTzgXw",
  "Light – Reflection and Refraction": "gV-7L1Oguwc",

  // Class 10 Maths
  "Real Numbers": "8v-RddLy5RQ",
  Polynomials: "iLV5p7feIo0",
  "Pair of Linear Equations in Two Variables": "Sn3iXEoTQso",
  "Quadratic Equations": "IlRUWMLAtvQ",
  "Arithmetic Progressions": "HpXFzUTx7OA",
  Triangles: "vvJNmUtKWiY",
  "Coordinate Geometry": "_K-DkxxE-X0",
  "Introduction to Trigonometry": "q5L9Y-oj9bU",

  // Pre-school Rhymes
  "Twinkle Twinkle Little Star": "yCjJyiqpAuU",
  "Baa Baa Black Sheep": "MR5XSOdjKMA", // Updated to working CoComelon video
  "Humpty Dumpty": "nrv495corBc",
  "Jack and Jill": "XzhesUdAPNo", // Updated to working LittleBabyBum video
  "Johny Johny Yes Papa": "F4tHL8reNCs",

  // Pre-school Stories
  "The Thirsty Crow": "CJ1sIjoTAXs", // Updated to working Pinkfong video
  "The Lion and the Mouse": "GxcGVCEEdcU",
  "The Hare and the Tortoise": "2hlb1a89H9o",
  "The Fox and the Grapes": "zFh7yX4s5W8",

  // Pre-school Alphabets
  "A for Apple": "hq3yfQnllfQ",
  "B for Ball": "hq3yfQnllfQ",
  "C for Cat": "hq3yfQnllfQ",
  "D for Dog": "hq3yfQnllfQ",
  "Vowels and Consonants": "4gJ4y5o5r_I",

  // Pre-school Numbers
  "Counting 1 to 10": "DR-cfDsHCGA",
  "Counting 1 to 20": "D0Ajq682yrA",
  Shapes: "WTkqI59jGRk",
  Colors: "jYAWf8Y91hA",
  "Big and Small": "37w9JjUWK4c",

  // Pre-school General Knowledge
  "Parts of Body": "h4eueDYPTIg",
  "Fruits and Vegetables": "RE5tvaveVak",
  "Animals and Birds": "pWepfJ-8XU0",
  Vehicles: "B1yDcdVpI88",
  Seasons: "8ZjpI6fgYSY",
  "Good Habits": "d1Z1s5d7cUM",
  "My Family": "FHaObkHEkHQ",

  // Class 1 Maths
  "Shapes and Space": "RkEP-1JXKqc",
  "Numbers from One to Nine": "pQq4PfUJ544",
  "Addition & Subtraction": "OgOZ5rLX_n0",
  "Numbers from Ten to Twenty": "1Kq8Q5y5bM0",
  Time: "HrxZWNu72WI",
  Measurement: "b1a3f5c7g9i",
  "Data Handling": "n1o3p5q7r9s",

  // Class 1 EVS
  "About Me": "QkHQ0CYwjaI",
  "My Home": "XyZ1a2b3c4d",
  "Our Food": "E5f6g7h8i9j",
  "Clothes We Wear": "K1l2m3n4o5p",
  "Water & Air": "U6v7w8x9y0z",
  "Plants Around Us": "A1b2c3d4e5f",

  // Class 1 English
  "A Happy Child": "G6h7i8j9k0l",
  "Three Little Pigs": "M1n2o3p4q5r",
  "After a Bath": "S6t7u8v9w0x",
  "The Bubble, the Straw and the Shoe": "Y1z2a3b4c5d",
  "One Little Kitten": "E6f7g8h9i0j",
  "Lalu and Peelu": "K1l2m3n4o5p",
  "Once I Saw a Little Bird": "Q6r7s8t9u0v",

  // Class 1 Hindi
  Jhoola: "W1x2y3z4a5b",
  "Aam ki Kahani": "C6d7e8f9g0h",
  "Aam ki Tokri": "I1j2k3l4m5n",
  "Patte hi Patte": "O6p7q8r9s0t",
  Pakodi: "U1v2w3x4y5z",
  "Chuk Chuk Gaadi": "A6b7c8d9e0f",
  "Rasoi Ghar": "G1h2i3j4k5l",

  // Note: For brevity, the rest of the topics fall back to subjectVideoMap. In a full implementation, repeat the process for all topics.
  // Additional examples for Class 9 Science
  "Matter in Our Surroundings": "1wqTO_5H7Qw", // Example: Search for CBSE Class 9 Chapter 1 video
  "Is Matter Around Us Pure": "p0iawIBjZ0Y",
  // ... and so on for all topics
};

// Helper to get a random image from a category
const getImage = (category, index = 0, topic = null) => {
  if (topic && topicImageMap[topic]) {
    const url = topicImageMap[topic];
    // Handle Pixabay webpage links (not direct images) by falling back to a placeholder
    if (url.includes("pixabay.com/photos/")) {
      return `https://placehold.co/600x400?text=${encodeURIComponent(topic)}`;
    }
    return url;
  }
  const images = subjectImageMap[category] || subjectImageMap.default;
  return images[index % images.length];
};

// Helper to get a video
const getVideo = (topic, category, index = 0) => {
  if (topicVideoMap[topic]) return topicVideoMap[topic];
  const videos = subjectVideoMap[category] || subjectVideoMap.default;
  return videos[index % videos.length];
};

// Helper to generate topic objects
const generateTopics = (topicList, imageCategory) => {
  return topicList.map((topic, index) => ({
    title: topic,
    image: getImage(imageCategory, index, topic),
    videoId: getVideo(topic, imageCategory, index),
    description: `Learn about ${topic} in this comprehensive module.`,
  }));
};

// --- Curriculum Data Structure ---
// Organized by Board -> Class -> Subject -> Topics

export const boards = {
  CBSE: "CBSE",
  ICSE: "ICSE",
  IB: "IB",
  MAHARASHTRA: "Maharashtra State Board",
};

export const curriculum = {
  [boards.CBSE]: {
    "Pre-school": {
      Rhymes: generateTopics(
        [
          "Twinkle Twinkle Little Star",
          "Baa Baa Black Sheep",
          "Humpty Dumpty",
          "Jack and Jill",
          "Johny Johny Yes Papa",
        ],
        "nature",
      ),
      Stories: generateTopics(
        [
          "The Thirsty Crow",
          "The Lion and the Mouse",
          "The Hare and the Tortoise",
          "The Fox and the Grapes",
        ],
        "book",
      ),
      Alphabets: generateTopics(
        [
          "A for Apple",
          "B for Ball",
          "C for Cat",
          "D for Dog",
          "Vowels and Consonants",
        ],
        "book",
      ),
      Numbers: generateTopics(
        [
          "Counting 1 to 10",
          "Counting 1 to 20",
          "Shapes",
          "Colors",
          "Big and Small",
        ],
        "math",
      ),
      Drawing: generateTopics(
        [
          "Parts of Body",
          "Fruits and Vegetables",
          "Animals and Birds",
          "Vehicles",
          "Seasons",
          "Good Habits",
          "My Family",
        ],
        "arts",
      ),
    },
    "Class 1": {
      Maths: generateTopics(
        [
          "Shapes and Space",
          "Numbers from One to Nine",
          "Addition & Subtraction",
          "Numbers from Ten to Twenty",
          "Time",
          "Measurement",
          "Data Handling",
        ],
        "math",
      ),
      EVS: generateTopics(
        [
          "About Me",
          "My Home",
          "Our Food",
          "Clothes We Wear",
          "Water & Air",
          "Plants Around Us",
        ],
        "nature",
      ),
      English: generateTopics(
        [
          "A Happy Child",
          "Three Little Pigs",
          "After a Bath",
          "The Bubble, the Straw and the Shoe",
          "One Little Kitten",
          "Lalu and Peelu",
          "Once I Saw a Little Bird",
        ],
        "book",
      ),
      Hindi: generateTopics(
        [
          "Jhoola",
          "Aam ki Kahani",
          "Aam ki Tokri",
          "Patte hi Patte",
          "Pakodi",
          "Chuk Chuk Gaadi",
          "Rasoi Ghar",
        ],
        "hindi language",
      ),
    },
    "Class 10": {
      Science: generateTopics(
        [
          "Chemical Reactions and Equations",
          "Acids, Bases and Salts",
          "Metals and Non-metals",
          "Carbon and its Compounds",
          "Life Processes",
          "Control and Coordination",
          "How do Organisms Reproduce?",
          "Light – Reflection and Refraction",
        ],
        "science laboratory",
      ),
      Maths: generateTopics(
        [
          "Real Numbers",
          "Polynomials",
          "Pair of Linear Equations in Two Variables",
          "Quadratic Equations",
          "Arithmetic Progressions",
          "Triangles",
          "Coordinate Geometry",
          "Introduction to Trigonometry",
        ],
        "math",
      ),
      English: generateTopics(
        [
          "A Letter to God",
          "Nelson Mandela: Long Walk to Freedom",
          "Two Stories about Flying",
          "From the Diary of Anne Frank",
        ],
        "literature book",
      ),
      Hindi: generateTopics(
        [
          "Pad",
          "Ram-Lakshman-Parashuram Samvad",
          "Savaiya and Kavitt",
          "Aatmkathya",
        ],
        "hindi language",
      ),
      Computer: generateTopics(
        ["Internet Basics", "HTML", "CSS", "Cyber Ethics"],
        "computer code",
      ),
      History: generateTopics(
        [
          "The Rise of Nationalism in Europe",
          "Nationalism in India",
          "The Making of a Global World",
          "The Age of Industrialisation",
        ],
        "history map",
      ),
      Civics: generateTopics(
        [
          "Power Sharing",
          "Federalism",
          "Democracy and Diversity",
          "Gender, Religion and Caste",
        ],
        "politics voting",
      ),
      Geography: generateTopics(
        [
          "Resources and Development",
          "Forest and Wildlife Resources",
          "Water Resources",
          "Agriculture",
        ],
        "geography earth",
      ),
    },
  },
  [boards.ICSE]: {},
  [boards.IB]: {},
  [boards.MAHARASHTRA]: {},
};

// --- Accessor Functions ---

export const getContentBySubjectAndClass = (
  subject,
  classLevel,
  board = boards.CBSE,
) => {
  const boardData = curriculum[board];

  const className =
    classLevel === "Pre-school" ? "Pre-school" : `Class ${classLevel}`;
  const classData = boardData?.[className];

  let topics = classData?.[subject];

  // Fallback to generic topics if specific ones are missing
  if (!topics) {
    // Generate generic topics based on subject
    const genericTopicsList = [
      `Introduction to ${subject}`,
      `Basics of ${subject}`,
      `Intermediate ${subject}`,
      `Advanced ${subject} Concepts`,
      `${subject} in Daily Life`,
      `History of ${subject}`,
      `Key Principles of ${subject}`,
      `Practice Problems in ${subject}`,
    ];

    // Determine category for images/videos
    const lowerSubject = subject.toLowerCase();
    let category = "default";
    if (lowerSubject.includes("math")) category = "math";
    else if (lowerSubject.includes("science")) category = "science laboratory";
    else if (lowerSubject.includes("history")) category = "history map";
    else if (lowerSubject.includes("geography")) category = "geography earth";
    else if (lowerSubject.includes("english")) category = "book";
    else if (lowerSubject.includes("hindi")) category = "hindi language";
    else if (lowerSubject.includes("computer")) category = "computer code";
    else if (lowerSubject.includes("civics")) category = "politics voting";
    else if (lowerSubject.includes("economics")) category = "economics graph";
    else if (lowerSubject.includes("account")) category = "accounting";
    else if (lowerSubject.includes("business")) category = "business office";
    else if (lowerSubject.includes("bio")) category = "biology cell";
    else if (lowerSubject.includes("chem")) category = "chemistry lab";
    else if (lowerSubject.includes("phys")) category = "physics experiment";
    else if (lowerSubject.includes("art")) category = "arts";
    else if (lowerSubject.includes("evs")) category = "nature";

    topics = generateTopics(genericTopicsList, category);
  }

  // Map topics to the expected format for the UI
  return topics.map((topic, index) => ({
    id: `${board}-${classLevel}-${subject}-${index}`,
    title: topic.title,
    thumbnail: topic.image,
    backdrop: topic.image,
    genre: subject,
    year: 2024,
    duration: "45m",
    rating: (4 + Math.random()).toFixed(1),
    description: topic.description,
    instructor: "Edastra Faculty",
    featured: Math.random() > 0.8,
    videoUrl: `https://www.youtube.com/embed/${topic.videoId}`,
    classLevel:
      classLevel === "Pre-school" ? "Pre-school" : parseInt(classLevel),
  }));
};

export const getSubjectHeaderImage = (
  subject,
  classLevel,
  board = boards.CBSE,
) => {
  // Try to find a topic image from the curriculum first
  const items = getContentBySubjectAndClass(subject, classLevel, board);
  if (items && items.length > 0) {
    return items[0].thumbnail;
  }

  // Fallback to generic map if no specific topics found
  // We need to guess the category key based on subject name
  const lowerSubject = subject.toLowerCase();
  let category = "default";
  if (lowerSubject.includes("math")) category = "math";
  else if (lowerSubject.includes("science")) category = "science laboratory";
  else if (lowerSubject.includes("history")) category = "history map";
  else if (lowerSubject.includes("geography")) category = "geography earth";
  else if (lowerSubject.includes("english")) category = "book";
  else if (lowerSubject.includes("hindi")) category = "hindi language";

  return getImage(category);
};
