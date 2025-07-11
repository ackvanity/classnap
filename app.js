// 1080p resolution

// List of images to preload (relative paths or URLs)
// Generate using __assetlist.js
const imageFiles = [
  "assets/bg-blur.png",
  "assets/bg.png",
  "assets/credits.svg",
  "assets/sprite/asleep/eyes-1.svg",
  "assets/sprite/asleep/marker.svg",
  "assets/sprite/asleep/mouth-1.svg",
  "assets/sprite/awake/eyes-1.svg",
  "assets/sprite/awake/marker.svg",
  "assets/sprite/awake/mouth-1.svg",
  "assets/sprite/awake/mouth-2.svg",
  "assets/sprite/body-1.svg",
  "assets/sprite/body-2.svg",
  "assets/sprite/caught/explosion-animation-1.png",
  "assets/sprite/caught/explosion-animation-2.png",
  "assets/sprite/caught/explosion-animation-3.png",
  "assets/sprite/caught/explosion-animation-4.png",
  "assets/sprite/caught/explosion-animation-5.png",
  "assets/sprite/caught/eyes-1.svg",
  "assets/sprite/caught/marker.svg",
  "assets/sprite/caught/mouth-1.svg",
  "assets/sprite/confused/explosion-animation-1.png",
  "assets/sprite/confused/explosion-animation-2.png",
  "assets/sprite/confused/explosion-animation-3.png",
  "assets/sprite/confused/explosion-animation-4.png",
  "assets/sprite/confused/explosion-animation-5.png",
  "assets/sprite/confused/eyes-1.svg",
  "assets/sprite/confused/marker.svg",
  "assets/sprite/confused/mouth-1.svg",
  "assets/sprite/hands-1.svg",
  "assets/sprite/laughing/eyes-1.svg",
  "assets/sprite/laughing/marker.svg",
  "assets/sprite/laughing/mouth-1.svg",
  "assets/sprite/table.svg",
  "assets/teacher/variation_1.svg",
  "assets/ui/@previews/Button.svg",
  "assets/ui/@previews/Buttons.svg",
  "assets/ui/@previews/Icon.svg",
  "assets/ui/@previews/Level.svg",
  "assets/ui/@previews/Panel.svg",
  "assets/ui/@previews/ProgressBar.svg",
  "assets/ui/@previews/Star.svg",
  "assets/ui/Buttons/Rect-Medium/CreditsText/Default.svg",
  "assets/ui/Buttons/Rect-Medium/CreditsText/Hover.svg",
  "assets/ui/Buttons/Rect-Medium/PlayIcon/Default.svg",
  "assets/ui/Buttons/Rect-Medium/PlayIcon/Hover.svg",
  "assets/ui/Buttons/Rect-Medium/PlayText/Default.svg",
  "assets/ui/Buttons/Rect-Medium/PlayText/Hover.svg",
  "assets/ui/Buttons/Square-Medium/ArrowLeft/Default.svg",
  "assets/ui/Buttons/Square-Medium/ArrowLeft/Hover.svg",
  "assets/ui/Buttons/Square-Medium/ArrowRight/Default.svg",
  "assets/ui/Buttons/Square-Medium/ArrowRight/Hover.svg",
  "assets/ui/Buttons/Square-Medium/Home/Default.svg",
  "assets/ui/Buttons/Square-Medium/Home/Hover.svg",
  "assets/ui/Buttons/Square-Medium/Levels/Default.svg",
  "assets/ui/Buttons/Square-Medium/Levels/Hover.svg",
  "assets/ui/Buttons/Square-Medium/Pause/Default.svg",
  "assets/ui/Buttons/Square-Medium/Pause/Hover.svg",
  "assets/ui/Buttons/Square-Medium/Play/Default.svg",
  "assets/ui/Buttons/Square-Medium/Play/Hover.svg",
  "assets/ui/Buttons/Square-Medium/Repeat/Default.svg",
  "assets/ui/Buttons/Square-Medium/Repeat/Hover.svg",
  "assets/ui/Buttons/Square-Medium/SoundOff/Default.svg",
  "assets/ui/Buttons/Square-Medium/SoundOff/Hover.svg",
  "assets/ui/Buttons/Square-Medium/SoundOn/Default.svg",
  "assets/ui/Buttons/Square-Medium/SoundOn/Hover.svg",
  "assets/ui/Icon/ArrowLeft.svg",
  "assets/ui/Icon/ArrowRight.svg",
  "assets/ui/Icon/Cross.svg",
  "assets/ui/Icon/CrossRed.svg",
  "assets/ui/Icon/Home.svg",
  "assets/ui/Icon/Levels.svg",
  "assets/ui/Icon/Locker.svg",
  "assets/ui/Icon/Pause.svg",
  "assets/ui/Icon/Play.svg",
  "assets/ui/Icon/Replay.svg",
  "assets/ui/Icon/SoundOff.svg",
  "assets/ui/Icon/SoundOn.svg",
  "assets/ui/Icon/Star.svg",
  "assets/ui/Level/Button/Locked/Default.svg",
  "assets/ui/Level/Button/Locked/Hover.svg",
  "assets/ui/Level/Button/Unlocked/Default.svg",
  "assets/ui/Level/Button/Unlocked/Hover.svg",
  "assets/ui/Panel/Body/Headed.svg",
  "assets/ui/Panel/Body/Headless.svg",
  "assets/ui/Panel/Header.svg",
  "assets/ui/Panel/Window/Big.svg",
  "assets/ui/Panel/Window/Medium.svg",
  "assets/ui/ProgressBar/Background.svg",
  "assets/ui/ProgressBar/Example.svg",
  "assets/ui/ProgressBar/Line.svg",
  "assets/ui/Scene/GameOver(A).svg",
  "assets/ui/Scene/Home.svg",
  "assets/ui/Scene/LevelComplete(A).svg",
  "assets/ui/Scene/Levels(A).svg",
  "assets/ui/Scene/Loading.svg",
  "assets/ui/Scene/Pause(A).svg",
  "assets/ui/Star/Large/Active.svg",
  "assets/ui/Star/Large/Unactive.svg",
  "assets/ui/Star/Medium/Active.svg",
  "assets/ui/Star/Medium/Unactive.svg",
  "assets/ui/Star/Small/Active.svg",
  "assets/ui/Star/Small/Group/0-3.svg",
  "assets/ui/Star/Small/Group/1-3.svg",
  "assets/ui/Star/Small/Group/2-3.svg",
  "assets/ui/Star/Small/Group/3-3.svg",
  "assets/ui/Star/Small/Unactive.svg"
]

