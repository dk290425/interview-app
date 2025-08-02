"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { InterviewContextType, Interview } from "../types"
import { mockQuestions, mockInterviews } from "../data/mockData"
import { useAuth } from "./AuthContext"

const InterviewContext = createContext<InterviewContextType | undefined>(undefined)

export const useInterview = () => {
  const context = useContext(InterviewContext)
  if (context === undefined) {
    throw new Error("useInterview must be used within an InterviewProvider")
  }
  return context
}

export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth()
  const [currentInterview, setCurrentInterview] = useState<Interview | null>(null)
  const [pastInterviews, setPastInterviews] = useState<Interview[]>(
    mockInterviews.filter((interview) => interview.userId === user?.id),
  )
  const [loading, setLoading] = useState(false)

  const startInterview = (topic: string, difficulty: "easy" | "medium" | "hard") => {
    if (!user) return

    setLoading(true)

    // Get 5 random questions for the topic and difficulty
    const topicQuestions = mockQuestions.filter((q) => q.topic === topic && q.difficulty === difficulty)
    const selectedQuestions = topicQuestions.slice(0, 5)

    const newInterview: Interview = {
      id: Date.now().toString(),
      userId: user.id,
      topic,
      difficulty,
      questions: selectedQuestions,
      answers: [],
      score: 0,
      feedback: "",
      status: "in-progress",
      createdAt: new Date().toISOString(),
    }

    setCurrentInterview(newInterview)
    setLoading(false)
  }

  const submitAnswer = (questionId: string, answer: string, timeSpent: number) => {
    if (!currentInterview) return

    // Simple scoring logic (in real app, this would be AI-powered)
    const question = currentInterview.questions.find((q) => q.id === questionId)
    const score = Math.floor(Math.random() * 4) + 7 // Random score between 7-10

    const newAnswer = {
      questionId,
      answer,
      timeSpent,
      score,
    }

    setCurrentInterview((prev) => {
      if (!prev) return null
      return {
        ...prev,
        answers: [...prev.answers, newAnswer],
      }
    })
  }

  const completeInterview = () => {
    if (!currentInterview) return

    const totalScore = currentInterview.answers.reduce((sum, answer) => sum + answer.score, 0)
    const averageScore = Math.round((totalScore / currentInterview.answers.length) * 10)

    const completedInterview: Interview = {
      ...currentInterview,
      score: averageScore,
      feedback: generateFeedback(averageScore),
      status: "completed",
      completedAt: new Date().toISOString(),
    }

    setPastInterviews((prev) => [completedInterview, ...prev])
    setCurrentInterview(completedInterview)
  }

  const generateFeedback = (score: number): string => {
    if (score >= 90) return "Excellent performance! You demonstrated strong knowledge and clear communication."
    if (score >= 80) return "Good job! You showed solid understanding with room for minor improvements."
    if (score >= 70) return "Decent performance. Focus on providing more detailed explanations and examples."
    if (score >= 60) return "Fair attempt. Consider reviewing fundamental concepts and practicing more."
    return "Needs improvement. Recommend studying the basics and practicing with simpler questions first."
  }

  const value: InterviewContextType = {
    currentInterview,
    pastInterviews,
    startInterview,
    submitAnswer,
    completeInterview,
    loading,
  }

  return <InterviewContext.Provider value={value}>{children}</InterviewContext.Provider>
}
