export interface User {
  id: string
  name: string
  email: string
  password: string
  createdAt: string
}

export interface Question {
  id: string
  topic: string
  difficulty: "easy" | "medium" | "hard"
  question: string
  expectedAnswer: string
  timeLimit: number // in seconds
}

export interface Interview {
  id: string
  userId: string
  topic: string
  difficulty: "easy" | "medium" | "hard"
  questions: Question[]
  answers: InterviewAnswer[]
  score: number
  feedback: string
  status: "completed" | "in-progress" | "abandoned"
  createdAt: string
  completedAt?: string
}

export interface InterviewAnswer {
  questionId: string
  answer: string
  timeSpent: number
  score: number
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

export interface InterviewContextType {
  currentInterview: Interview | null
  pastInterviews: Interview[]
  startInterview: (topic: string, difficulty: "easy" | "medium" | "hard") => void
  submitAnswer: (questionId: string, answer: string, timeSpent: number) => void
  completeInterview: () => void
  loading: boolean
}