const images = {};
const progressBar = document.getElementById('progress-bar');
const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });

(() => {
  const originalDrawImage = ctx.drawImage.bind(ctx);
  const cache = new Map(); // key: img.src + width + height → cached canvas

  ctx.drawImage = function(image, dx, dy, dw, dh) {
    if (!(image instanceof HTMLImageElement)) {
      // fallback: not a regular <img>, call original
      return originalDrawImage(image, dx, dy, dw, dh);
    }

    const key = `${image.src}|${dw}|${dh}`;
    let cachedCanvas = cache.get(key);

    if (!cachedCanvas) {
      // Create offscreen canvas and draw resized image
      cachedCanvas = document.createElement('canvas');
      cachedCanvas.width = dw;
      cachedCanvas.height = dh;

      const offCtx = cachedCanvas.getContext('2d');
      offCtx.drawImage(image, 0, 0, dw, dh);

      cache.set(key, cachedCanvas);
    }

    // Draw the resized cached canvas instead
    return originalDrawImage(cachedCanvas, dx, dy);
  };
})();


// Fixed logical size (divided by 2)
const logicalWidth = 1920;
const logicalHeight = 1080;
const aspectRatio = logicalWidth / logicalHeight;

// Set logical size once
canvas.width = logicalWidth;
canvas.height = logicalHeight;

