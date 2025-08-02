"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useInterview } from "../contexts/InterviewContext"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardHeader } from "../components/ui/Card"
import { Play, ArrowLeft } from "lucide-react"

export const InterviewSetup: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState<"easy" | "medium" | "hard">("medium")

  const { startInterview, loading } = useInterview()
  const navigate = useNavigate()

  const topics = [
    { id: "JavaScript", name: "JavaScript", description: "Core JavaScript concepts, ES6+, async/await" },
    { id: "React", name: "React", description: "Components, hooks, state management, lifecycle" },
    { id: "Python", name: "Python", description: "Data structures, OOP, decorators, comprehensions" },
  ]

  const difficulties = [
    { id: "easy", name: "Easy", description: "Basic concepts and fundamentals" },
    { id: "medium", name: "Medium", description: "Intermediate topics and problem-solving" },
    { id: "hard", name: "Hard", description: "Advanced concepts and complex scenarios" },
  ]

  const handleStartInterview = () => {
    if (!selectedTopic) return

    startInterview(selectedTopic, selectedDifficulty)
    navigate("/interview/live")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Interview Setup</h1>
          <p className="text-gray-600 mt-2">Choose your interview topic and difficulty level to get started.</p>
        </div>

        <div className="space-y-8">
          {/* Topic Selection */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Select Topic</h2>
              <p className="text-gray-600">Choose the subject you'd like to practice</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-colors ${
                      selectedTopic === topic.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">{topic.name}</h3>
                    <p className="text-sm text-gray-600">{topic.description}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Difficulty Selection */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Select Difficulty</h2>
              <p className="text-gray-600">Choose the appropriate challenge level</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty.id}
                    onClick={() => setSelectedDifficulty(difficulty.id as "easy" | "medium" | "hard")}
                    className={`p-4 rounded-lg border-2 text-left transition-colors ${
                      selectedDifficulty === difficulty.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <h3
                      className={`font-semibold mb-2 ${
                        difficulty.id === "easy"
                          ? "text-green-700"
                          : difficulty.id === "medium"
                            ? "text-yellow-700"
                            : "text-red-700"
                      }`}
                    >
                      {difficulty.name}
                    </h3>
                    <p className="text-sm text-gray-600">{difficulty.description}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Interview Details */}
          {selectedTopic && (
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Interview Details</h2>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Topic:</span>
                      <p className="text-gray-900">{selectedTopic}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Difficulty:</span>
                      <p className="text-gray-900 capitalize">{selectedDifficulty}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Questions:</span>
                      <p className="text-gray-900">5 questions</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-gray-600 mb-6">
                  <p>• You'll be presented with 5 technical questions</p>
                  <p>• Each question has a time limit for your response</p>
                  <p>• Use the voice recorder to provide your answers</p>
                  <p>• You'll receive detailed feedback at the end</p>
                </div>

                <Button
                  onClick={handleStartInterview}
                  disabled={!selectedTopic || loading}
                  loading={loading}
                  size="lg"
                  className="flex items-center space-x-2"
                >
                  <Play className="h-5 w-5" />
                  <span>Start Interview</span>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
