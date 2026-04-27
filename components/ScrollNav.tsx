'use client';

import { useState, useEffect } from 'react';

export default function ScrollNav() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: 40,
      right: 30,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      zIndex: 900,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      pointerEvents: isVisible ? 'auto' : 'none',
      transition: 'opacity 0.3s ease, transform 0.3s ease'
    }}>
      <button 
        onClick={scrollToTop}
        style={{
          width: 50, height: 50, borderRadius: '50%',
          background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.1)', color: '#fff',
          fontSize: '20px', cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(37, 99, 235, 0.9)'; e.currentTarget.style.transform = 'scale(1.1)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(15, 23, 42, 0.7)'; e.currentTarget.style.transform = 'scale(1)'; }}
        title="맨 위로"
      >
        ⬆️
      </button>
      <button 
        onClick={scrollToBottom}
        style={{
          width: 50, height: 50, borderRadius: '50%',
          background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.1)', color: '#fff',
          fontSize: '20px', cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(37, 99, 235, 0.9)'; e.currentTarget.style.transform = 'scale(1.1)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(15, 23, 42, 0.7)'; e.currentTarget.style.transform = 'scale(1)'; }}
        title="맨 아래로"
      >
        ⬇️
      </button>
    </div>
  );
}
