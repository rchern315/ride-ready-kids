"use client";

import { useMemo, useState } from "react";

const ageBands = [
  {
    id: "little",
    age: "7–10",
    label: "Ride with a grown-up",
    title: "Practice the basics together.",
    text: "Choose a quiet place to learn. Practice starting, stopping, looking both ways, and following signals with a trusted adult nearby.",
    icon: "✦",
    color: "mint",
  },
  {
    id: "middle",
    age: "11–13",
    label: "Build your street skills",
    title: "Plan the ride before you go.",
    text: "Talk through the route with an adult. Practice signaling, spotting driveways, and choosing a safer path before riding near traffic.",
    icon: "↗",
    color: "yellow",
  },
  {
    id: "teen",
    age: "14–17",
    label: "Ride aware and predictable",
    title: "Make good choices in real traffic.",
    text: "Stay visible, leave room to react, and check the rules for your exact ride and location. E-scooter and e-bike rules can differ.",
    icon: "✳",
    color: "lavender",
  },
];

const states = [
  "Choose a state", "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "District of Columbia"
];

const lessons = [
  { n: "01", title: "Helmet check", copy: "A properly fitted helmet should sit level and snug. Buckle the chin strap before every ride.", icon: "⛑" },
  { n: "02", title: "Stop at signals", copy: "Red means stop. Wait for your turn and follow the signal before entering the crossing.", icon: "●" },
  { n: "03", title: "Be seen", copy: "Bright clothing and working lights help others see you, especially when it is dim.", icon: "✦" },
  { n: "04", title: "Stay focused", copy: "Put phones and headphones away. Keep your eyes and ears on what is happening around you.", icon: "◉" },
  { n: "05", title: "Ride predictably", copy: "Look ahead, leave space, and use a clear hand signal before turning when you can do so safely.", icon: "↗" },
  { n: "06", title: "Check your ride", copy: "Before leaving, check the tires, brakes, handlebars, and lights on your bike or scooter.", icon: "✓" },
];

const practiceSteps = [
  { light: "red", label: "RED LIGHT", title: "Slow down and stop.", copy: "Brake smoothly and stop before the crosswalk or stop line. Keep both hands ready to control your ride.", cue: "STOP" },
  { light: "red", label: "YOU ARE STOPPED", title: "Look and listen.", copy: "Check left, right, and left again. Look for turning cars, people walking, and anything that may cross your path.", cue: "LOOK BOTH WAYS" },
  { light: "green", label: "GREEN LIGHT", title: "Green means check first.", copy: "Wait for your signal. Before moving, make sure the crossing is clear and drivers have stopped.", cue: "WAIT • CHECK" },
  { light: "green", label: "PATH IS CLEAR", title: "Cross carefully.", copy: "Ride straight across at a steady speed. Keep looking for people and vehicles until you reach the other side.", cue: "GO WHEN SAFE" },
];

