import React, { useEffect, useRef } from 'react';

interface AudioPlayerProps {
  onReady?: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ onReady }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.4;
      
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (onReady) onReady();
          })
          .catch(error => {
            console.error("Audio playback failed:", error);
            // Most browsers require user interaction before playing audio
            console.log("Try adding a user interaction requirement before playing audio");
          });
      }
    }
  }, [onReady]);

  return (
    <audio
      ref={audioRef}
      loop
      src="/background-music.mp3" // Update this path to your local audio file location
      className="hidden"
    />
  );
};

export default AudioPlayer;