// Preload images
function preloadImages(files, onProgress, onComplete) {
  let loadedCount = 0;
  files.forEach(file => {
    const img = new Image();
    img.onload = () => {
      images[file] = img;
      loadedCount++;
      onProgress(loadedCount / files.length);
      if (loadedCount === files.length) onComplete();
    };
    img.onerror = () => {
      console.warn(`Failed to load image: ${file}`);
      loadedCount++;
      onProgress(loadedCount / files.length);
      if (loadedCount === files.length) onComplete();
    };
    img.src = file;
  });
}

// Resize CSS size to fill window while keeping aspect ratio
function resizeCanvas() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const windowRatio = windowWidth / windowHeight;
  let displayWidth, displayHeight;
  if (windowRatio > aspectRatio) {
    displayHeight = windowHeight;
    displayWidth = displayHeight * aspectRatio;
  } else {
    displayWidth = windowWidth;
    displayHeight = displayWidth / aspectRatio;
  }
  canvas.style.width = `${displayWidth}px`;
  canvas.style.height = `${displayHeight}px`;
  document.fonts.load('32px "Josefin Sans"').then(() => {
    console.log('Font loaded!');
    firstFrame();
  });
}

window.addEventListener('resize', resizeCanvas);

// Start preloading
preloadImages(imageFiles, progress => {
  progressBar.style.width = `${progress * 100}%`;
}, () => {
  document.getElementById('progress-container').style.display = 'none';
  resizeCanvas();
});

function debugDrawDirectory() {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, logicalWidth, logicalHeight);

  ctx.fillStyle = 'black';
  ctx.font = '24px sans-serif';
  ctx.fillText('All images loaded!', 20, 40);

  // Drawing parameters
  const imagesPerRow = 6;
  const imgSize = 120; // 240 / 2
  const margin = 20;   // 40 / 2
  const textMargin = 10; // 20 / 2
  const textHeight = 8;  // 16 / 2 approximate text height
  const startX = 10; // 20 / 2
  let x = startX;
  let y = 30; // 60 / 2

  let count = 0;

  for (const [file, img] of Object.entries(images)) {
    // Draw image
    const scale = Math.min(imgSize / img.width, imgSize / img.height);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

    // Extract second last segment + file name
    const parts = file.split('/');
    const label = parts.slice(-2).join('/');

    // Draw text below image
    ctx.fillStyle = 'black';
    ctx.font = '20px sans-serif';
    ctx.fillText(label, x, y + imgSize + textMargin + textHeight / 2);

    count++;
    if (count % imagesPerRow === 0) {
      x = startX;
      y += imgSize + textMargin + textHeight + margin;
    } else {
      x += imgSize + margin;
    }
  }
}

function randomElement(array) {
  if(array.length >= 1){
    return array[Math.floor(Math.random() * array.length)];
  } else {
    throw new Error("randomElement(array): array is empty");
  }
}

function drawFromCenter(ctx, image, x, y, width, height) {
  ctx.drawImage(image, x - width/2, y - height/2, width, height);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    y += lineHeight
    const words = text.split(' ');
    let line = '';
    const lines = [];

    for(let n = 0; n < words.length; n++) {
        const testLine = line + (line ? ' ' : '') + words[n];
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && n > 0) {
            lines.push(line);
            line = words[n];
        } else {
            line = testLine;
        }
    }
    lines.push(line);

    for(let k = 0; k < lines.length; k++) {
        ctx.fillText(lines[k], x, y + k * lineHeight);
    }
}

const studentDrawingConfig = (state) => ({
  "body": {
    "prefix": `assets/sprite/body`,
    "center": [.5, .5],
    "size": [.8, .8],
    "mode": "random"
  },
  "table": {
    "prefix": `assets/sprite/table`,
    "center": [.5, .85],
    "size": [.7, .7],
    "mode": "random"
  },
  "hands": {
    "prefix": `assets/sprite/hands`,
    "center": [.5, .57],
    "size": [.47, 1],
    "mode": "random"
  },
  "eyes": {
    "prefix": `assets/sprite/${state}/eyes`,
    "center": [.5, .3],
    "size": [.2, .2],
    "mode": "random"
  },
  "mouth": {
    "prefix": `assets/sprite/${state}/mouth`,
    "center": [.5, .5],
    "size": [.15, .15],
    "mode": "random"
  },
  "explosion": {
    "prefix": `assets/sprite/${state}/explosion-animation`,
    "center": [.5, .35],
    "size": [.3, .3],
    "mode": "sequential"
  },
  "marker": {
    "prefix": `assets/sprite/${state}/marker`,
    "center": [.5, .35],
    "size": [.3, .3],
    "mode": "random"
  }
});

