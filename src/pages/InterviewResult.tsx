"use client"

import type React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useInterview } from "../contexts/InterviewContext"
import { Button } from "../components/ui/Button"
import { ResultCard } from "../components/interview/ResultCard"
import { ArrowLeft, RotateCcw, Home } from "lucide-react"

export const InterviewResult: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { currentInterview } = useInterview()

  // Get interview from location state or current interview
  const interview = location.state?.interview || currentInterview

  if (!interview) {
    navigate("/dashboard")
    return null
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
          <h1 className="text-3xl font-bold text-gray-900">Interview Complete!</h1>
          <p className="text-gray-600 mt-2">
            Great job completing your {interview.topic} interview. Here's how you performed.
          </p>
        </div>

        {/* Results */}
        <div className="mb-8">
          <ResultCard interview={interview} />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/interview/setup">
            <Button className="flex items-center space-x-2 w-full sm:w-auto">
              <RotateCcw className="h-4 w-4" />
              <span>Take Another Interview</span>
            </Button>
          </Link>

          <Link to="/dashboard">
            <Button variant="outline" className="flex items-center space-x-2 w-full sm:w-auto bg-transparent">
              <Home className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
          </Link>
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tips for Improvement</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Before Your Next Interview:</h4>
              <ul className="space-y-1">
                <li>• Review fundamental concepts</li>
                <li>• Practice explaining solutions clearly</li>
                <li>• Work on time management</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">During the Interview:</h4>
              <ul className="space-y-1">
                <li>• Think out loud while solving</li>
                <li>• Ask clarifying questions</li>
                <li>• Provide concrete examples</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
