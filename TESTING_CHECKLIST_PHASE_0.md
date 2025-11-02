# Phase 0 Testing Checklist

**Purpose:** Verify motion control system works correctly before marking Phase 0 complete.  
**Environment:** http://localhost:3000  
**Tester:** ___________  
**Date:** ___________  

---

## Pre-Testing Setup

- [ ] Dev server running: `npm run dev`
- [ ] Open browser to http://localhost:3000
- [ ] Open DevTools (F12)
- [ ] Open Elements tab (for inspecting HTML attributes)

---

## 1. Visual Verification

### Footer Section
- [ ] Scroll to footer
- [ ] Verify "Accessibility Preferences" heading visible
- [ ] Verify MotionToggle card is rendered
- [ ] Verify three options visible:
  - [ ] Auto (Sparkles icon)
  - [ ] Enable (Zap icon)
  - [ ] Reduce (ZapOff icon)
- [ ] Verify default selection is "Auto"
- [ ] Verify card has gradient background
- [ ] Verify text is readable

---

## 2. Interaction Testing

### Toggle Selection
- [ ] Click "Enable" option
  - [ ] Background color changes
  - [ ] Border appears around selection
  - [ ] Checkmark icon appears with animation
  - [ ] Other options dim slightly

- [ ] Click "Reduce" option
  - [ ] Selection moves to "Reduce"
  - [ ] Checkmark animates (scale + rotate)
  - [ ] Previous selection de-animates

- [ ] Click "Auto" option
  - [ ] Returns to Auto mode
  - [ ] Description text shows system preference state
  - [ ] Animation smooth

### Hover States
- [ ] Hover over each option
  - [ ] Cursor changes to pointer
  - [ ] Slight visual feedback (optional)
  - [ ] No layout shift

---

## 3. localStorage Persistence

### Save and Reload
- [ ] Select "Enable" option
- [ ] Note: localStorage key should be `motion-preference`
- [ ] Open DevTools → Application tab → Local Storage
- [ ] Verify `motion-preference` = `"enable"`
- [ ] Reload page (Ctrl+R or Cmd+R)
- [ ] Verify "Enable" is still selected after reload
- [ ] Repeat for "Reduce" option
- [ ] Repeat for "Auto" option

---

## 4. CSS Custom Property Integration

### DevTools Inspection - Enable Mode
- [ ] Select "Enable" in toggle
- [ ] Open DevTools → Elements tab
- [ ] Select `<html>` element
- [ ] Check Computed tab or Styles tab
- [ ] Verify `--motion-duration: 1s`
- [ ] Verify `data-reduced-motion="false"`

### DevTools Inspection - Reduce Mode
- [ ] Select "Reduce" in toggle
- [ ] Refresh Elements panel if needed
- [ ] Verify `--motion-duration: 0.01ms`
- [ ] Verify `data-reduced-motion="true"`

---

## 5. System Preference Detection

### Test with OS Setting (Optional)

**macOS:**
- [ ] Go to System Settings → Accessibility → Display
- [ ] Enable "Reduce motion"
- [ ] Return to browser (keep page loaded)
- [ ] Select "Auto" in toggle
- [ ] Verify description shows: "Respects system preference (currently: reduced)"
- [ ] Disable "Reduce motion" in OS
- [ ] Wait a few seconds (media query listener should detect change)
- [ ] Verify description updates to: "(currently: full motion)"

**Windows:**
- [ ] Go to Settings → Accessibility → Visual effects
- [ ] Turn off "Animation effects"
- [ ] Return to browser
- [ ] Select "Auto" mode
- [ ] Verify description shows reduced state
- [ ] Turn on "Animation effects"
- [ ] Verify description updates

**Linux:**
- [ ] Depends on desktop environment
- [ ] GNOME: Settings → Accessibility → Reduce Animation
- [ ] KDE: Settings → Workspace Behavior → Desktop Effects
- [ ] Verify Auto mode reflects system preference

**Simpler Test (All OS):**
- [ ] Open DevTools → Console
- [ ] Paste: `window.matchMedia('(prefers-reduced-motion: reduce)').matches`
- [ ] Note: true (OS prefers reduced) or false (OS prefers full)
- [ ] Select "Auto" mode
- [ ] Verify description matches console output

---

## 6. Existing Animation Behavior

### Header/Footer Animations
- [ ] Select "Enable" mode
- [ ] Reload page
- [ ] Scroll to trigger footer animations
- [ ] Verify smooth fade-in animations on footer content

- [ ] Select "Reduce" mode
- [ ] Reload page
- [ ] Scroll to footer
- [ ] Verify animations are instant (no fade-in delay)
- [ ] Content should appear immediately

### How It Works Page (if animations exist)
- [ ] Navigate to /how-it-works
- [ ] Select "Enable" mode
- [ ] Verify any scroll animations play normally

