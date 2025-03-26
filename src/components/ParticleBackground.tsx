import React, { useEffect, useRef } from 'react';

const RomanticHeartsBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Heart shape colors - romantic purple palette
    const colors = [
      'rgba(147, 112, 219, 0.8)',  // Medium purple
      'rgba(186, 85, 211, 0.7)',   // Medium orchid
      'rgba(218, 112, 214, 0.8)',  // Orchid
      'rgba(221, 160, 221, 0.7)',  // Plum
      'rgba(238, 130, 238, 0.8)',  // Violet
    ];

    const hearts: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      rotationSpeed: number;
      rotation: number;
      color: string;
      pulseSpeed: number;
      pulseDirection: number;
      pulseSize: number;
      opacity: number;
    }> = [];

    // Create more hearts for better visibility
    for (let i = 0; i < 50; i++) {
      hearts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 20 + 10, // Even bigger hearts for visibility
        speedX: Math.random() * 0.5 - 0.25,
        speedY: -Math.random() * 0.4 - 0.1, // Mostly upward movement
        rotationSpeed: (Math.random() * 0.02 - 0.01),
        rotation: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: 0.02 + Math.random() * 0.02,
        pulseDirection: 1,
        pulseSize: 0,
        opacity: 0.5 + Math.random() * 0.5 // Increased base opacity
      });
    }

    // Improved heart shape drawing function
    function drawHeart(x: number, y: number, size: number, rotation: number, color: string) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(size, size);
      
      ctx.fillStyle = color;
      ctx.beginPath();
      
      // More defined heart shape
      ctx.moveTo(0, 0.3);
      ctx.bezierCurveTo(-0.5, -0.3, -1, 0, 0, 1);
      ctx.bezierCurveTo(1, 0, 0.5, -0.3, 0, 0.3);
      
      ctx.fill();
      
      ctx.restore();
    }

    function animate() {
      // Clear the canvas completely each frame instead of creating a trail
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Re-draw the gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#1a0033');
      gradient.addColorStop(1, '#000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      hearts.forEach(heart => {
        // Update pulse effect
        heart.pulseSize += heart.pulseSpeed * heart.pulseDirection;
        if (heart.pulseSize > 0.2 || heart.pulseSize < -0.1) {
          heart.pulseDirection *= -1;
        }
        
        // Draw heart with current size and pulse effect
        const pulseModifier = 1 + heart.pulseSize;
        drawHeart(
          heart.x, 
          heart.y, 
          heart.size * pulseModifier, 
          heart.rotation,
          heart.color.replace(')', `, ${heart.opacity})`)
        );

        // Update position
        heart.x += heart.speedX;
        heart.y += heart.speedY;
        heart.rotation += heart.rotationSpeed;

        // Reset position when off-screen
        if (heart.y < -50) {
          heart.y = canvas.height + 20;
          heart.x = Math.random() * canvas.width;
          heart.size = Math.random() * 20 + 10;
        }
        
        // Wrap around horizontally
        if (heart.x > canvas.width + 50) heart.x = -30;
        if (heart.x < -50) heart.x = canvas.width + 30;
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

export default RomanticHeartsBackground;
