"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "../ui/Button"
import { Mic, Square } from "lucide-react"

interface AudioRecorderProps {
  onRecordingComplete: (transcript: string) => void
  disabled?: boolean
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({ onRecordingComplete, disabled = false }) => {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRecording])

  const startRecording = () => {
    setIsRecording(true)
    setRecordingTime(0)
  }

  const stopRecording = () => {
    setIsRecording(false)
    setRecordingTime(0)

    // Simulate transcription with mock response
    const mockTranscripts = [
      "This is a mock transcription of the recorded audio. In a real application, this would be the actual speech-to-text conversion.",
      "Here's another example of what the transcribed audio might look like after processing.",
      "The audio recorder component simulates real recording functionality with this mock transcript.",
    ]

    const randomTranscript = mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)]
    onRecordingComplete(randomTranscript)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-4">
        {!isRecording ? (
          <Button onClick={startRecording} disabled={disabled} className="flex items-center space-x-2" size="lg">
            <Mic className="h-5 w-5" />
            <span>Start Recording</span>
          </Button>
        ) : (
          <Button onClick={stopRecording} variant="secondary" className="flex items-center space-x-2" size="lg">
            <Square className="h-5 w-5" />
            <span>Stop Recording</span>
          </Button>
        )}
      </div>

      {isRecording && (
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Recording...</span>
          </div>
          <span className="text-sm font-mono text-gray-700">{formatTime(recordingTime)}</span>
        </div>
      )}

      <p className="text-xs text-gray-500 text-center max-w-md">
        Click "Start Recording" to begin your answer. The recording will be automatically transcribed.
      </p>
    </div>
  )
}
