"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Check, Palette, RotateCcw, Send } from "lucide-react";
import { guestbookRepository } from "../lib/guestbookRepository";
import { Reveal } from "./motion/Primitives";

const MAX_SIGNATURE_LENGTH = 40;

export default function Guestbook() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const hasDrawn = useRef(false);
  const [signature, setSignature] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [traces, setTraces] = useState<Awaited<ReturnType<typeof guestbookRepository.getTraces>>>([]);
  const [traceCount, setTraceCount] = useState(0);
  const [loadingTraces, setLoadingTraces] = useState(true);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const previous = canvas.width > 0 && canvas.height > 0 ? canvas.toDataURL() : null;
    const ratio = Math.max(1, Math.min(window.devicePixelRatio || 1, 3));
    canvas.width = Math.max(1, Math.floor(rect.width * ratio));
    canvas.height = Math.max(1, Math.floor(rect.height * ratio));
    const context = canvas.getContext("2d");
    if (!context) return;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "#171717";
    context.lineWidth = 2.5;
    if (previous) {
      const image = new Image();
      image.onload = () => context.drawImage(image, 0, 0, rect.width, rect.height);
      image.src = previous;
    }
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    void guestbookRepository.getTraces().then((loadedTraces) => {
      setTraces(loadedTraces);
      setTraceCount(loadedTraces.length);
      setLoadingTraces(false);
    }).catch(() => setLoadingTraces(false));
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  const pointFor = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const startDrawing = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const point = pointFor(event);
    const context = canvasRef.current?.getContext("2d");
    if (!point || !context) return;
    drawing.current = true;
    hasDrawn.current = true;
    canvasRef.current?.setPointerCapture(event.pointerId);
    context.beginPath();
    context.moveTo(point.x, point.y);
  };

  const draw = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const point = pointFor(event);
    const context = canvasRef.current?.getContext("2d");
    if (point && context) {
      context.lineTo(point.x, point.y);
      context.stroke();
    }
  };

  const stopDrawing = () => { drawing.current = false; };

  const clearDrawing = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    hasDrawn.current = false;
    setError("");
    setSubmitted(false);
  };

  const submitTrace = async (event: FormEvent) => {
    event.preventDefault();
    const cleanSignature = signature.trim().slice(0, MAX_SIGNATURE_LENGTH);
    if (!hasDrawn.current) {
      setError("Add a small drawing before leaving your trace.");
      return;
    }
    if (!cleanSignature) {
      setError("Add a name, alias or tiny thought.");
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    setError("");
    const trace = await guestbookRepository.addTrace({
      name: cleanSignature,
      drawing: canvas.toDataURL("image/webp", 0.75),
      anonymous: true
    });
    setTraces((current) => [trace, ...current].slice(0, 60));
    setTraceCount((count) => count + 1);
    setSubmitted(true);
  };

  return (
    <section className="trace section-shell" id="trace">
      <Reveal className="trace-copy">
        <p className="section-label"><span>✳</span>YOU WERE HERE</p>
        <h2>Leave<br /><em>a trace.</em></h2>
        <p>Draw a tiny something. Sign your name. Become part of the site.</p>
        <span className="trace-hint"><Palette size={16} /> no pressure, just vibes</span>
      </Reveal>
      <Reveal className="trace-board">
        <div className="board-top"><span>THE WALL OF VISITORS</span><span>✳ {String(traceCount + 1).padStart(3, "0")}</span></div>
        <canvas
          ref={canvasRef}
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerCancel={stopDrawing}
          onPointerLeave={stopDrawing}
          aria-label="Optional drawing canvas. Draw a mark before submitting."
          role="img"
        />
        <div className="trace-actions">
          <button type="button" className="clear-button" onClick={clearDrawing}><RotateCcw size={14} /> Clear</button>
          <span className="trace-note">Optional — the rest of the site works without it.</span>
        </div>
        <form onSubmit={submitTrace}>
          <label className="sr-only" htmlFor="trace-signature">Your name, alias or a tiny thought</label>
          <input id="trace-signature" value={signature} onChange={(event) => setSignature(event.target.value.slice(0, MAX_SIGNATURE_LENGTH))} placeholder="Your name, alias or a tiny thought..." maxLength={MAX_SIGNATURE_LENGTH} />
          <button type="submit" disabled={submitted}>{submitted ? <><Check size={17} /> Added to the wall</> : <><Send size={16} /> Leave it here</>}</button>
        </form>
        {error ? <p className="form-error" role="alert">{error}</p> : null}
        <div className="trace-wall" aria-live="polite">
          <div className="trace-wall-heading"><span>RECENT MARKS</span><span>{loadingTraces ? "LOADING..." : `${traces.length} TRACES`}</span></div>
          {!loadingTraces && traces.length === 0 ? <p className="trace-empty">No marks yet. Yours could be the first.</p> : null}
          <div className="trace-grid">
            {traces.map((trace) => (
              <figure className="trace-card" key={trace.id}>
                <img src={trace.drawing} alt={`Drawing left by ${trace.name}`} loading="lazy" />
                <figcaption><span>{trace.name}</span><small>{new Date(trace.createdAt).toLocaleDateString("en-GB")}</small></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
