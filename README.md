# AI Interview Web App

A modern React-based web application for practicing technical interviews with AI-powered feedback. Built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **Authentication System**: Mock login/signup with persistent sessions
- **Interview Practice**: Multiple topics (JavaScript, React, Python) with difficulty levels
- **Voice Recording**: Simulated audio recording with mock transcription
- **Real-time Feedback**: AI-powered scoring and detailed feedback
- **Progress Tracking**: Dashboard with interview history and performance metrics
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Protected Routes**: Secure navigation with authentication guards

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: React Context API
- **Icons**: Lucide React
- **Development**: ESLint, TypeScript strict mode

## Project Structure

\`\`\`
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── layout/             # Layout components (Navbar, Footer)
│   ├── interview/          # Interview-specific components
│   ├── ProtectedRoute.tsx  # Route protection
│   └── LoadingSpinner.tsx  # Loading component
├── contexts/
│   ├── AuthContext.tsx     # Authentication state
│   └── InterviewContext.tsx # Interview state
├── data/
│   └── mockData.ts         # Mock data (users, questions, interviews)
├── pages/                  # Page components
├── types/                  # TypeScript type definitions
└── App.tsx                 # Main app component
\`\`\`

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd ai-interview-app
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open your browser and navigate to \`http://localhost:3000\`

### Demo Credentials

Use these credentials to test the application:
- **Email**: john@example.com
- **Password**: password123

## Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build
- \`npm run lint\` - Run ESLint

## Project Setup

The project is configured with:
- **Vite** for fast development and building
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **ESLint** for code linting
- **React Router** for navigation
- **Context API** for state management

## Features Overview

### Authentication
- Mock login/signup system
- Persistent sessions using localStorage
- Protected routes with automatic redirects

### Interview System
- **Setup**: Choose topic and difficulty level
- **Live Interview**: 5 questions with time limits
- **Voice Recording**: Simulated audio recording with mock transcription
- **Results**: Detailed scoring and feedback

### Dashboard
- Performance statistics
- Interview history
- Quick access to start new interviews

### Responsive Design
- Mobile-first approach
- Tailwind CSS for consistent styling
- Accessible UI components

## Mock Data

The application uses mock data for:
- **Users**: Pre-defined user accounts
- **Questions**: Technical questions across different topics and difficulties
- **Interviews**: Sample interview history

## State Management

### AuthContext
- User authentication state
- Login/logout functionality
- Session persistence

### InterviewContext
- Current interview state
- Interview history
- Answer submission and scoring

## Components

### UI Components
- **Button**: Customizable button with variants and loading states
- **Input**: Form input with label and error handling
- **Card**: Container component with header, content, and footer
- **Table**: Data table with responsive design

### Interview Components
- **QuestionDisplay**: Shows current question with timer
- **AudioRecorder**: Simulates voice recording functionality
- **ResultCard**: Displays interview results and feedback

## Deployment

1. Build the application:
\`\`\`bash
npm run build
\`\`\`

2. Deploy the \`dist\` folder to your hosting platform

## Future Enhancements

- Real speech-to-text integration
- AI-powered question generation
- Video recording capabilities
- Advanced analytics and insights
- Social features and leaderboards
- Integration with real backend APIs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
