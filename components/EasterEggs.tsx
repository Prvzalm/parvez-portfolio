"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

type Egg = "chess" | "piano" | "secret" | null;

const notes = [261.63, 293.66, 329.63, 349.23, 392, 440, 493.88];

export default function EasterEggs() {
  const [egg, setEgg] = useState<Egg>(null);
  const [knight, setKnight] = useState(0);
  const [logoClicks, setLogoClicks] = useState(0);
  const audioContext = useRef<AudioContext | null>(null);

  useEffect(() => {
    const handleLogoClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".wordmark")) return;
      setLogoClicks((count) => {
        const next = count + 1;
        if (next === 5) setEgg("secret");
        return next >= 5 ? 0 : next;
      });
    };
    document.addEventListener("click", handleLogoClick);
    return () => document.removeEventListener("click", handleLogoClick);
  }, []);

  const playNote = (frequency: number) => {
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    audioContext.current ??= new AudioContextClass();
    const oscillator = audioContext.current.createOscillator();
    const gain = audioContext.current.createGain();
    oscillator.frequency.value = frequency;
    oscillator.type = "sine";
    gain.gain.setValueAtTime(0.0001, audioContext.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.18, audioContext.current.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.current.currentTime + 0.45);
    oscillator.connect(gain).connect(audioContext.current.destination);
    oscillator.start();
    oscillator.stop(audioContext.current.currentTime + 0.46);
  };

  return (
    <>
      <div className="egg-hint" aria-hidden="true">Psst — the interests are interactive.</div>
      <div className="interest-actions" aria-label="Interactive interests">
        <button type="button" onClick={() => setEgg("chess")}>♟ Chess</button>
        <button type="button" onClick={() => setEgg("piano")}>♫ Piano</button>
      </div>
      {egg ? <div className="egg-overlay" role="dialog" aria-modal="true" aria-label={`${egg} easter egg`}>
        <div className={`egg-card egg-${egg}`}>
          <button type="button" className="egg-close" aria-label="Close easter egg" onClick={() => setEgg(null)}><X size={18} /></button>
          {egg === "chess" ? <>
            <span className="egg-kicker">A SMALL CHESS BREAK</span>
            <h3>Find the knight.</h3>
            <p>Every good system needs a move you did not expect.</p>
            <div className="chess-board" aria-label="Chessboard puzzle">
              {Array.from({ length: 64 }, (_, index) => <button type="button" key={index} className={index === knight ? "knight-square" : ""} onClick={() => setKnight(index)} aria-label={`Chess square ${index + 1}`}>{index === knight ? "♞" : ""}</button>)}
            </div>
            <small>{knight === 42 ? "Nice move. You found the quiet square." : "Try a few squares."}</small>
          </> : egg === "piano" ? <>
            <span className="egg-kicker">A TINY PIANO</span>
            <h3>Play something.</h3>
            <p>One note is enough to start a song.</p>
            <div className="piano-keys">{notes.map((note, index) => <button type="button" key={note} onClick={() => playNote(note)} aria-label={`Piano note ${index + 1}`}><span>{String.fromCharCode(65 + index)}</span></button>)}</div>
            <small>Headphones optional. Curiosity required.</small>
          </> : <>
            <span className="egg-kicker">YOU FOUND IT</span>
            <h3>Five taps on PA.</h3>
            <p>There is always another layer hiding underneath the interface.</p>
            <button type="button" className="egg-action" onClick={() => setEgg(null)}>Back to exploring</button>
          </>}
        </div>
      </div> : null}
    </>
  );
}
