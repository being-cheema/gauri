import React, { useState, useEffect, useRef } from 'react';
import AudioPlayer from '../components/AudioPlayer';
import Message from '../components/Message';
import ParticleBackground from '../components/ParticleBackground';

const messages = [
  // Messages organized in phases for easier maintenance
  // Phase 1: Introduction
  { text: "I have no idea what you look like...", id: 1 },
  { text: "Your voice is a mystery to me...", id: 2 },
  { text: "I cannnot say I know you at all...", id: 3 },
  { text: "The way you express yourself, the things I've heard about you...", id: 4 },
  { text: "They all paint a picture of someone truly special...", id: 5 },
  { text: "Meh it's prolly something stupid in my brain...", id: 6 },
  { text: "but the heart wants what the heart wants...", id: 7 },
  { text: "Because true connection transcends physical presence...", id: 8 },
  { text: "you said the site was cute, so I made this for you...", id: 9 },
  { text: "I hope you like it...", id: 10 },
  { text: "I hope you like me...", id: 11 },
  { text: "Obv i was hoping ;-;...", id: 12 },
  { text: "getting to know you better would be something i would be really grateful for...", id: 13 },
  { text: "gn for now :) <3 oh but wait...", id: 14 },
  { text: "I have one last question...", id: 15 },
  { text: "Would you like to go on a date with me?", id: 16 },
  { text: "This stupid distance is annoying but thank god we have", id: 17 },
  { text: "THE INTERNET!", id: 18 },
  { text: "I'm sorry if this is too forward...", id: 19 },
  { text: "fnf-dxne-hua whenever u say", id: 20 },
  { text: "Even if it's a no, I'm glad I got to know you a little better...", id: 21 },
  { text: "now it's a good night for real :)", id: 22 },
];

const Index = () => {
  const [started, setStarted] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (started && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  }, [started]);

  useEffect(() => {
    if (completed && audioRef.current) {
      audioRef.current.pause();
    }
  }, [completed]);

  useEffect(() => {
    if (started && !completed && !isPaused) {
      const interval = setInterval(() => {
        setShowMessage(false);
        
        setTimeout(() => {
          if (currentMessageIndex === messages.length - 1) {
            setCompleted(true);
            clearInterval(interval);
          } else {
            setCurrentMessageIndex(prevIndex => prevIndex + 1);
          }
          setShowMessage(true);
        }, 900);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [started, currentMessageIndex, completed, isPaused]);

  const handleNext = () => {
    if (currentMessageIndex < messages.length - 1) {
      setShowMessage(false);
      setTimeout(() => {
        setCurrentMessageIndex(prevIndex => prevIndex + 1);
        setShowMessage(true);
      }, 900);
    }
  };
  
  const handlePrevious = () => {
    if (currentMessageIndex > 0) {
      setShowMessage(false);
      setTimeout(() => {
        setCurrentMessageIndex(prevIndex => prevIndex - 1);
        setShowMessage(true);
      }, 900);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden" role="main" aria-live="polite">
      <ParticleBackground />
      <audio 
        ref={audioRef}
        src="/audio/your-audio-file.mp3" 
        loop={false} 
        className="hidden"
      />
      
      <div className="relative z-10 px-4 py-8 max-w-3xl w-full mx-auto">
        {!started ? (
          <button
            onClick={() => setStarted(true)}
            className="px-8 py-4 bg-white/20 backdrop-blur-sm rounded-lg shadow-lg 
                     text-xl font-serif text-purple-300 hover:bg-white/30 
                     transition-all duration-300 animate-fade-up"
            aria-label="Start presentation"
          >
            Click to begin
          </button>
        ) : (
          <>
            <AudioPlayer />
            <div className="flex justify-center items-center min-h-[200px] md:min-h-[300px]">
              {showMessage && (
                <Message 
                  key={currentMessageIndex}
                  text={messages[currentMessageIndex].text} 
                  delay={0}
                  show={showMessage}
                />
              )}
            </div>
            <div className="flex justify-between mt-4">
              <button 
                onClick={handlePrevious} 
                className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg shadow-lg 
                           text-lg font-serif text-purple-300 hover:bg-white/30 
                           transition-all duration-300"
              >
                Previous
              </button>
              <button 
                onClick={handleNext} 
                className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg shadow-lg 
                           text-lg font-serif text-purple-300 hover:bg-white/30 
                           transition-all duration-300"
              >
                Next
              </button>
            </div>
            <div className="mt-8">
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <div 
                  className="bg-purple-400 h-1.5 rounded-full transition-all duration-500" 
                  style={{ width: `${(currentMessageIndex / (messages.length - 1)) * 100}%` }}
                ></div>
              </div>
              <div className="text-xs text-purple-300 mt-1 text-center">
                {currentMessageIndex + 1} of {messages.length}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
