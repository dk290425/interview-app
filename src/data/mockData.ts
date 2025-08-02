import type { User, Question, Interview } from "../types"

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    createdAt: "2024-01-02T00:00:00Z",
  },
]

export const mockQuestions: Question[] = [
  // JavaScript Questions
  {
    id: "js-1",
    topic: "JavaScript",
    difficulty: "easy",
    question: "What is the difference between let, const, and var in JavaScript?",
    expectedAnswer: "let and const are block-scoped, var is function-scoped. const cannot be reassigned.",
    timeLimit: 120,
  },
  {
    id: "js-2",
    topic: "JavaScript",
    difficulty: "medium",
    question: "Explain closures in JavaScript with an example.",
    expectedAnswer:
      "A closure is when a function has access to variables from its outer scope even after the outer function returns.",
    timeLimit: 180,
  },
  {
    id: "js-3",
    topic: "JavaScript",
    difficulty: "hard",
    question: "What is the event loop in JavaScript and how does it work?",
    expectedAnswer:
      "The event loop handles asynchronous operations by managing the call stack, callback queue, and microtask queue.",
    timeLimit: 240,
  },

  // React Questions
  {
    id: "react-1",
    topic: "React",
    difficulty: "easy",
    question: "What is JSX and why is it used in React?",
    expectedAnswer: "JSX is a syntax extension for JavaScript that allows writing HTML-like code in React components.",
    timeLimit: 120,
  },
  {
    id: "react-2",
    topic: "React",
    difficulty: "medium",
    question: "Explain the difference between state and props in React.",
    expectedAnswer:
      "State is internal component data that can change, props are external data passed from parent components.",
    timeLimit: 180,
  },
  {
    id: "react-3",
    topic: "React",
    difficulty: "hard",
    question: "What are React hooks and how do they work?",
    expectedAnswer: "Hooks are functions that let you use state and lifecycle features in functional components.",
    timeLimit: 240,
  },

  // Python Questions
  {
    id: "python-1",
    topic: "Python",
    difficulty: "easy",
    question: "What is the difference between a list and a tuple in Python?",
    expectedAnswer: "Lists are mutable and use square brackets, tuples are immutable and use parentheses.",
    timeLimit: 120,
  },
  {
    id: "python-2",
    topic: "Python",
    difficulty: "medium",
    question: "Explain list comprehensions in Python with an example.",
    expectedAnswer: "List comprehensions provide a concise way to create lists: [x**2 for x in range(10)]",
    timeLimit: 180,
  },
  {
    id: "python-3",
    topic: "Python",
    difficulty: "hard",
    question: "What are decorators in Python and how do they work?",
    expectedAnswer:
      "Decorators are functions that modify or extend the behavior of other functions without changing their code.",
    timeLimit: 240,
  },
]

export const mockInterviews: Interview[] = [
  {
    id: "int-1",
    userId: "1",
    topic: "JavaScript",
    difficulty: "medium",
    questions: [mockQuestions[0], mockQuestions[1]],
    answers: [
      {
        questionId: "js-1",
        answer: "let and const are block-scoped while var is function-scoped.",
        timeSpent: 95,
        score: 8,
      },
      {
        questionId: "js-2",
        answer: "Closures allow functions to access outer scope variables.",
        timeSpent: 150,
        score: 7,
      },
    ],
    score: 75,
    feedback: "Good understanding of basic concepts. Work on providing more detailed examples.",
    status: "completed",
    createdAt: "2024-01-15T10:00:00Z",
    completedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "int-2",
    userId: "1",
    topic: "React",
    difficulty: "easy",
    questions: [mockQuestions[3]],
    answers: [
      {
        questionId: "react-1",
        answer: "JSX is a syntax extension that allows HTML in JavaScript.",
        timeSpent: 80,
        score: 9,
      },
    ],
    score: 90,
    feedback: "Excellent understanding of JSX fundamentals.",
    status: "completed",
    createdAt: "2024-01-20T14:00:00Z",
    completedAt: "2024-01-20T14:15:00Z",
  },
]
