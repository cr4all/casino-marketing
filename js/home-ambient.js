(function () {
  if (document.body.dataset.ambient !== "true") return;

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isMobile = window.matchMedia("(max-width: 768px)").matches;

  var ambientRoot = document.createElement("div");
  ambientRoot.className = "ambient-bg";
  ambientRoot.setAttribute("aria-hidden", "true");

  var particleCanvas = document.createElement("canvas");
  particleCanvas.className = "ambient-layer ambient-particles";

  var fractalCanvas = document.createElement("canvas");
  fractalCanvas.className = "ambient-layer ambient-fractal";

  ambientRoot.appendChild(particleCanvas);
  ambientRoot.appendChild(fractalCanvas);
  document.body.insertBefore(ambientRoot, document.body.firstChild);

  var hero = document.querySelector(".hero") || document.querySelector(".page-hero");
  var heroCanvas = document.createElement("canvas");
  heroCanvas.className = "hero-probability-surface";
  heroCanvas.setAttribute("aria-hidden", "true");
  if (hero) hero.insertBefore(heroCanvas, hero.firstChild);

  var state = {
    width: 0,
    height: 0,
    dpr: Math.min(window.devicePixelRatio || 1, 2),
    time: 0,
    particles: [],
    fractalPoints: [],
    raf: 0
  };

  function resizeCanvas(canvas, w, h) {
    canvas.width = Math.floor(w * state.dpr);
    canvas.height = Math.floor(h * state.dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    var ctx = canvas.getContext("2d");
    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    return ctx;
  }

  function resizeAll() {
    state.width = window.innerWidth;
    state.height = window.innerHeight;
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);
    state.particleCtx = resizeCanvas(particleCanvas, state.width, state.height);
    state.fractalCtx = resizeCanvas(fractalCanvas, state.width, state.height);
    initParticles();
    initFractalPoints();
    if (hero) {
      var rect = hero.getBoundingClientRect();
      state.heroW = rect.width;
      state.heroH = rect.height;
      state.heroCtx = resizeCanvas(heroCanvas, state.heroW, state.heroH);
    }
  }

  function initParticles() {
    var count = isMobile ? 38 : reducedMotion ? 48 : 72;
    state.particles = [];
    for (var i = 0; i < count; i++) {
      state.particles.push({
        x: Math.random() * state.width,
        y: Math.random() * state.height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: 1 + Math.random() * 1.4
      });
    }
  }

  function initFractalPoints() {
    var count = isMobile ? 2200 : 4200;
    state.fractalPoints = [];
    var x = 0.1;
    var y = 0.1;
    for (var i = 0; i < count; i++) {
      var nx = Math.sin(1.4 * y) - Math.cos(1.6 * x);
      var ny = Math.sin(1.2 * x) - Math.cos(1.7 * y);
      x = nx;
      y = ny;
      state.fractalPoints.push({ x: x, y: y });
    }
  }

  function drawParticles(dt) {
    var ctx = state.particleCtx;
    if (!ctx) return;

    ctx.clearRect(0, 0, state.width, state.height);
    var linkDist = isMobile ? 120 : 155;
    var particles = state.particles;

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      if (!reducedMotion) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.x < -20) p.x = state.width + 20;
        if (p.x > state.width + 20) p.x = -20;
        if (p.y < -20) p.y = state.height + 20;
        if (p.y > state.height + 20) p.y = -20;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(124, 108, 240, 0.55)";
      ctx.fill();
    }

    for (var a = 0; a < particles.length; a++) {
      for (var b = a + 1; b < particles.length; b++) {
        var dx = particles[a].x - particles[b].x;
        var dy = particles[a].y - particles[b].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > linkDist) continue;
        var alpha = (1 - dist / linkDist) * 0.16;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.strokeStyle = "rgba(124, 108, 240, " + alpha.toFixed(3) + ")";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }

  function drawFractalOverlay(t) {
    var ctx = state.fractalCtx;
    if (!ctx) return;

    ctx.clearRect(0, 0, state.width, state.height);
    var cx = state.width * 0.5;
    var cy = state.height * 0.42;
    var scale = Math.min(state.width, state.height) * 0.22;
    var rot = reducedMotion ? 0 : t * 0.04;
    var cosR = Math.cos(rot);
    var sinR = Math.sin(rot);
    var points = state.fractalPoints;

    for (var i = 0; i < points.length; i++) {
      var px = points[i].x * cosR - points[i].y * sinR;
      var py = points[i].x * sinR + points[i].y * cosR;
      var x = cx + px * scale;
      var y = cy + py * scale;
      var hueMix = (i / points.length + t * 0.02) % 1;
      var color = hueMix > 0.72 ? "rgba(232, 185, 35, 0.045)" : "rgba(124, 108, 240, 0.04)";
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 1.2, 1.2);
    }

    ctx.globalAlpha = 0.035;
    ctx.strokeStyle = "#7c6cf0";
    ctx.lineWidth = 0.6;
    for (var j = 0; j < 6; j++) {
      var side = 90 + j * 18;
      ctx.beginPath();
      for (var k = 0; k <= 3; k++) {
        var ang = rot * 0.5 + (Math.PI * 2 * k) / 3;
        var sx = cx + Math.cos(ang) * side;
        var sy = cy + Math.sin(ang) * side;
        if (k === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.closePath();
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  function probability(x, y, t) {
    var z = 0;
    z += 0.62 * Math.exp(-Math.pow(x - 0.35, 2) * 2.8 - Math.pow(y - 0.15, 2) * 3.2);
    z += 0.5 * Math.exp(-Math.pow(x + 0.38, 2) * 2.2 - Math.pow(y + 0.22, 2) * 2.8);
    z += 0.38 * Math.exp(-Math.pow(x, 2) * 4.5 - Math.pow(y + 0.42, 2) * 3.5);
    z += 0.14 * Math.sin(x * 6 + t * 0.9) * Math.cos(y * 5 - t * 0.7);
    return z * 0.95;
  }

  function project(x, y, z, rotX, rotY, cx, cy, scale) {
    var x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
    var z1 = x * Math.sin(rotY) + z * Math.cos(rotY);
    var y1 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
    var z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);
    var f = scale / (scale + z2 + 2.8);
    return { x: cx + x1 * f, y: cy + y1 * f, z: z2 };
  }

  function drawHeroSurface(t) {
    var ctx = state.heroCtx;
    if (!ctx || !state.heroW) return;

    ctx.clearRect(0, 0, state.heroW, state.heroH);

    var grid = isMobile ? 22 : 32;
    var isPageHero = hero && hero.classList.contains("page-hero");
    var cx = state.heroW * (isMobile || isPageHero ? 0.5 : 0.58);
    var cy = state.heroH * (isMobile ? 0.62 : isPageHero ? 0.52 : 0.56);
    var meshScale = Math.min(state.heroW, state.heroH) * 0.34;
    var rotX = 0.62 + Math.sin(t * 0.15) * 0.08;
    var rotY = t * 0.22;
    var verts = [];
    var i;
    var j;

    for (i = 0; i <= grid; i++) {
      verts[i] = [];
      for (j = 0; j <= grid; j++) {
        var gx = (j / grid) * 2 - 1;
        var gy = (i / grid) * 2 - 1;
        var gz = probability(gx, gy, t) - 0.35;
        verts[i][j] = project(gx * 2.4, gy * 2.4, gz * 2.2, rotX, rotY, cx, cy, meshScale);
        verts[i][j].h = gz;
      }
    }

    for (i = 0; i < grid; i++) {
      for (j = 0; j < grid; j++) {
        var v00 = verts[i][j];
        var v10 = verts[i + 1][j];
        var v01 = verts[i][j + 1];
        var avgH = (v00.h + v10.h + v01.h) / 3;
        var alpha = 0.04 + Math.max(0, avgH) * 0.14;
        ctx.beginPath();
        ctx.moveTo(v00.x, v00.y);
        ctx.lineTo(v01.x, v01.y);
        ctx.lineTo(verts[i + 1][j + 1].x, verts[i + 1][j + 1].y);
        ctx.lineTo(v10.x, v10.y);
        ctx.closePath();
        ctx.fillStyle = avgH > 0.35
          ? "rgba(232, 185, 35, " + alpha.toFixed(3) + ")"
          : "rgba(124, 108, 240, " + alpha.toFixed(3) + ")";
        ctx.fill();
      }
    }

    ctx.lineWidth = 0.75;
    for (i = 0; i <= grid; i++) {
      ctx.beginPath();
      for (j = 0; j <= grid; j++) {
        var p = verts[i][j];
        if (j === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = "rgba(124, 108, 240, 0.28)";
      ctx.stroke();
    }

    for (j = 0; j <= grid; j++) {
      ctx.beginPath();
      for (i = 0; i <= grid; i++) {
        var q = verts[i][j];
        if (i === 0) ctx.moveTo(q.x, q.y);
        else ctx.lineTo(q.x, q.y);
      }
      ctx.strokeStyle = "rgba(167, 139, 250, 0.22)";
      ctx.stroke();
    }

    var glow = ctx.createRadialGradient(cx, cy, 10, cx, cy, meshScale * 1.1);
    glow.addColorStop(0, "rgba(124, 108, 240, 0.12)");
    glow.addColorStop(1, "rgba(7, 11, 20, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, state.heroW, state.heroH);
  }

  function drawStatic() {
    drawParticles(0);
    drawFractalOverlay(0);
    drawHeroSurface(0);
  }

  var last = performance.now();
  function frame(now) {
    if (document.hidden) {
      state.raf = requestAnimationFrame(frame);
      return;
    }
    var dt = Math.min(2.5, (now - last) / 16.67);
    last = now;
    state.time += dt * 0.016;
    drawParticles(dt);
    drawFractalOverlay(state.time);
    drawHeroSurface(state.time);
    state.raf = requestAnimationFrame(frame);
  }

  var resizeTimer;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeAll, 120);
  }

  resizeAll();
  window.addEventListener("resize", onResize);

  if (reducedMotion) {
    drawStatic();
  } else {
    state.raf = requestAnimationFrame(frame);
  }

  document.addEventListener("visibilitychange", function () {
    if (!document.hidden && !reducedMotion && !state.raf) {
      last = performance.now();
      state.raf = requestAnimationFrame(frame);
    }
  });
})();
