"use client";

import { useState } from "react";

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
  { n: "01", id: "helmet", title: "Helmet check", copy: "A properly fitted helmet should sit level and snug. Buckle the chin strap before every ride.", icon: "⛑" },
  { n: "02", id: "signals", title: "Stop at signals", copy: "Red means stop. Wait for your turn and follow the signal before entering the crossing.", icon: "●" },
  { n: "03", id: "seen", title: "Be seen", copy: "Bright clothing and working lights help others see you, especially when it is dim.", icon: "✦" },
  { n: "04", id: "focus", title: "Stay focused", copy: "Put phones and headphones away. Keep your eyes and ears on what is happening around you.", icon: "◉" },
  { n: "05", id: "predictable", title: "Ride predictably", copy: "Look ahead, leave space, and use a clear hand signal before turning when you can do so safely.", icon: "↗" },
  { n: "06", id: "check", title: "Check your ride", copy: "Before leaving, check the tires, brakes, handlebars, and lights on your bike or scooter.", icon: "✓" },
];

type RideMission = {
  prompt: string;
  choices: string[];
  correct: number;
  feedback: string;
  hint: string;
};

const missions: Record<string, Record<string, RideMission>> = {
  helmet: {
    little: {
      prompt: "Your helmet slips back and wobbles when you shake your head. What should you do?",
      choices: ["Keep riding slowly", "Stop and ask a grown-up to help fit it", "Hold it with one hand"],
      correct: 1,
      feedback: "A snug, level helmet is part of getting ready to ride.",
      hint: "Your helmet should stay level and snug without you holding it.",
    },
    middle: {
      prompt: "You put on your helmet, but it tilts back and the straps feel loose. What is the best next move?",
      choices: ["Adjust the fit and buckle it before riding", "Pull the brim down while moving", "Skip it for a short trip"],
      correct: 0,
      feedback: "Check the fit and buckle before every ride.",
      hint: "Fix the fit while you are stopped, before the ride begins.",
    },
    teen: {
      prompt: "A borrowed helmet shifts around even after you buckle it. What should you do?",
      choices: ["Wear a cap under it to fill the gap", "Choose a helmet that fits and adjust it correctly", "Ride carefully and check it later"],
      correct: 1,
      feedback: "A helmet needs to fit securely to do its job.",
      hint: "A loose helmet is a sign to stop and find one that fits.",
    },
  },
  signals: {
    little: {
      prompt: "You reach an intersection and the light is red. What do you do?",
      choices: ["Stop before the crossing and wait with your grown-up", "Look quickly and go", "Follow whoever is in front"],
      correct: 0,
      feedback: "Stop at the red signal and wait for the safe turn to go.",
      hint: "At a red light, stop before entering the crossing.",
    },
    middle: {
      prompt: "The signal turns green, but a car is still turning across your path. What should you do?",
      choices: ["Go because your light is green", "Wait until the car is clear, then check again", "Weave around the car"],
      correct: 1,
      feedback: "A green signal is your turn to move, after checking that the way is clear.",
      hint: "Pause for the turning car and scan the crossing before moving.",
    },
    teen: {
      prompt: "Your signal changes to green. What should you check before moving into the intersection?",
      choices: ["Only the signal", "For people crossing and vehicles still clearing or turning", "Whether another rider has started"],
      correct: 1,
      feedback: "Check the whole intersection before you go.",
      hint: "Signals guide your turn; a quick scan helps catch people or vehicles still in the intersection.",
    },
  },
  seen: {
    little: {
      prompt: "It is getting dim outside. Which choice helps people notice you?",
      choices: ["Wear dark clothes and stay close to parked cars", "Wear something bright and turn on your lights", "Ride faster to get home sooner"],
      correct: 1,
      feedback: "Bright colors and lights help you stand out.",
      hint: "Think about what would make you easier for others to see.",
    },
    middle: {
      prompt: "You are riding home near sunset. What is a good visibility check?",
      choices: ["Make sure your lights work and choose bright gear", "Assume drivers can see you", "Use your phone screen as a light"],
      correct: 0,
      feedback: "Working lights and bright gear help others spot you sooner.",
      hint: "Check your actual ride lights before you leave.",
    },
    teen: {
      prompt: "Your group ride will continue after sunset. What should everyone do before setting off?",
      choices: ["Use working front and rear lights and wear visible gear", "Stay in a tight cluster with no lights", "Use phone flashlights only when a car appears"],
      correct: 0,
      feedback: "Plan to be visible for the whole ride, not just at the last second.",
      hint: "Check your ride lights and clothing before it gets dark.",
    },
  },
  focus: {
    little: {
      prompt: "Your phone makes a sound while you are riding. What is the safest choice?",
      choices: ["Look down while rolling", "Stop somewhere safe, then ask a grown-up for help", "Take one hand off and reach for it"],
      correct: 1,
      feedback: "Eyes up while moving; check the phone only after stopping safely.",
      hint: "First get fully stopped somewhere safe.",
    },
    middle: {
      prompt: "A friend offers you one earbud for music on the ride. What should you do?",
      choices: ["Keep both ears free so you can hear what is around you", "Use it just for quiet streets", "Turn it up so your friends can hear too"],
      correct: 0,
      feedback: "Keeping your ears open helps you notice what is happening around you.",
      hint: "You need to hear people and traffic while riding.",
    },
    teen: {
      prompt: "You need to check a route update while riding. What should you do?",
      choices: ["Read it while coasting", "Stop in a safe place before checking your phone", "Ask a friend to ride close and read it aloud"],
      correct: 1,
      feedback: "Handle the route update when you are safely stopped.",
      hint: "Keep your attention on riding; stop before looking at the screen.",
    },
  },
  predictable: {
    little: {
      prompt: "You see a driveway ahead. What helps people around you understand where you are going?",
      choices: ["Ride in a steady line and look before changing direction", "Swerve around to the other side", "Close your eyes and call out"],
      correct: 0,
      feedback: "A steady line makes your movements easier to understand.",
      hint: "Try to move smoothly and look before changing direction.",
    },
    middle: {
      prompt: "A parked car is ahead and you may need to move around it. What should you do first?",
      choices: ["Swerve without looking", "Check behind you, signal when safe, and move only when clear", "Ride right up beside the car"],
      correct: 1,
      feedback: "Look, communicate, and move only when you have room.",
      hint: "Before moving sideways, check behind and make sure it is clear.",
    },
    teen: {
      prompt: "You are approaching a turn with other road users nearby. What is the predictable way to handle it?",
      choices: ["Signal when safe, check around you, and turn smoothly", "Turn suddenly so nobody follows you", "Look only at the route on your phone"],
      correct: 0,
      feedback: "Clear signals and smooth movements help others anticipate your turn.",
      hint: "Let people know what you plan to do, then move when it is safe.",
    },
  },
  check: {
    little: {
      prompt: "Before your ride, one tire looks very soft. What should you do?",
      choices: ["Ask a grown-up to check it before you ride", "Ride until it feels normal", "Kick it and go"],
      correct: 0,
      feedback: "Spotting a problem before you go is a great riding habit.",
      hint: "If something looks wrong, pause and get help before riding.",
    },
    middle: {
      prompt: "You squeeze the brakes and one feels loose. What is the right next step?",
      choices: ["Ride slowly and hope it works", "Tell a grown-up and get the brakes checked before riding", "Use your shoes to stop"],
      correct: 1,
      feedback: "Brakes need to work before the ride starts.",
      hint: "A brake problem needs attention while you are still stopped.",
    },
    teen: {
      prompt: "You are leaving for a longer ride. Which quick check makes sense?",
      choices: ["Check tires, brakes, handlebars, and lights", "Check only your phone battery", "Skip the check if you rode yesterday"],
      correct: 0,
      feedback: "A quick check can catch problems before you are far from home.",
      hint: "Check the parts that help you steer, stop, and be seen.",
    },
  },
};

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
  const activeBand = ageBands.find((band) => band.id === activeAge) ?? ageBands[0];
  const currentStep = step >= 0 ? practiceSteps[step] : null;
  const [activeActivity, setActiveActivity] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const activity = activeActivity ? missions[activeActivity]?.[activeAge] ?? null : null;
  const activeLesson = activeActivity ? lessons.find((lesson) => lesson.id === activeActivity) ?? null : null;
  const completedCount = completedActivities.filter((item) => item.startsWith(`${activeAge}:`)).length;

  function startActivity(lessonId: string) {
    setActiveActivity(lessonId);
    setSelectedAnswer(null);
  }

  function chooseAnswer(choiceIndex: number) {
    if (!activity || !activeActivity) return;
    setSelectedAnswer(choiceIndex);
    if (choiceIndex === activity.correct) {
      const progressKey = `${activeAge}:${activeActivity}`;
      setCompletedActivities((current) => current.includes(progressKey) ? current : [...current, progressKey]);
    }
  }

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
          {ageBands.map((band) => <button key={band.id} className={`age-tab ${activeAge === band.id ? "active" : ""}`} role="tab" aria-selected={activeAge === band.id} onClick={() => { setActiveAge(band.id); setActiveActivity(null); setSelectedAnswer(null); }}><span>{band.age}</span><small>{band.label}</small></button>)}
        </div>
        <div className={`age-feature ${activeBand.color}`}>
          <div className="age-feature-icon">{activeBand.icon}</div>
          <div className="age-feature-main"><div className="eyebrow">A GOOD NEXT STEP FOR AGES {activeBand.age}</div><h3>{activeBand.title}</h3><p>{activeBand.text}</p></div>
          <a href="#rules" className="circle-link" aria-label="Go to riding rules">↘</a>
        </div>
        <div className="mission-toolbar">
          <div><div className="eyebrow eyebrow-dark">PICK A RULE TO PRACTICE</div><h3>Choose your first mission.</h3></div>
          <div className="mission-progress" aria-label={`${completedCount} of 6 missions completed`}>
            <span><b>{completedCount}</b> / 6 missions</span>
            <div className="progress-track"><span style={{ width: `${(completedCount / lessons.length) * 100}%` }} /></div>
          </div>
        </div>
        <div className="lesson-grid" id="rules">
          {lessons.map((lesson) => {
            const isComplete = completedActivities.includes(`${activeAge}:${lesson.id}`);
            const isActive = activeActivity === lesson.id;
            return (
              <article className={`lesson-card mission-card ${isActive ? "is-active" : ""} ${isComplete ? "is-complete" : ""}`} key={lesson.id}>
                <span className="lesson-icon">{lesson.icon}</span>
                <span className="lesson-number">RULE {lesson.n}</span>
                <span className="mission-flag">{isComplete ? "MISSION CLEARED ✓" : "QUICK MISSION"}</span>
                <h3>{lesson.title}</h3>
                <p>{lesson.copy}</p>
                <button type="button" className="activity-trigger" onClick={() => startActivity(lesson.id)} aria-expanded={isActive} aria-controls={isActive ? "activity-panel" : undefined}>
                  {isActive ? "Challenge open" : "Start challenge"} <span>↗</span>
                </button>
              </article>
            );
          })}
        </div>
        {activeLesson && activity && (
          <section className="activity-panel" id="activity-panel" aria-label={`${activeLesson.title} activity`}>
            <div className="activity-topline"><span><i /> MINI MISSION · RULE {activeLesson.n}</span><button type="button" onClick={() => { setActiveActivity(null); setSelectedAnswer(null); }} aria-label="Close challenge">CLOSE ×</button></div>
            <div className="activity-layout">
              <div className="activity-question">
                <span className="activity-age">AGES {activeBand.age} · YOUR TURN</span>
                <h3>{activeLesson.title}<span> mission</span></h3>
                <p>{activity.prompt}</p>
              </div>
              <div className="activity-answers" role="group" aria-label="Choose the safest answer">
                {activity.choices.map((choice, index) => {
                  const isCorrect = selectedAnswer !== null && index === activity.correct;
                  const isWrongPick = selectedAnswer === index && !isCorrect;
                  return (
                    <button type="button" key={choice} className={`answer-choice ${isCorrect ? "is-correct" : ""} ${isWrongPick ? "is-wrong" : ""}`} onClick={() => chooseAnswer(index)} disabled={selectedAnswer === activity.correct} aria-pressed={selectedAnswer === index}>
                      <span className="choice-letter">{String.fromCharCode(65 + index)}</span><span className="choice-copy">{choice}</span><span className="choice-mark">{isCorrect ? "✓" : "↗"}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className={`activity-feedback ${selectedAnswer === null ? "" : selectedAnswer === activity.correct ? "is-success" : "is-hint"}`} role="status" aria-live="polite">
              {selectedAnswer === null ? <><span>YOUR TURN</span><b>Pick the safest move.</b></> : selectedAnswer === activity.correct ? <><span>MISSION COMPLETE ✦</span><b>{activity.feedback}</b></> : <><span>GOOD TRY — TAKE ANOTHER LOOK</span><b>{activity.hint}</b></>}
            </div>
          </section>
        )}
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
