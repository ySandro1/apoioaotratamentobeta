import React, { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Aguarda o fade out completar
    }, 2500); // Mostra por 2.5 segundos

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 bg-black flex flex-col items-center justify-center z-50 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="text-center space-y-4 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          RD Saúde
        </h1>
        <p className="text-xl md:text-2xl text-gray-300">
          apoios
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;