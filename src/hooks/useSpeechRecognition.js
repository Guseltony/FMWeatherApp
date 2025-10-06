// useSpeechRecognition.js
import { useEffect, useRef, useState } from "react";

export default function useSpeechRecognition({
  lang = "en-US",
  continuous = false,
  interimResults = false,
  autoRestart = false,
} = {}) {
  const recognitionRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]); // keep all results
  const [error, setError] = useState(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech Recognition API not supported in this browser.");
      console.error("❌ Speech Recognition API not supported.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = continuous;
    recognition.lang = lang;
    recognition.interimResults = interimResults;

    recognition.onstart = () => {
      console.log("🎤 Recognition started...");
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[event.resultIndex][0].transcript.trim();
      console.log("✅ Speech result:", transcript);
      setResult(transcript);
      setHistory((prev) => [...prev, transcript]);

      recognition.stop();
    };

    recognition.onerror = (event) => {
      console.error("⚠️ Recognition error:", event.error);
      setError(event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      console.log("🛑 Recognition stopped.");
      setIsRecording(false);

      if (autoRestart) {
        console.log("🔄 Auto-restarting recognition...");
        recognition.start();
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };
  }, [lang, continuous, interimResults, autoRestart]);

  const startRecording = () => {
    if (recognitionRef.current && !isRecording) {
      setResult("");
      setError(null);
      recognitionRef.current.start();
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
    }
  };

  return { result, history, error, isRecording, startRecording, stopRecording };
}