class Student {
  x;
  y;
  width;
  height;
  #state;
  missTimer = null;

  // New: store offscreen canvases per state
  #stateCanvases = {};

  constructor(state, x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    // Build offscreen canvas for each possible state
    const possibleStates = ["asleep", "awake", "caught", "confused", "laughing"];
    for (const st of possibleStates) {
      const config = studentDrawingConfig(st);
      const offCanvas = document.createElement('canvas');
      offCanvas.width = width;
      offCanvas.height = height;
      const offCtx = offCanvas.getContext('2d');

      for (const [componentName, componentConfig] of Object.entries(config)) {
        const prefix = componentConfig.prefix;
        const matchingFiles = imageFiles.filter(file => file.startsWith(prefix)).sort();
        if (matchingFiles.length === 0) {
          console.warn(`No matching images for prefix: ${prefix}`);
          continue;
        }

        let image;
        if (componentConfig.mode === "sequential") {
          // Use first frame as representative
          image = images[matchingFiles[0]];
        } else {
          const variation = randomElement(matchingFiles);
          image = images[variation];
        }

        if (!image) continue;

        const [cxFrac, cyFrac] = componentConfig.center;
        const centerX = cxFrac * width;
        const centerY = cyFrac * height;

        const [wFrac, hFrac] = componentConfig.size;
        const targetWidth = wFrac * width;
        const targetHeight = hFrac * height;

        const aspectRatio = image.width / image.height;
        let renderWidth = targetWidth;
        let renderHeight = targetWidth / aspectRatio;

        if (renderHeight > targetHeight) {
          renderHeight = targetHeight;
          renderWidth = renderHeight * aspectRatio;
        }

        drawFromCenter(offCtx, image, centerX, centerY, renderWidth, renderHeight);
      }

      this.#stateCanvases[st] = offCanvas;
    }

    this.state = state;
  }

  draw(ctx) {
    const canvas = this.#stateCanvases[this.#state];
    if (canvas) {
      ctx.drawImage(canvas, this.x, this.y, this.width, this.height);
    }
  }

  setSleepTimer() {
    let proba = Math.random();
    if (proba == 0) proba = 1;
    const t = Math.floor(-Math.log2(proba) * halfLife) + halfLife * .25;
    setTimeout((obj) => {
      if (obj.state !== "awake") return;
      obj.state = "asleep";

      this.missTimer = setTimeout(() => {
        if(this.state !== "awake") {
          this.state = "awake";
          missed++;
          this.setSleepTimer();
        }
      }, missPeriod * halfLife)
    }, t, this);
  }

  click() {
    if (!this.hover) return;

    if (this.state == "awake") {
      this.state = "confused";
      mistake++;
      canvas.dispatchEvent(new Event("mistake"));
      setTimeout(() => {
        this.setSleepTimer();
        this.state = "awake";
      }, halfLife);
    } else if (this.state == "asleep") {
      if (this.missTimer != null) {
        clearTimeout(this.missTimer);
        this.missTimer = null;
      }
      this.state = "caught";
      caught++;
      canvas.dispatchEvent(new Event("caught"));
      setTimeout(() => {
        this.setSleepTimer();
        this.state = "awake";
      }, halfLife);
    }
  }

  set state(state) {
    // Simply store state, no need to rebuild anything
    this.#state = state;
  }
  get state() { return this.#state; }

  get hover() {
    if (!(this.x <= mouseX && mouseX < this.x + this.width &&
          this.y <= mouseY && mouseY < this.y + this.height)) return false;
    let fgPixel = ctx.getImageData(mouseX, mouseY, 1, 1, { colorSpace: "srgb" }).data;
    fgPixel = fgPixel[0]*65536 + fgPixel[1]*256 + fgPixel[2];
    return fgPixel != bgPixel;
  }
}

class Button {
  x; y; width; height; handler; image;

