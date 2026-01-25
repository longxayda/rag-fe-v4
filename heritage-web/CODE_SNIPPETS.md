# Key Code Snippets - QuizPage Enhancements

## 1. Confetti Function

```javascript
// Confetti effect for good scores
const triggerConfetti = () => {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const randomInRange = (min, max) => Math.random() * (max - min) + min;

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // Create confetti from two different positions
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#991B1B', '#B91C1C', '#DC2626', '#EAB308', '#FBBF24', '#FCD34D']
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#991B1B', '#B91C1C', '#DC2626', '#EAB308', '#FBBF24', '#FCD34D']
    });
  }, 250);
};
```

**Purpose:** Creates celebration confetti for scores ≥70%
**Features:**
- Dual position bursts
- Heritage color palette
- 3-second duration
- Auto-cleanup

---

## 2. Score Animation Effect

```javascript
// Animate score counter when results are shown
useEffect(() => {
  if (showResult) {
    const percentage = (score / questions.length) * 100;
    
    // Trigger confetti for good scores (>=70%)
    if (percentage >= 70) {
      setTimeout(() => triggerConfetti(), 500);
    }

    // Animate score counter
    let currentScore = 0;
    const increment = score / 30; // 30 steps for smooth animation
    const timer = setInterval(() => {
      currentScore += increment;
      if (currentScore >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(currentScore));
      }
    }, 50);

    return () => clearInterval(timer);
  }
}, [showResult, score]);
```

**Purpose:** Animates score counter and triggers confetti
**Features:**
- Smooth counting animation
- Conditional confetti trigger
- Proper cleanup
- Dependencies tracked

---

## 3. Social Sharing Function

```javascript
// Share functionality
const shareResults = (platform) => {
  const percentage = Math.round((score / questions.length) * 100);
  const text = `I scored ${score}/${questions.length} (${percentage}%) on the Roman Heritage Quiz! 🏛️ Test your knowledge too!`;
  const url = window.location.href;

  switch (platform) {
    case 'twitter':
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
      break;
    case 'facebook':
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank');
      break;
    case 'copy':
      navigator.clipboard.writeText(`${text} ${url}`);
      setShowShareMenu(false);
      break;
  }
};
```

**Purpose:** Handles social media sharing
**Platforms:** Twitter, Facebook, Copy to Clipboard
**Features:**
- Auto-generated message
- URL encoding
- Emoji support

---

## 4. Circular Progress Indicator

```jsx
{/* SVG Circular Progress */}
<svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
  {/* Background circle */}
  <circle
    cx="60"
    cy="60"
    r="54"
    fill="none"
    stroke="currentColor"
    strokeWidth="8"
    className="text-gray-200 dark:text-gray-700"
  />
  {/* Progress circle */}
  <motion.circle
    cx="60"
    cy="60"
    r="54"
    fill="none"
    stroke="currentColor"
    strokeWidth="8"
    strokeLinecap="round"
    className={percentage >= 70 ? "text-heritage-gold-500" : "text-heritage-red-500"}
    initial={{ strokeDasharray: "339.292", strokeDashoffset: "339.292" }}
    animate={{ strokeDashoffset: `${339.292 - (339.292 * percentage) / 100}` }}
    transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
  />
</svg>
```

**Purpose:** Animated circular progress bar
**Math:** `2πr = 2 × π × 54 = 339.292` (circle circumference)
**Animation:** strokeDashoffset from 100% to calculated percentage

---

## 5. Question Transition Animation

```jsx
<AnimatePresence mode="wait">
  <motion.div
    key={currentQuestion}
    initial={{ opacity: 0, x: 100, scale: 0.95 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    exit={{ opacity: 0, x: -100, scale: 0.95 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className="relative bg-white dark:bg-gray-800 rounded-xl..."
  >
    {/* Question content */}
  </motion.div>
</AnimatePresence>
```

**Purpose:** Smooth question transitions
**Effect:**
- New questions slide from right
- Old questions slide to left
- Slight scale effect for depth

---

## 6. Interactive Answer Option

