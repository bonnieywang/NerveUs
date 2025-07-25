document.addEventListener("DOMContentLoaded", function () {
  // =========================================================
  // Interactive Slider 1 Logic (Cleaned - No Tooltips/Overlays)
  // =========================================================
  // REMOVED: currentTooltipElements1 = { text: null, rect: null };

  // Get DOM input objects for slider 1
  const slider1 = document.getElementById("slider");
  const animationContainer1 = document.getElementById("animationContainer");
  // REMOVED: const skinOverlay1 = document.getElementById("skinOverlay");
  // REMOVED: const boneBehind1 = document.getElementById("boneBehind");
  // REMOVED: const boneFront1 = document.getElementById("boneFront");
  // REMOVED: const toggleSkinOverlayBtn1 = document.getElementById("toggleSkinOverlayBtn");
  // REMOVED: const toggleBoneOverlayBtn1 = document.getElementById("toggleBoneOverlayBtn");
  const tickmarks1 = document.getElementById("tickmarks");

  // The Lottie animation has 180 total frames (0 to 179)
  const LOTTIE_TOTAL_FRAMES_1 = 180;
  const LOTTIE_MAX_FRAME_INDEX_1 = LOTTIE_TOTAL_FRAMES_1 - 1; // 179

  // keyPoints1 array generation: 0, 20, 40, ..., 180 (as normalized 0-1 values)
  const keyPoints1 = [];
  for (let i = 0; i <= LOTTIE_TOTAL_FRAMES_1; i += 20) {
    const normalizedValue =
      i === LOTTIE_TOTAL_FRAMES_1 ? 1 : i / LOTTIE_MAX_FRAME_INDEX_1;
    keyPoints1.push(normalizedValue);
  }

  const snapThreshold1 = 0.01;

  const animConfig1 = {
    container: animationContainer1,
    renderer: "svg",
    loop: false,
    autoplay: false,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
    },
    path: "../../pages/layersofnerve.json",
  };

  const animInstance1 = lottie.loadAnimation(animConfig1);

  // REMOVED: svgTooltipsConfig1 array and related functions (createSvgTextWithBackground1)

  function onEnterAnimationFrame1(e) {
    slider1.value = e.currentTime / LOTTIE_MAX_FRAME_INDEX_1;
  }

  function onAnimConfigReady1(e) {
    console.log("Lottie config_ready for slider 1");
    slider1.setAttribute("max", 1);
    slider1.setAttribute("step", 0.001);
    // Add touchstart listener
    slider1.addEventListener("mousedown", onSliderDown1);
    slider1.addEventListener("touchstart", onSliderDown1);
  }

  function onAnimDataReady1(e) {
    console.log("Lottie data_ready for slider 1");
  }

  function onAnimDomLoaded1(e) {
    console.log("Lottie elements for slider 1 have been added to the DOM.");
    // REMOVED: All tooltip attachment logic from here
    const mainSvgElement = animationContainer1.querySelector("svg");
    if (mainSvgElement) {
      // Ensure mainSvgElement exists before trying to set pointerEvents
      mainSvgElement.style.pointerEvents = "auto";
    }
  }

  function onSliderDown1(e) {
    animInstance1.pause();
    animInstance1.removeEventListener("enterFrame", onEnterAnimationFrame1);
    slider1.addEventListener("input", onSliderChange1);
    // Add touchend listener
    window.addEventListener("mouseup", onSliderUp1);
    window.addEventListener("touchend", onSliderUp1);
  }

  function onSliderUp1(e) {
    animInstance1.addEventListener("enterFrame", onEnterAnimationFrame1);
    slider1.removeEventListener("input", onSliderChange1);
    // Remove touchend listener
    window.removeEventListener("mouseup", onSliderUp1);
    window.removeEventListener("touchend", onSliderUp1);
  }

  function onSliderChange1(e) {
    let rawValue = parseFloat(slider1.value);
    let snappedValue = rawValue;

    for (let i = 0; i < keyPoints1.length; i++) {
      if (Math.abs(rawValue - keyPoints1[i]) <= snapThreshold1) {
        snappedValue = keyPoints1[i];
        break;
      }
    }
    slider1.value = snappedValue;

    const targetFrame = snappedValue * LOTTIE_MAX_FRAME_INDEX_1;

    animInstance1.goToAndStop(Math.round(targetFrame), true);

    console.log(`Slider snappedValue (0-1): ${snappedValue.toFixed(4)}`);
    console.log(
      `Calculated Lottie Frame (rounded): ${Math.round(targetFrame)}`
    );
  }

  // REMOVED: Overlay toggle buttons for slider 1

  animInstance1.addEventListener("enterFrame", onEnterAnimationFrame1);
  animInstance1.addEventListener("data_ready", onAnimDataReady1);
  animInstance1.addEventListener("config_ready", onAnimConfigReady1);
  animInstance1.addEventListener("DOMLoaded", onAnimDomLoaded1);

  // --- TICK MARK PLACEMENT LOGIC FOR SLIDER 1 (FIXED FOR RESPONSIVE SMOOTHNESS) ---
  const thumbWidth1 = 25; // IMPORTANT: This must match the width of your ::-webkit-slider-thumb / ::-moz-range-thumb in CSS

  let rAF_ID_1 = null; // Variable to hold the requestAnimationFrame ID

  function drawTickMarks1() {
    if (!slider1 || !tickmarks1) {
      console.warn("Slider or tickmarks container not found for slider 1.");
      return;
    }

    // Clear existing tick marks to prevent duplicates
    tickmarks1.innerHTML = "";

    // Get the actual width of the slider input element
    const sliderTrackWidth1 = slider1.offsetWidth;

    // The effective width that the *center* of the thumb travels
    const usableTrackWidth1 = sliderTrackWidth1 - thumbWidth1;

    keyPoints1.forEach((point) => {
      const tick = document.createElement("div");
      tick.classList.add("tick");

      // Calculate the 'left' position for the CENTER of the tick mark
      const tickPositionPx = point * usableTrackWidth1 + thumbWidth1 / 2;

      tick.style.left = `${tickPositionPx}px`;
      tickmarks1.appendChild(tick);
    });

    rAF_ID_1 = null; // Reset the ID after execution
  }

  // Function to schedule the tick mark redraw using requestAnimationFrame
  function scheduleTickMarkDraw1() {
    if (rAF_ID_1) {
      cancelAnimationFrame(rAF_ID_1); // Cancel any pending animation frames
    }
    rAF_ID_1 = requestAnimationFrame(drawTickMarks1); // Request a new animation frame
  }

  // Initial drawing of tick marks
  drawTickMarks1();

  // Listen for resize and schedule the draw for smooth updates
  window.addEventListener("resize", scheduleTickMarkDraw1);

  // =========================================================
  // Interactive Slider 2 Logic (Cleaned - No Tooltips/Overlays)
  // =========================================================
  // REMOVED: let currentTooltipElements2 = { text: null, rect: null };

  // Get DOM input objects for slider 2
  const slider2 = document.getElementById("slider2");
  const animationContainer2 = document.getElementById("animationContainer2");
  // REMOVED: const skinOverlay2 = document.getElementById("skinOverlay2");
  // REMOVED: const boneBehind2 = document.getElementById("boneBehind2");
  // REMOVED: const boneFront2 = document.getElementById("boneFront2");
  // REMOVED: const toggleSkinOverlayBtn2 = document.getElementById("toggleSkinOverlayBtn2");
  // REMOVED: const toggleBoneOverlayBtn2 = document.getElementById("toggleBoneOverlayBtn2");
  const tickmarks2 = document.getElementById("tickmarks2");

  // Define Lottie total frames and max frame index for slider 2
  // Assuming totalFrames will be available after 'data_ready'
  let LOTTIE_TOTAL_FRAMES_2 = 0;
  let LOTTIE_MAX_FRAME_INDEX_2 = 0;

  // keyPoints2 array generation: similar to slider 1, based on total frames
  // We'll generate these dynamically once animInstance2.totalFrames is known
  const keyPoints2 = []; // This will be populated in onAnimDataReady2
  const snapThreshold2 = 0.01;

  const animConfig2 = {
    container: animationContainer2,
    renderer: "svg",
    loop: false,
    autoplay: false,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
    },
    path: "../../pages/bp_anatomy.json", // Path to your second animation JSON
  };

  const animInstance2 = lottie.loadAnimation(animConfig2);

  // REMOVED: svgTooltipsConfig2 array and related functions (createSvgTextWithBackground2)

  function onEnterAnimationFrame2(e) {
    // Ensure LOTTIE_MAX_FRAME_INDEX_2 is set before using it
    if (LOTTIE_MAX_FRAME_INDEX_2 > 0) {
      slider2.value = e.currentTime / LOTTIE_MAX_FRAME_INDEX_2;
    }
  }

  function onAnimConfigReady2(e) {
    console.log("Lottie config_ready for slider 2");
    // Set max to 1 for normalized values (0-1)
    slider2.setAttribute("max", 1);
    slider2.setAttribute("step", 0.001); // Add step for smoother control
    // Add touchstart listener
    slider2.addEventListener("mousedown", onSliderDown2);
    slider2.addEventListener("touchstart", onSliderDown2);
  }

  function onAnimDataReady2(e) {
    console.log("Lottie data_ready for slider 2");
    // Once animation data is ready, get total frames
    LOTTIE_TOTAL_FRAMES_2 = animInstance2.totalFrames;
    LOTTIE_MAX_FRAME_INDEX_2 = LOTTIE_TOTAL_FRAMES_2 - 1;

    // Generate keyPoints dynamically based on the actual animation length
    // Example: if you want a tick every 10 frames
    const tickInterval = 20; // Adjust this value as needed for slider 2
    keyPoints2.length = 0; // Clear existing
    for (let i = 0; i <= LOTTIE_TOTAL_FRAMES_2; i += tickInterval) {
      const normalizedValue =
        i === LOTTIE_TOTAL_FRAMES_2 ? 1 : i / LOTTIE_MAX_FRAME_INDEX_2;
      keyPoints2.push(normalizedValue);
    }
    // Ensure 0 and 1 are always included
    if (keyPoints2[0] !== 0) keyPoints2.unshift(0);
    if (keyPoints2[keyPoints2.length - 1] !== 1) keyPoints2.push(1);

    // Draw tick marks once the animation data is ready
    drawTickMarks2();
  }

  function onAnimDomLoaded2(e) {
    console.log("Lottie elements for slider 2 have been added to the DOM.");
    // REMOVED: All tooltip attachment logic from here
    const mainSvgElement = animationContainer2.querySelector("svg");
    if (mainSvgElement) {
      // Ensure mainSvgElement exists before trying to set pointerEvents
      mainSvgElement.style.pointerEvents = "auto";
    }
  }

  function onSliderDown2(e) {
    animInstance2.pause();
    animInstance2.removeEventListener("enterFrame", onEnterAnimationFrame2);
    slider2.addEventListener("input", onSliderChange2);
    // Add touchend listener
    window.addEventListener("mouseup", onSliderUp2);
    window.addEventListener("touchend", onSliderUp2);
  }

  function onSliderUp2(e) {
    animInstance2.addEventListener("enterFrame", onEnterAnimationFrame2);
    slider2.removeEventListener("input", onSliderChange2);
    // Remove touchend listener
    window.removeEventListener("mouseup", onSliderUp2);
    window.removeEventListener("touchend", onSliderUp2);
  }

  function onSliderChange2(e) {
    let rawValue = parseFloat(slider2.value);
    let snappedValue = rawValue;

    for (let i = 0; i < keyPoints2.length; i++) {
      if (Math.abs(rawValue - keyPoints2[i]) <= snapThreshold2) {
        snappedValue = keyPoints2[i];
        break;
      }
    }

    slider2.value = snappedValue;

    // Use LOTTIE_MAX_FRAME_INDEX_2 for correct frame calculation
    const targetFrame = snappedValue * LOTTIE_MAX_FRAME_INDEX_2;

    animInstance2.goToAndStop(Math.round(targetFrame), true); // Use true for `is_smart` if you want to allow backwards animation

    console.log(`Slider 2 snappedValue (0-1): ${snappedValue.toFixed(4)}`);
    console.log(
      `Calculated Lottie 2 Frame (rounded): ${Math.round(targetFrame)}`
    );
  }

  // REMOVED: Overlay toggle buttons for slider 2

  animInstance2.addEventListener("enterFrame", onEnterAnimationFrame2);
  animInstance2.addEventListener("data_ready", onAnimDataReady2);
  animInstance2.addEventListener("config_ready", onAnimConfigReady2);
  animInstance2.addEventListener("DOMLoaded", onAnimDomLoaded2);

  // --- TICK MARK PLACEMENT LOGIC FOR SLIDER 2 (Updated to match Slider 1) ---
  const thumbWidth2 = 25; // IMPORTANT: This must match the width of your ::-webkit-slider-thumb / ::-moz-range-thumb in CSS

  let rAF_ID_2 = null; // Variable to hold the requestAnimationFrame ID

  function drawTickMarks2() {
    if (!slider2 || !tickmarks2) {
      console.warn("Slider or tickmarks container not found for slider 2.");
      return;
    }

    // Clear existing tick marks to prevent duplicates
    tickmarks2.innerHTML = "";

    // Get the actual width of the slider input element
    const sliderTrackWidth2 = slider2.offsetWidth;

    // The effective width that the *center* of the thumb travels
    const usableTrackWidth2 = sliderTrackWidth2 - thumbWidth2;

    keyPoints2.forEach((point) => {
      const tick = document.createElement("div");
      tick.classList.add("tick");

      // Calculate the 'left' position for the CENTER of the tick mark
      const tickPositionPx = point * usableTrackWidth2 + thumbWidth2 / 2;

      tick.style.left = `${tickPositionPx}px`;
      tickmarks2.appendChild(tick);
    });

    rAF_ID_2 = null; // Reset the ID after execution
  }

  // Function to schedule the tick mark redraw using requestAnimationFrame
  function scheduleTickMarkDraw2() {
    if (rAF_ID_2) {
      cancelAnimationFrame(rAF_ID_2); // Cancel any pending animation frames
    }
    rAF_ID_2 = requestAnimationFrame(drawTickMarks2); // Request a new animation frame
  }

  // Initial drawing of tick marks will now happen in onAnimDataReady2
  window.addEventListener("resize", scheduleTickMarkDraw2);
});