  constructor(image, imageHover, x, y, width, height, handler) {
    this.image = image;
    this.imageHover = imageHover;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.handler = handler;
  }

  draw(ctx) {
    const scale = Math.min(this.width / this.image.width, this.height / this.image.height);
    drawFromCenter(ctx, this.hover ? this.imageHover : this.image,
      this.x + this.width/2, this.y + this.height/2,
      this.image.width * scale, this.image.height * scale);
  }

  click() {
    if (this.hover) this.handler();
  }

  get hover() {
    return (this.x <= mouseX && mouseX < this.x+this.width &&
            this.y <= mouseY && mouseY < this.y+this.height);
  }
}

// game data & init
let prevTime;
let grid = [[]];
let realMouseX = 0;
let realMouseY = 0;
let mouseX = 0;
let mouseY = 0;
let bgPixel = null;
let halfLife = 5000;
let missPeriod = .2;
let caught = 0;
let missed = 0;
let mistake = 0;
let points = 0;
let gameState = "start";
let elements = [];
let lockedGameResult = { points, caught, missed, mistake };
let doReset = false;
let cachedRect = canvas.getBoundingClientRect();

function firstFrame() {
  grid = [[]];
  realMouseX = 0; realMouseY = 0;
  mouseX = 0; mouseY = 0;
  bgPixel = null;
  halfLife = 5000;
  missPeriod = 1;
  caught = 0; missed = 0; mistake = 0; points = 0;
  gameState = "start";
  prevTime = performance.now();

  canvas.addEventListener("mousemove", e => {
    realMouseX = Math.floor(e.offsetX * logicalWidth / cachedRect.width);
    realMouseY = Math.floor(e.offsetY * logicalHeight / cachedRect.height);
  });
  canvas.addEventListener("click", e => {
    grid.forEach(row => row.forEach(student => student.click()));
    elements.forEach(e => e.click());
  });
  window.addEventListener("resize", () => {
    cachedRect = canvas.getBoundingClientRect();
  });
  cachedRect = canvas.getBoundingClientRect();

  requestAnimationFrame(frame);
}

function getLines(ctx, text, maxWidth) {
  var words = text.split(" ");
  var lines = [];
  var currentLine = words[0];

  for (var i=1; i<words.length; i++) {
    var word = words[i];
    var width = ctx.measureText(currentLine + " " + word).width;
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

function frame(currentTime) {
  mouseX = realMouseX;
  mouseY = realMouseY;
  const delta = currentTime - prevTime;
  prevTime = currentTime;
  console.log(delta);

  if (doReset) {
    doReset = false;
    firstFrame();
    return;
  }

  if (gameState == "running") {
    ctx.drawImage(images["assets/bg-blur.png"], 0, 0, logicalWidth, logicalHeight);
    points = caught * 100 - missed * 20 - mistake * 5;

    let pixel = ctx.getImageData(mouseX, mouseY, 1, 1, {colorSpace: "srgb"}).data;
    bgPixel = pixel[0]*65536 + pixel[1]*256 + pixel[2];

    grid.forEach(row => row.forEach(student => student.draw(ctx)));

    drawFromCenter(ctx, mistake >= 1 ? images["assets/ui/Icon/CrossRed.svg"] : images["assets/ui/Icon/Cross.svg"], 1428, 100, 64, 64);
    drawFromCenter(ctx, mistake >= 2 ? images["assets/ui/Icon/CrossRed.svg"] : images["assets/ui/Icon/Cross.svg"], 1556, 100, 64, 64);
    drawFromCenter(ctx, mistake >= 3 ? images["assets/ui/Icon/CrossRed.svg"] : images["assets/ui/Icon/Cross.svg"], 1684, 100, 64, 64);

    ctx.fillStyle = "#e52554";
    ctx.font = "32px Josefin Sans";
    ctx.fillText(`${points} pts`, 100, 100);

    if (mistake == 3) {
      gameState = "gameover";
      lockedGameResult = { points, caught, missed, mistake };
    }

  } else if (gameState == "start") {
    ctx.drawImage(images["assets/bg.png"], 0, 0, logicalWidth, logicalHeight);
    drawFromCenter(ctx, images["assets/ui/Panel/Body/Headless.svg"], logicalWidth/2, logicalHeight/2, 1500, 1062.5);

    function startGame() {
      setTimeout(() => {
        gameState = "running";
        elements = [];
        grid = [...Array(3).keys()].map((_, y) => 
            [...Array(4).keys()].map((_, x) =>
                new Student("awake", 320 + x*320, 240 + y*240, 320, 240)));
        grid.forEach(row => row.forEach(student => student.setSleepTimer()));
      }, 5);
    }

    function showCredits() {
      gameState = "credits";
    }

    elements = [
      new Button(
        images["assets/ui/Buttons/Rect-Medium/PlayText/Default.svg"],
        images["assets/ui/Buttons/Rect-Medium/PlayText/Hover.svg"],
        834, 658, 252, 132, startGame),
      new Button(
        images["assets/ui/Buttons/Rect-Medium/CreditsText/Default.svg"],
        images["assets/ui/Buttons/Rect-Medium/CreditsText/Hover.svg"],
        834, 834, 252, 132, showCredits)
    ];
    elements[0].draw(ctx);
    elements[1].draw(ctx);

    ctx.font = "128px Josefin Sans";
    ctx.fillStyle = "#e52554";
    ctx.fillText("ClassNap", 670, 250);

    ctx.font = "32px Josefin Sans";
    ctx.fillStyle = "#e52554";
    wrapText(ctx, `One day, there was a teacher faithfully explaining the depths of astrophysics to a high school class. Oh no! One student fell asleep. Oh there goes another one. Then another, until all that could be seen of them are weary, closed eyes. But astophysics is waay over their heads, you may complain, but the teacher still wanted everybody to snap out of it. So, it's now your job to point and click at those sleeping delinquents ASAP and teach them a lesson! Oh, but leave the good students alone.`, 360, 300, 1200, 50);
  } else if (gameState == "credits") {
    ctx.drawImage(images["assets/bg.png"], 0, 0, logicalWidth, logicalHeight);
    drawFromCenter(ctx, images["assets/ui/Panel/Body/Headless.svg"], logicalWidth/2, logicalHeight/2, 1500, 1062.5);

    ctx.font = "128px Josefin Sans";
    ctx.fillStyle = "#e52554";
    ctx.fillText("Credits", 725, 250);

    (new Button(
      images["assets/credits.svg"], images["assets/credits.svg"],
      200, 384, 1520, 440, ()=>{})).draw(ctx);

    elements = [
      new Button(
        images["assets/ui/Buttons/Rect-Medium/PlayText/Default.svg"],
        images["assets/ui/Buttons/Rect-Medium/PlayText/Hover.svg"],
        834, 894, 252, 132, () => { gameState = "start"; })
    ];
    elements[0].draw(ctx);

  } else if (gameState == "gameover") {
    ctx.drawImage(images["assets/bg.png"], 0, 0, logicalWidth, logicalHeight);
    drawFromCenter(ctx, images["assets/ui/Panel/Body/Headless.svg"], logicalWidth/2, logicalHeight/2, 1500, 1062.5);

    ctx.font = "128px Josefin Sans";
    ctx.fillStyle = "#e52554";
    ctx.fillText("Game Over", 625, 250);

    ctx.font = "32px Josefin Sans";
    wrapText(ctx,
      `During class, you caught ${lockedGameResult.caught} instances of sleeping students, but ${lockedGameResult.missed} slipped through and ${lockedGameResult.mistake} innocent student got caught! Altogether, you got ${lockedGameResult.points} points`,
      560, 300, 800, 50);

    elements = [
      new Button(
        images["assets/ui/Buttons/Square-Medium/Repeat/Default.svg"],
        images["assets/ui/Buttons/Square-Medium/Repeat/Hover.svg"],
        834, 658, 252, 132, () => doReset = true)
    ];
    elements[0].draw(ctx);
  }

  requestAnimationFrame(frame);
}