```jsx
<motion.button
  key={index}
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.3 + index * 0.1 }}
  whileHover={!answered ? { scale: 1.02, x: 5 } : {}}
  whileTap={!answered ? { scale: 0.98 } : {}}
  onClick={() => handleAnswer(index)}
  disabled={answered}
  className={buttonClass}
>
  {/* Option content */}
</motion.button>
```

**Purpose:** Interactive answer buttons with animations
**Features:**
- Staggered entrance (cascade effect)
- Hover scale and translate
- Tap feedback
- Conditional interactions

---

## 7. Share Menu Dropdown

```jsx
<AnimatePresence>
  {showShareMenu && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white..."
    >
      <button onClick={() => shareResults('twitter')}>
        <Twitter className="w-4 h-4" />
        Twitter
      </button>
      <button onClick={() => shareResults('facebook')}>
        <Facebook className="w-4 h-4" />
        Facebook
      </button>
      <button onClick={() => shareResults('copy')}>
        <Link2 className="w-4 h-4" />
        Copy Link
      </button>
    </motion.div>
  )}
</AnimatePresence>
```

**Purpose:** Animated dropdown for sharing options
**Animation:** Slides down/up with fade
**Features:** Absolute positioning, auto-closes on selection

---

## 8. Animated Score Display

```jsx
<motion.div 
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.5, type: "spring" }}
  className="relative inline-block mb-6"
>
  <div className="text-5xl font-bold text-heritage-red-700 dark:text-heritage-red-400">
    {animatedScore}
    <span className="text-2xl text-gray-400 dark:text-gray-500">/{questions.length}</span>
  </div>
</motion.div>
```

**Purpose:** Display animated score counter
**Animation:** Spring effect with scale
**Feature:** Uses animatedScore state (updated by useEffect)

---

## Configuration Values

```javascript
// Confetti Configuration
const confettiConfig = {
  duration: 3000,              // Total duration in ms
  startVelocity: 30,          // Initial particle speed
  spread: 360,                // Spread angle (full circle)
  ticks: 60,                  // Animation frames
  zIndex: 0,                  // Layer position
  particleCount: 50,          // Particles per burst
  originX: { min: 0.1, max: 0.9 },  // X position range
  originY: -0.2,              // Y position (above screen)
};

// Animation Timings
const timings = {
  questionTransition: 300,     // ms
  scoreAnimation: 1500,        // ms
  confettiDelay: 500,          // ms
  optionStagger: 100,          // ms per option
  circleProgress: 1500,        // ms
};

// Score Thresholds
const thresholds = {
  confetti: 70,               // Minimum % for confetti
  excellent: 100,             // Perfect score
  good: 80,                   // Good performance
  fair: 60,                   // Fair performance
  average: 40,                // Average performance
};
```

---

## Import Statement

```javascript
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Trophy, RotateCcw, ArrowRight, Sparkles, 
  CheckCircle, XCircle, Landmark, Award, Brain,
  Share2, Twitter, Facebook, Link2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { questions } from '../data/quiz';
```

---

## State Variables

```javascript
// Original states
const [currentQuestion, setCurrentQuestion] = useState(0);
const [selectedAnswer, setSelectedAnswer] = useState(null);
const [score, setScore] = useState(0);
const [showResult, setShowResult] = useState(false);
const [answered, setAnswered] = useState(false);
const [spinning, setSpinning] = useState(false);

// New states for animations
const [animatedScore, setAnimatedScore] = useState(0);
const [showShareMenu, setShowShareMenu] = useState(false);
```

---

## Quick Reference

| Feature | Library | Lines Added |
|---------|---------|-------------|
| Confetti | canvas-confetti | ~30 |
| Score Animation | useEffect | ~25 |
| Social Sharing | Native APIs | ~20 |
| Circular Progress | framer-motion + SVG | ~50 |
| Question Transitions | framer-motion | ~20 |
| Interactive Buttons | framer-motion | ~10 |
| Share Menu | framer-motion | ~30 |

**Total New Code:** ~277 lines
**Total File Size:** 617 lines

