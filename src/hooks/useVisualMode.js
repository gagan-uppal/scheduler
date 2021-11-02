
import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 


  
//   const transition = (newMode, replace = false) => {
//     setMode(newMode);
//     !replace
//       ? setHistory([...history, newMode])
//       : setHistory((prev) => [...prev.slice(0, prev.length - 1), newMode]);
//   };

//   const back = () => {
//     setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
//     if (mode !== history[0] && history.length > 1)
//       setMode(history[history.length - 2]);
//   };
//   return { mode, transition, back };
// }

const transition = (newMode, replaceCurrentMode = false) => {
  setMode(newMode);
  setHistory(prev => {
    const prevState = [...prev]
    replaceCurrentMode && prevState.pop()
    return [...prevState, newMode]
  })
};
const back = () => {
  if(history.length > 1)
  {const newHistory = [...history];
    newHistory.pop();
    setMode(newHistory[newHistory.length - 1]);
    setHistory(newHistory);
};}
return { mode, transition, back };
}