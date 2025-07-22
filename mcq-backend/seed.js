const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Exam = require('./models/Exam');
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    // Clear existing exams & questions
    await Exam.deleteMany();
    await Question.deleteMany();

    // ===== 1. JavaScript Basics =====
    const jsExam = await Exam.create({
      title: 'JavaScript Basics',
      description: 'A mock test on JS fundamentals',
    });

    await Question.insertMany([
      {
        exam_id: jsExam._id,
        question_text: 'What is the result of 1 + "1"?',
        options: ['2', '"2"', '"11"', 'NaN'],
        correct_option: 2,
      },
      {
        exam_id: jsExam._id,
        question_text: 'Which is used to declare a variable?',
        options: ['int', 'define', 'let', 'constant'],
        correct_option: 2,
      },
      {
        exam_id: jsExam._id,
        question_text: 'Which company created JavaScript?',
        options: ['Google', 'Microsoft', 'Netscape', 'IBM'],
        correct_option: 2,
      },
      {
        exam_id: jsExam._id,
        question_text: 'Which method converts JSON to an object?',
        options: ['JSON.stringify()', 'JSON.parse()', 'parse.JSON()', 'toObject()'],
        correct_option: 1,
      },
      {
        exam_id: jsExam._id,
        question_text: 'What is typeof NaN in JavaScript?',
        options: ['NaN', 'undefined', 'object', 'number'],
        correct_option: 3,
      },
    ]);

    // ===== 2. HTML Basics =====
    const htmlExam = await Exam.create({
      title: 'HTML Basics',
      description: 'Test your knowledge of basic HTML',
    });

    await Question.insertMany([
      {
        exam_id: htmlExam._id,
        question_text: 'What does HTML stand for?',
        options: [
          'Hyper Trainer Marking Language',
          'HyperText Markup Language',
          'HyperText Markdown Language',
          'HighText Machine Language',
        ],
        correct_option: 1,
      },
      {
        exam_id: htmlExam._id,
        question_text: 'What tag is used to insert an image?',
        options: ['<img>', '<image>', '<pic>', '<src>'],
        correct_option: 0,
      },
      {
        exam_id: htmlExam._id,
        question_text: 'Which tag is used for a hyperlink?',
        options: ['<link>', '<a>', '<href>', '<hyper>'],
        correct_option: 1,
      },
      {
        exam_id: htmlExam._id,
        question_text: 'Which tag is used to create a list?',
        options: ['<ul>', '<li>', '<ol>', 'All of the above'],
        correct_option: 3,
      },
      {
        exam_id: htmlExam._id,
        question_text: 'Which tag is used for line break?',
        options: ['<br>', '<lb>', '<break>', '<line>'],
        correct_option: 0,
      },
    ]);

    // ===== 3. React Fundamentals =====
    const reactExam = await Exam.create({
      title: 'React Fundamentals',
      description: 'Basic quiz on React.js concepts',
    });

    await Question.insertMany([
      {
        exam_id: reactExam._id,
        question_text: 'What is the command to create a new React app?',
        options: [
          'npx create-app react-app',
          'npm init react-app',
          'npx create-react-app myApp',
          'npm install react',
        ],
        correct_option: 2,
      },
      {
        exam_id: reactExam._id,
        question_text: 'What hook is used for managing state in functional components?',
        options: ['useEffect', 'useRef', 'useState', 'useCallback'],
        correct_option: 2,
      },
      {
        exam_id: reactExam._id,
        question_text: 'JSX stands for?',
        options: ['Java Syntax Extension', 'JavaScript XML', 'JavaScript Extension', 'JS HTML'],
        correct_option: 1,
      },
      {
        exam_id: reactExam._id,
        question_text: 'Which lifecycle hook runs after the component mounts?',
        options: ['useLayoutEffect', 'useEffect', 'componentWillMount', 'useRef'],
        correct_option: 1,
      },
      {
        exam_id: reactExam._id,
        question_text: 'Which of these is not a React hook?',
        options: ['useState', 'useEffect', 'useRouter', 'useContext'],
        correct_option: 2,
      },
    ]);

    console.log("✅ All exams and questions inserted successfully.");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  });
