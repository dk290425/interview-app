"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useInterview } from "../contexts/InterviewContext"
import { Button } from "../components/ui/Button"
import { QuestionDisplay } from "../components/interview/QuestionDisplay"
import { AudioRecorder } from "../components/interview/AudioRecorder"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { ArrowRight, X } from "lucide-react"

export const InterviewLive: React.FC = () => {
  const { currentInterview, submitAnswer, completeInterview } = useInterview()
  const navigate = useNavigate()

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [answer, setAnswer] = useState("")
  const [isRecording, setIsRecording] = useState(false)

  useEffect(() => {
    if (!currentInterview) {
      navigate("/dashboard")
      return
    }

    // Set initial time for current question
    const currentQuestion = currentInterview.questions[currentQuestionIndex]
    if (currentQuestion) {
      setTimeRemaining(currentQuestion.timeLimit)
    }
  }, [currentInterview, currentQuestionIndex, navigate])

  useEffect(() => {
    if (timeRemaining > 0 && !isRecording) {
      const timer = setTimeout(() => {
        setTimeRemaining((prev) => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeRemaining === 0 && answer) {
      handleNextQuestion()
    }
  }, [timeRemaining, isRecording, answer])

  if (!currentInterview) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const currentQuestion = currentInterview.questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === currentInterview.questions.length - 1

  const handleRecordingComplete = (transcript: string) => {
    setAnswer(transcript)
    setIsRecording(false)
  }

  const handleNextQuestion = () => {
    if (!currentQuestion) return

    const timeSpent = currentQuestion.timeLimit - timeRemaining
    submitAnswer(currentQuestion.id, answer, timeSpent)

    if (isLastQuestion) {
      completeInterview()
      navigate("/interview/result")
    } else {
      setCurrentQuestionIndex((prev) => prev + 1)
      setAnswer("")
      const nextQuestion = currentInterview.questions[currentQuestionIndex + 1]
      setTimeRemaining(nextQuestion.timeLimit)
    }
  }

  const handleEndInterview = () => {
    if (window.confirm("Are you sure you want to end the interview? Your progress will be saved.")) {
      completeInterview()
      navigate("/interview/result")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Live Interview</h1>
            <p className="text-gray-600">
              {currentInterview.topic} • {currentInterview.difficulty} level
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleEndInterview}
            className="flex items-center space-x-2 text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
          >
            <X className="h-4 w-4" />
            <span>End Interview</span>
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>
              {currentQuestionIndex + 1} of {currentInterview.questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / currentInterview.questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Display */}
        <QuestionDisplay
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={currentInterview.questions.length}
          timeRemaining={timeRemaining}
        />

        {/* Audio Recorder */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Record Your Answer</h3>
          <AudioRecorder onRecordingComplete={handleRecordingComplete} disabled={timeRemaining === 0} />
        </div>

        {/* Answer Preview */}
        {answer && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Your Answer</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed">{answer}</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {timeRemaining > 0
              ? `Time remaining: ${Math.floor(timeRemaining / 60)}:${(timeRemaining % 60).toString().padStart(2, "0")}`
              : "Time is up!"}
          </div>

          <Button onClick={handleNextQuestion} disabled={!answer} className="flex items-center space-x-2">
            <span>{isLastQuestion ? "Complete Interview" : "Next Question"}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