export default function Home() {
  const [activeAge, setActiveAge] = useState("little");
  const [selectedState, setSelectedState] = useState("");
  const [step, setStep] = useState(-1);
  const activeBand = useMemo(() => ageBands.find((band) => band.id === activeAge) ?? ageBands[0], [activeAge]);
  const currentStep = step >= 0 ? practiceSteps[step] : null;

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Ride Ready home">
          <span className="brand-mark">R<span>↗</span></span>
          <span>ride<span className="brand-light">ready</span></span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#learn">Learn</a><a href="#practice">Practice</a><a href="#videos">Watch</a>
        </nav>
        <a className="nav-cta" href="#state-rules">State rules <span>↘</span></a>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> FOR EVERY KIND OF RIDE</div>
          <h1>Good rides<br />start <span>with good<br className="mobile-break" /> choices.</span></h1>
          <p className="hero-intro">Road skills for kids and teens riding bikes, scooters, and e-scooters. Learn the basics. Practice the tricky parts. Ride ready.</p>
          <div className="hero-actions"><a className="button button-dark" href="#learn">Let&apos;s learn <span>↗</span></a><a className="text-link" href="#practice">Try a practice scenario <span>↓</span></a></div>
          <div className="hero-meta"><span>AGES 7–17</span><i /> <span>BIKES + SCOOTERS</span><i /> <span>LEARN AT YOUR PACE</span></div>
        </div>
        <div className="hero-art" aria-label="Illustration of a young rider wearing a helmet near a traffic signal" role="img">
          <div className="sun-disc" />
          <div className="hero-sticker sticker-one">LOOK<br />BOTH WAYS <span>↔</span></div>
          <div className="hero-sticker sticker-two">HELMET?<br /><b>CHECK ✓</b></div>
          <div className="hero-road"><div className="road-line" /></div>
          <div className="hero-light"><span className="light-red"/><span/><span/></div>
          <div className="rider">
            <div className="rider-head"><div className="helmet"/><div className="face"><i/></div></div>
            <div className="rider-body"><div className="shirt"/><div className="arm arm-left"/><div className="arm arm-right"/><div className="leg leg-left"/><div className="leg leg-right"/></div>
            <div className="bike"><div className="wheel wheel-left"/><div className="wheel wheel-right"/><div className="bike-frame"/><div className="bike-seat"/><div className="bike-handle"/></div>
          </div>
          <div className="hero-caption"><span className="caption-check">✓</span><span><b>Safe looks good on you.</b><small>Start with one smart choice.</small></span></div>
          <div className="art-scribble">ride<br />bright!</div>
        </div>
      </section>

      <section className="quick-strip" aria-label="Three important reminders">
        <div><span className="strip-num">01</span><strong>Protect your head.</strong><span>Wear a fitted helmet.</span></div>
        <div><span className="strip-num">02</span><strong>Follow the signals.</strong><span>Red means stop.</span></div>
        <div><span className="strip-num">03</span><strong>Stay switched on.</strong><span>Eyes up. Ears open.</span></div>
      </section>

      <section className="section learn-section" id="learn">
        <div className="section-heading">
          <div><div className="eyebrow eyebrow-dark">YOUR RIDE, YOUR NEXT STEP</div><h2>Big skills.<br /><span>Small steps.</span></h2></div>
          <p>Pick an age range to get lessons that fit. Everyone learns at their own pace, so choose what feels right for you.</p>
        </div>
        <div className="age-tabs" role="tablist" aria-label="Choose an age group">
          {ageBands.map((band) => <button key={band.id} className={`age-tab ${activeAge === band.id ? "active" : ""}`} role="tab" aria-selected={activeAge === band.id} onClick={() => setActiveAge(band.id)}><span>{band.age}</span><small>{band.label}</small></button>)}
        </div>
        <div className={`age-feature ${activeBand.color}`}>
          <div className="age-feature-icon">{activeBand.icon}</div>
          <div className="age-feature-main"><div className="eyebrow">A GOOD NEXT STEP FOR AGES {activeBand.age}</div><h3>{activeBand.title}</h3><p>{activeBand.text}</p></div>
          <a href="#rules" className="circle-link" aria-label="Go to riding rules">↘</a>
        </div>
        <div className="lesson-grid" id="rules">
          {lessons.map((lesson) => <article className="lesson-card" key={lesson.n}><span className="lesson-icon">{lesson.icon}</span><span className="lesson-number">RULE {lesson.n}</span><h3>{lesson.title}</h3><p>{lesson.copy}</p><a href="#practice" aria-label={`Practice: ${lesson.title}`}>Practice this <span>↗</span></a></article>)}
        </div>
        <p className="content-note">These are general safety lessons. The law can differ by state, city, device, and where you ride.</p>
      </section>

      <section className="practice-section" id="practice">
        <div className="practice-intro"><div className="eyebrow eyebrow-dark">SCENARIO 01 · INTERSECTION</div><h2>Red light.<br /><span>What now?</span></h2><p>Let&apos;s practice one of the most important moves: what to do when you reach a red light.</p><div className="practice-tools"><span className="tool-pill">🚲 &nbsp;Bike</span><span className="tool-pill">🛴 &nbsp;Scooter</span><span className="tool-pill">⚡ &nbsp;E-scooter</span></div></div>
        <div className="practice-board">
          <div className="board-top"><span><i className="live-dot"/> PRACTICE MODE</span><span>TAKE YOUR TIME</span></div>
          <div className={`crossing-scene ${currentStep ? "is-active" : ""}`} data-step={step}>
            <div className="scene-sky"/><div className="scene-building building-a"/><div className="scene-building building-b"/><div className="scene-sidewalk sidewalk-top"/><div className="scene-road"><div className="scene-dashes"/><div className="zebra">{Array.from({length:6},(_,i)=><i key={i}/>)}</div><div className="scene-rider">🚲</div></div><div className="scene-sidewalk sidewalk-bottom"/><div className="mini-signal"><i className={currentStep?.light !== "green" ? "on red" : ""}/><i className={currentStep?.light === "green" ? "on green" : ""}/></div><div className="scene-label">{currentStep?.cue ?? "YOU ARE HERE"}</div>
          </div>
          <div className="board-content" aria-live="polite">
            <div className="step-count">{currentStep ? `STEP ${step + 1} OF 4 · ${currentStep.label}` : "READY WHEN YOU ARE"}</div>
            <h3>{currentStep?.title ?? "You spot a red light ahead."}</h3>
            <p>{currentStep?.copy ?? "You’re riding toward an intersection. The signal turns red. What should you do? Walk through it one step at a time."}</p>
            <button className="button button-green" onClick={() => setStep(step < 0 ? 0 : (step + 1) % practiceSteps.length)}>{step < 0 ? "Start practice" : step === practiceSteps.length - 1 ? "Practice again" : "Next step"} <span>→</span></button>
          </div>
        </div>
      </section>

      <section className="video-section" id="videos">
        <div className="video-heading"><div><div className="eyebrow eyebrow-dark">SEE IT. LEARN IT. TRY IT.</div><h2>Watch how<br /><span>it&apos;s done.</span></h2></div><p>Short videos can make a new skill easier to picture. Watch with a grown-up, then practice somewhere safe.</p></div>
        <div className="video-grid">
          <article className="video-card video-main"><div className="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/dkoVxBnnGko" title="Bicycle Safer Journey, elementary school version by the Federal Highway Administration" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/><span className="video-tag">FHWA · ELEMENTARY</span></div><div className="video-caption"><span>01 / BICYCLE SAFER JOURNEY</span><h3>Learn the road, one choice at a time.</h3><p>Elementary-school bicycle safety video from the Federal Highway Administration.</p></div></article>
          <article className="video-card video-resource"><div className="resource-illustration"><div className="resource-sun"/><div className="resource-road"><span>······</span></div><div className="resource-bike">🚲</div><span className="play-button">▶</span></div><div className="video-caption"><span>02 / MORE WAYS TO LEARN</span><h3>Choose a video for your age.</h3><p>FHWA&apos;s Bicycle Safer Journey has three age-specific videos, plus a quiz or discussion guide for each.</p><a href="https://www.pedbikeinfo.org/bicyclesaferjourney/" target="_blank" rel="noreferrer">Watch all three FHWA videos <span>↗</span></a></div></article>
        </div>
        <p className="video-footnote">Video provided by the U.S. Federal Highway Administration. External videos and resources open on their original sites.</p>
      </section>

      <section className="state-section" id="state-rules">
        <div className="state-copy"><div className="eyebrow">SAME SMART HABITS. DIFFERENT LOCAL RULES.</div><h2>Where do<br />you <span>ride?</span></h2><p>Rules about sidewalks, streets, helmets, and electric rides can change depending on where you live. We&apos;re building a state-by-state guide checked against official sources.</p><label className="select-label" htmlFor="state-select">CHOOSE YOUR STATE</label><select id="state-select" value={selectedState} onChange={(event) => setSelectedState(event.target.value)}>{states.map((state) => <option key={state} value={state === "Choose a state" ? "" : state}>{state}</option>)}</select>{selectedState && <div className="state-status" role="status"><span>✦</span><p><b>{selectedState} rules are on our roadmap.</b><br />For now, ask a grown-up to check your local and state rules before you ride.</p></div>}</div>
        <div className="state-map" aria-hidden="true"><div className="map-grid"/><div className="map-orbit orbit-one"/><div className="map-orbit orbit-two"/><div className="map-pin pin-one">✦</div><div className="map-pin pin-two">✦</div><div className="map-pin pin-three">✦</div><div className="map-note">50 states<br /><b>one safer ride at a time</b></div><div className="map-route route-one"/><div className="map-route route-two"/></div>
      </section>

      <section className="grownups"><div className="grownup-icon">✳</div><div><div className="eyebrow eyebrow-dark">A NOTE FOR GROWN-UPS</div><h2>Make room for practice.</h2><p>Kids build judgment over time. Start in a calm, low-traffic place, model the behavior you want to see, and practice together before adding more complex routes.</p></div><a href="https://www.nhtsa.gov/bicycle-safety/learn-bike-safely" target="_blank" rel="noreferrer" className="grownup-link">Parent &amp; caregiver tips <span>↗</span></a></section>

      <footer className="footer"><a className="brand brand-footer" href="#home"><span className="brand-mark">R<span>↗</span></span><span>ride<span className="brand-light">ready</span></span></a><p>Learn the rules. Practice the moves. Ride with care.</p><div className="footer-right"><span>SAFETY IS A TEAM SPORT.</span><a href="#home">BACK TO TOP ↑</a></div><div className="footer-disclaimer">Educational content only. It does not replace adult supervision or official state and local laws. Always check current rules for your location and the specific device you ride.</div></footer>
    </main>
  );
}
