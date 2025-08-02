import type React from "react"
import type { Question } from "../../types"
import { Card, CardContent, CardHeader } from "../ui/Card"
import { Clock } from "lucide-react"

interface QuestionDisplayProps {
  question: Question
  questionNumber: number
  totalQuestions: number
  timeRemaining: number
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  questionNumber,
  totalQuestions,
  timeRemaining,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Question {questionNumber} of {totalQuestions}
            </h2>
            <p className="text-sm text-gray-500">
              Topic: {question.topic} • Difficulty: {question.difficulty}
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span className={timeRemaining < 30 ? "text-red-600 font-medium" : ""}>{formatTime(timeRemaining)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-900 text-lg leading-relaxed">{question.question}</p>
      </CardContent>
    </Card>
  )
}
