import type React from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { CheckCircle, Mic, BarChart3, Users } from "lucide-react"

export const Landing: React.FC = () => {
  const features = [
    {
      icon: <Mic className="h-6 w-6" />,
      title: "Voice-Powered Interviews",
      description: "Practice with realistic voice-based interview questions",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "AI-Powered Feedback",
      description: "Get detailed analysis and improvement suggestions",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Multiple Topics",
      description: "Practice JavaScript, React, Python, and more",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Track Progress",
      description: "Monitor your improvement over time",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Master Your
            <span className="text-blue-600"> Technical Interviews</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Practice coding interviews with AI-powered feedback. Get personalized insights and improve your performance
            with realistic mock interviews.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Start Practicing Free
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose AI Interview?</h2>
          <p className="text-lg text-gray-600">Everything you need to ace your next technical interview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Land Your Dream Job?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of developers who have improved their interview skills with AI Interview.
          </p>
          <Link to="/signup">
            <Button variant="secondary" size="lg">
              Get Started Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
