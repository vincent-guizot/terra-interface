import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const TiaContext = createContext(null);

export function TiaProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [mood, setMood] = useState('idle'); // 'idle' | 'thinking' | 'happy' | 'alert'
  const [pendingPrompt, setPendingPrompt] = useState('');
  const [peekMessage, setPeekMessage] = useState(
    "👋 Halo Vincent! Sistem ekosistem 300 m² berjalan 94.2% otonom."
  );
  const [showPeek, setShowPeek] = useState(true);

  // Auto-hide initial peek after 12 seconds so it's not distracting
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPeek(false);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  const openTia = useCallback((initialPrompt = '') => {
    setIsOpen(true);
    setIsMinimized(false);
    setShowPeek(false);
    if (initialPrompt) {
      setPendingPrompt(initialPrompt);
    }
  }, []);

  const closeTia = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(false);
  }, []);

  const toggleTia = useCallback(() => {
    setIsOpen(prev => !prev);
    setIsMinimized(false);
    setShowPeek(false);
  }, []);

  const minimizeTia = useCallback(() => {
    setIsMinimized(true);
  }, []);

  const maximizeTia = useCallback(() => {
    setIsMinimized(false);
    setIsOpen(true);
  }, []);

  const triggerPeek = useCallback((message, autoHideMs = 8000) => {
    setPeekMessage(message);
    setShowPeek(true);
    if (autoHideMs > 0) {
      setTimeout(() => setShowPeek(false), autoHideMs);
    }
  }, []);

  const dismissPeek = useCallback(() => {
    setShowPeek(false);
  }, []);

  const clearPendingPrompt = useCallback(() => {
    setPendingPrompt('');
  }, []);

  const value = {
    isOpen,
    isMinimized,
    mood,
    setMood,
    pendingPrompt,
    clearPendingPrompt,
    peekMessage,
    showPeek,
    openTia,
    closeTia,
    toggleTia,
    minimizeTia,
    maximizeTia,
    triggerPeek,
    dismissPeek,
  };

  return <TiaContext.Provider value={value}>{children}</TiaContext.Provider>;
}

export function useTia() {
  const ctx = useContext(TiaContext);
  if (!ctx) {
    throw new Error('useTia must be used within a TiaProvider');
  }
  return ctx;
}

export default TiaContext;
