import React, { useState, useEffect } from "react";
import Gate from "./logic_gates.jsx";
import RandomLevel from "./random_level.jsx";
import "./index.css";
import faviconUrl from "./assets/gate_not.svg";
import githubMark from "./assets/github-mark.svg";

export default function App() {
  const [route, setRoute] = useState("home");
  const [dark, setDark] = useState(true);
  const [easterFlipped, setEasterFlipped] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    document.title = "True Game";
    let link = document.querySelector("link[rel='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = faviconUrl;
  }, []);

  const ThemeToggle = (
    <button
      className="theme-toggle"
      onClick={() => setDark(d => !d)}
      aria-label="Toggle theme"
      title={dark ? "Light mode" : "Dark mode"}
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );

  if (route === "gate") {
    return (
      <div style={{ padding: 20 }}>
        {ThemeToggle}
        <div style={{ marginBottom: 12 }}>
          <button className="btn-back" onClick={() => setRoute("home")}>← Back</button>
        </div>
        <div className="card">
          <Gate type="AND" label="Gate test" />
        </div>
      </div>
    );
  }

  if (route === "random") {
    return (
      <div>
        {ThemeToggle}
        <RandomLevel onBack={() => setRoute("home")} />
      </div>
    );
  }

  const githubFilter = dark ? "invert(1) brightness(2) contrast(1.2)" : "none";

  return (
    <div className="app-root">
      {ThemeToggle}
      <div className="home-screen">
        <h1 className="home-title" style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            onClick={() => setEasterFlipped(f => !f)}
            aria-label="toggle-true-false"
            style={{
              background: "transparent",
              border: "none",
              padding: 0,
              cursor: "pointer",
              color: easterFlipped ? "var(--accent-red)" : "var(--accent-green)",
              fontWeight: 800,
              fontSize: "1em"
            }}
          >
            {easterFlipped ? "False" : "True"}
          </button>
          <span style={{ fontWeight: 700 }}>Game</span>
        </h1>

        <div className="small-muted" style={{ marginTop: 6, display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span style={{fontWeight: 400 }}>Made by</span>
          <img src={githubMark} alt="GitHub" style={{ height: "1em", width: "auto", display: "inline-block", filter: githubFilter }} />
          <a href="https://github.com/phiphiii" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none", fontWeight: 700 }}>
            Filip Pietrzak
          </a>
          <span style={{fontWeight: 400 }}>198275</span>
        </div>

        <div className="mt-28" style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
          <button className="btn btn-primary" onClick={() => setRoute("random")}>Random level</button>
          <button className="btn btn-plain" onClick={() => setRoute("gate")}>Gate test</button>
        </div>
      </div>
    </div>
  );
}