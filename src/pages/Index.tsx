
import React, { useState, useEffect } from 'react';
import AudioPlayer from '../components/AudioPlayer';
import Message from '../components/Message';
import ParticleBackground from '../components/ParticleBackground';

const messages = [
  "I have no idea what you look like...",
  "Your voice is a mystery to me...",
  "I cannnot say I know you at all...",
  "The way you express yourself, the things I've hears about you...",
  "They all paint a picture of someone truly special...",
  "Meh it's prolly something stupid in my brain...",
  "but the heart wants what the heart wants...",
  "Because true connection transcends physical presence...",
  "you said the site was cute, so I made this for you...",
  "I hope you like it...",
  "I hope you like me...",
  "Obv i was hoping ;-;...",
  "getting to know you better would be something i would be really grateful for...",
  "gn for now :) <3 oh but wait...",
  "I have one last question...",
  "Would you like to go on a date with me?",
  "This stupid distance is annoying but thank go we have",
  "THE INTERNET!",
  "I'm sorry if this is too forward...",
  "fnf-dxne-hua whenever u say",
  "Even if it's a no, I'm glad I got to know you a little better...",
  "now it's a good night for real :)",
];

const Index = () => {
  const [started, setStarted] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    if (started) {
      const interval = setInterval(() => {
        setShowMessage(false);
        
        setTimeout(() => {
          setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
          setShowMessage(true);
        }, 900); // Wait for fade out before showing next message
      }, 5000); // Show each message for 5 seconds
      
      return () => clearInterval(interval);
    }
  }, [started]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10 px-4 py-8 max-w-3xl mx-auto">
        {!started ? (
          <button
            onClick={() => setStarted(true)}
            className="px-8 py-4 bg-white/20 backdrop-blur-sm rounded-lg shadow-lg 
                     text-xl font-serif text-purple-300 hover:bg-white/30 
                     transition-all duration-300 animate-fade-up"
          >
            Click to begin
          </button>
        ) : (
          <>
            <AudioPlayer />
            <div className="flex justify-center items-center min-h-[300px]">
              {showMessage && (
                <Message 
                  key={currentMessageIndex}
                  text={messages[currentMessageIndex]} 
                  delay={0}
                  show={showMessage}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
