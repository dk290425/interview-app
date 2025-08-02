import type React from "react"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { InterviewProvider } from "./contexts/InterviewContext"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { Navbar } from "./components/layout/Navbar"
import { Footer } from "./components/layout/Footer"

// Pages
import { Landing } from "./pages/Landing"
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"
import { Dashboard } from "./pages/Dashboard"
import { InterviewSetup } from "./pages/InterviewSetup"
import { InterviewLive } from "./pages/InterviewLive"
import { InterviewResult } from "./pages/InterviewResult"

const AppContent: React.FC = () => {
  const location = useLocation()
  const hideNavAndFooter = ["/login", "/signup"].includes(location.pathname)

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavAndFooter && <Navbar />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/interview/setup"
            element={
              <ProtectedRoute>
                <InterviewSetup />
              </ProtectedRoute>
            }
          />

          <Route
            path="/interview/live"
            element={
              <ProtectedRoute>
                <InterviewLive />
              </ProtectedRoute>
            }
          />

          <Route
            path="/interview/result"
            element={
              <ProtectedRoute>
                <InterviewResult />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {!hideNavAndFooter && <Footer />}
    </div>
  )
}

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <InterviewProvider>
          <AppContent />
        </InterviewProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
