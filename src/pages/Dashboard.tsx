"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useInterview } from "../contexts/InterviewContext"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardHeader } from "../components/ui/Card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/Table"
import { Play, Calendar, Target, TrendingUp } from "lucide-react"

export const Dashboard: React.FC = () => {
  const { user } = useAuth()
  const { pastInterviews } = useInterview()

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100"
    if (score >= 80) return "text-blue-600 bg-blue-100"
    if (score >= 70) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  const averageScore =
    pastInterviews.length > 0
      ? Math.round(pastInterviews.reduce((sum, interview) => sum + interview.score, 0) / pastInterviews.length)
      : 0

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600 mt-2">Ready to practice your next interview? Let's get started.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Interviews</p>
                  <p className="text-2xl font-bold text-gray-900">{pastInterviews.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900">{averageScore}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      pastInterviews.filter((interview) => {
                        const interviewDate = new Date(interview.createdAt)
                        const now = new Date()
                        return (
                          interviewDate.getMonth() === now.getMonth() &&
                          interviewDate.getFullYear() === now.getFullYear()
                        )
                      }).length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Start Interview Section */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Start New Interview</h2>
            <p className="text-gray-600">Choose a topic and difficulty level to begin practicing</p>
          </CardHeader>
          <CardContent>
            <Link to="/interview/setup">
              <Button size="lg" className="flex items-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Start Interview</span>
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Past Interviews */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Recent Interviews</h2>
            <p className="text-gray-600">Review your past performance and track your progress</p>
          </CardHeader>
          <CardContent>
            {pastInterviews.length === 0 ? (
              <div className="text-center py-8">
                <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No interviews completed yet</p>
                <Link to="/interview/setup">
                  <Button>Take Your First Interview</Button>
                </Link>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Topic</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Questions</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pastInterviews.slice(0, 5).map((interview) => (
                    <TableRow key={interview.id}>
                      <TableCell>{formatDate(interview.createdAt)}</TableCell>
                      <TableCell className="font-medium">{interview.topic}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            interview.difficulty === "easy"
                              ? "bg-green-100 text-green-800"
                              : interview.difficulty === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {interview.difficulty}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-sm font-medium ${getScoreColor(interview.score)}`}
                        >
                          {interview.score}%
                        </span>
                      </TableCell>
                      <TableCell>{interview.questions.length}</TableCell>
                      <TableCell>
                        <Link to={`/interview/result`} state={{ interview }}>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