- [ ] Select "Reduce" mode
- [ ] Verify animations are disabled/instant

---

## 7. Dark Mode Testing

### Toggle Theme
- [ ] Find theme toggle in header/footer
- [ ] Switch to dark mode
- [ ] Scroll to MotionToggle in footer
- [ ] Verify:
  - [ ] Card background appropriate for dark mode
  - [ ] Text color readable
  - [ ] Border colors visible
  - [ ] Icons have sufficient contrast
  - [ ] Selected state visually clear

- [ ] Switch back to light mode
- [ ] Verify everything still looks correct

---

## 8. Keyboard Accessibility

### Keyboard Navigation
- [ ] Reload page
- [ ] Press Tab repeatedly to navigate through page
- [ ] Tab until MotionToggle options are focused
- [ ] Verify:
  - [ ] Focus indicator appears around option
  - [ ] Focus indicator has sufficient contrast
  - [ ] Can tab through all three options

### Keyboard Interaction
- [ ] Focus on "Enable" option
- [ ] Press Enter or Space
- [ ] Verify selection changes
- [ ] Repeat for other options

---

## 9. Responsive Testing

### Mobile View (320px)
- [ ] Open DevTools → Toggle device toolbar (Ctrl+Shift+M)
- [ ] Select "iPhone SE" or set width to 320px
- [ ] Scroll to footer
- [ ] Verify MotionToggle fits without horizontal scroll
- [ ] Verify text is readable
- [ ] Verify icons not cut off
- [ ] Verify options stack or wrap appropriately

### Tablet View (768px)
- [ ] Set width to 768px
- [ ] Verify layout looks good
- [ ] Verify spacing appropriate

### Desktop View (1440px+)
- [ ] Set width to 1440px or wider
- [ ] Verify card doesn't stretch too wide
- [ ] Verify max-width constraint applied (should be ~2xl)

---

## 10. Edge Cases

### Rapid Toggling
- [ ] Quickly click through options multiple times
- [ ] Verify no visual glitches
- [ ] Verify animations don't stack or conflict
- [ ] Verify checkmark animation completes properly

### localStorage Edge Cases
- [ ] Open DevTools → Application → Local Storage
- [ ] Manually delete `motion-preference` key
- [ ] Reload page
- [ ] Verify defaults to "Auto"
- [ ] Set invalid value: `localStorage.setItem('motion-preference', 'invalid')`
- [ ] Reload page
- [ ] Verify gracefully handles invalid value (defaults to "Auto")

### Multiple Tabs
- [ ] Open site in two browser tabs
- [ ] Change preference in Tab 1 to "Enable"
- [ ] Switch to Tab 2
- [ ] Reload Tab 2
- [ ] Verify Tab 2 also shows "Enable" (localStorage shared)

---

## 11. Console Errors

### Check for JavaScript Errors
- [ ] Open DevTools → Console tab
- [ ] Clear console
- [ ] Interact with MotionToggle (click all options)
- [ ] Verify **zero errors** in console
- [ ] Verify **zero warnings** related to MotionProvider/MotionToggle

---

## 12. Performance Check

### DevTools Performance Tab
- [ ] Open DevTools → Performance tab
- [ ] Click Record
- [ ] Toggle between options 3 times
- [ ] Stop recording
- [ ] Review timeline:
  - [ ] No layout thrashing
  - [ ] No long tasks (> 50ms)
  - [ ] Smooth frame rate (60fps)

### Lighthouse Audit
- [ ] Open DevTools → Lighthouse tab
- [ ] Select:
  - [x] Performance
  - [x] Accessibility
  - [x] Best Practices
- [ ] Click "Generate report"
- [ ] Verify scores:
  - [ ] Performance: ≥ 90
  - [ ] Accessibility: ≥ 95
  - [ ] Best Practices: ≥ 90
- [ ] Check for any motion-related warnings

---

## Summary

### Test Results
- **Total Tests:** _____ / 100+
- **Passed:** _____
- **Failed:** _____
- **Blocked:** _____

### Issues Found
1. ___________________________________________________________
2. ___________________________________________________________
3. ___________________________________________________________

### Recommendations
1. ___________________________________________________________
2. ___________________________________________________________
3. ___________________________________________________________

### Sign-Off
- [ ] All critical tests passed
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Accessibility compliant
- [ ] Ready to merge

**Tester Signature:** ___________  
**Date:** ___________

---

## Next Steps After Testing

If all tests pass:
1. Mark Phase 0 core features as complete ✅
2. Create PR with test results
3. Begin remaining Phase 0 tasks:
   - View Transitions wrapper
   - Lighthouse CI configuration
   - Animation linting rules
4. Plan Phase 1 kickoff

If issues found:
1. Document issues in GitHub
2. Prioritize fixes
3. Re-test after fixes applied
4. Update test checklist with lessons learned
