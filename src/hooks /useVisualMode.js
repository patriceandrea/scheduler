import { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);


  function transition(mode, replace = false) {
    if (replace) {
      setMode(mode)
      setHistory(prev => [...prev.slice(0, history.length - 1), mode]);
    } else {
      setMode(mode);
      setHistory(prev => [...prev, mode]);
    }
  }

  function back() {
    if (history.length === 1) {
      setMode(initial);
    } else {
      setMode(() => history[history.length - 2]);
      setHistory(history => history.slice(0, history.length - 1))

    }
  }
  return {
    mode,
    transition,
    back
  };
}



