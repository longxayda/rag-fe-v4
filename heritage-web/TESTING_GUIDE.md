# How to Test the New Quiz Features

## Quick Start
1. Navigate to the Quiz page in your app
2. Start answering questions
3. Complete the quiz to see the results screen

## Testing Checklist

### ✅ Confetti Animation (≥70% score)
**To trigger confetti:**
1. Answer at least 7 out of 10 questions correctly (70%+)
2. Complete the quiz
3. Watch for confetti burst from both sides of the screen
4. Confetti should last 3 seconds with red and gold colors

**Expected behavior:**
- Dual confetti streams from left and right
- Continuous particle emission for 3 seconds
- Heritage colors (red and gold)
- Starts 500ms after results screen appears

### ✅ Score Counter Animation
**What to look for:**
1. Score should count up from 0 to your final score
2. Animation takes about 1.5 seconds
3. Numbers increment smoothly (not jumping)

### ✅ Circular Progress Indicator
**Expected elements:**
1. Gray background circle
2. Colored progress circle that draws clockwise
3. Trophy icon in center that spins in
4. Percentage text below the circle
5. Gold color for ≥70%, red for <70%

### ✅ Question Transitions
**Test by:**
1. Answer a question
2. Click "Next Question"
3. Watch question slide out left
4. New question slides in from right
5. Options cascade in one by one

**Look for:**
- Smooth slide animation (300ms)
- Scale effect (slightly smaller during transition)
- Options appear with stagger effect
- No jarring jumps or flashes

### ✅ Interactive Elements
**Hover effects (desktop):**
1. Hover over answer options - should scale up slightly
2. Hover over Next button - should scale up
3. Hover over Share button - should change

**Tap effects (mobile/all):**
1. Tap/click any button - should scale down briefly
2. Visual feedback on all interactions

### ✅ Social Sharing
**Test each platform:**

**Twitter:**
1. Click Share button
2. Select Twitter
3. Should open Twitter with pre-filled tweet
4. Tweet includes: score, percentage, emoji, URL

**Facebook:**
1. Click Share button
2. Select Facebook
3. Should open Facebook share dialog
4. Includes URL and quote text

**Copy Link:**
1. Click Share button
2. Select Copy Link
3. Paste somewhere to verify
4. Should include: text + URL

### ✅ Progress Indicators
**During quiz:**
1. Progress bar fills from left to right
2. Current question number badge rotates in
3. Score badge pulses when score increases
4. Progress dots update (green = completed, gold = current)

**On results:**
1. All completed questions show green dots
2. Wrong answers show gray dots
3. Dots appear with cascade animation

## Expected Score Thresholds

| Score | Percentage | Confetti? | Circle Color | Grade |
|-------|-----------|-----------|--------------|-------|
| 10/10 | 100% | ✅ Yes | Gold | Excellent |
| 9/10 | 90% | ✅ Yes | Gold | Excellent |
| 8/10 | 80% | ✅ Yes | Gold | Good |
| 7/10 | 70% | ✅ Yes | Gold | Fair |
| 6/10 | 60% | ❌ No | Red | Fair |
| 5/10 | 50% | ❌ No | Red | Average |
| <5/10 | <50% | ❌ No | Red | Need Improvement |

## Troubleshooting

### Confetti not appearing?
- Make sure you scored ≥70% (7+ out of 10)
- Check browser console for errors
- Verify canvas-confetti is installed
- Try refreshing the page

### Animations stuttering?
- Close other browser tabs
- Check if browser hardware acceleration is enabled
- Try disabling browser extensions
- Test in different browser

### Share buttons not working?
- Check if popups are blocked
- Verify clipboard permissions for Copy Link
- Test internet connection
- Check browser console for errors

### Score not animating?
- Verify framer-motion is installed
- Check React version compatibility
- Look for console errors

## Browser Support

### Fully Supported
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Partial Support
- IE 11: No animations (graceful degradation)
- Older browsers: Basic functionality works

## Performance Notes

**Expected performance:**
- Smooth 60fps animations on modern devices
- No layout shifts or reflows
- Minimal memory usage
- Clean animation cleanup

**If performance is poor:**
- Check device specifications
- Close background apps
- Try on different device
- Disable animations in browser settings

## Tips for Best Experience

1. **Desktop:** Use mouse hover to see all hover effects
2. **Mobile:** Tap interactions work great
3. **Scoring:** Aim for 70%+ to see confetti
4. **Sharing:** Try all three share options
5. **Dark Mode:** Toggle dark mode to see color adaptations

## Known Behaviors

- Confetti z-index is 0 (doesn't cover UI)
- Score animation always starts from 0
- Share menu closes when selecting an option
- Progress bar animates on page load
- Question transitions have slight overlap

