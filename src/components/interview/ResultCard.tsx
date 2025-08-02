import type React from "react"
import type { Interview } from "../../types"
import { Card, CardContent, CardHeader } from "../ui/Card"
import { CheckCircle, Clock, Target } from "lucide-react"

interface ResultCardProps {
  interview: Interview
}

export const ResultCard: React.FC<ResultCardProps> = ({ interview }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBackground = (score: number) => {
    if (score >= 90) return "bg-green-100"
    if (score >= 80) return "bg-blue-100"
    if (score >= 70) return "bg-yellow-100"
    return "bg-red-100"
  }

  const totalTimeSpent = interview.answers.reduce((sum, answer) => sum + answer.timeSpent, 0)
  const averageTimePerQuestion = Math.round(totalTimeSpent / interview.answers.length)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Interview Results</h3>
          <CheckCircle className="h-6 w-6 text-green-500" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div className="text-center">
          <div
            className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getScoreBackground(interview.score)} mb-2`}
          >
            <span className={`text-2xl font-bold ${getScoreColor(interview.score)}`}>{interview.score}</span>
          </div>
          <p className="text-sm text-gray-600">Overall Score</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Target className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-lg font-semibold text-gray-900">{interview.topic}</p>
            <p className="text-sm text-gray-600">Topic</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-lg font-semibold text-gray-900">{Math.round(totalTimeSpent / 60)}m</p>
            <p className="text-sm text-gray-600">Total Time</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-lg font-semibold text-gray-900">{interview.questions.length}</p>
            <p className="text-sm text-gray-600">Questions</p>
          </div>
        </div>

        {/* Feedback */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Feedback</h4>
          <p className="text-gray-700 text-sm leading-relaxed">{interview.feedback}</p>
        </div>

        {/* Question Breakdown */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Question Breakdown</h4>
          <div className="space-y-2">
            {interview.questions.map((question, index) => {
              const answer = interview.answers.find((a) => a.questionId === question.id)
              return (
                <div
                  key={question.id}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                >
                  <span className="text-sm text-gray-700">Question {index + 1}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{answer ? Math.round(answer.timeSpent / 60) : 0}m</span>
                    <span className={`text-sm font-medium ${getScoreColor(answer?.score || 0)}`}>
                      {answer?.score || 0}/10
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
