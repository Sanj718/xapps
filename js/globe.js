(function () {
  var PI = Math.PI;

  // --- Texture ---
  function parseTexture(text) {
    var lines = text.split("\n");
    var day = [];
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].length === 0) continue;
      // Original reverses each row
      day.push(lines[i].split("").reverse());
    }
    return day;
  }

  // --- Vector math ---
  function transformVector(v, m) {
    var tx = v[0] * m[0] + v[1] * m[4] + v[2] * m[8] + m[12];
    var ty = v[0] * m[1] + v[1] * m[5] + v[2] * m[9] + m[13];
    var tz = v[0] * m[2] + v[1] * m[6] + v[2] * m[10] + m[14];
    v[0] = tx;
    v[1] = ty;
    v[2] = tz;
  }

  function normalize(v) {
    var len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    v[0] /= len;
    v[1] /= len;
    v[2] /= len;
  }

  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }

  // --- Camera ---
  // Matches adamsky/globe Camera::update exactly
  function buildCamera(r, alpha, beta) {
    var sinA = Math.sin(alpha),
      cosA = Math.cos(alpha);
    var sinB = Math.sin(beta),
      cosB = Math.cos(beta);
    var x = r * cosA * cosB;
    var y = r * sinA * cosB;
    var z = r * sinB;
    // Column-major 4x4 matrix, same layout as the Rust code
    var matrix = new Float32Array(16);
    matrix[3] = 0;
    matrix[7] = 0;
    matrix[11] = 0;
    matrix[15] = 1;
    matrix[0] = -sinA;
    matrix[1] = cosA;
    matrix[2] = 0;
    matrix[4] = cosA * sinB;
    matrix[5] = sinA * sinB;
    matrix[6] = -cosB;
    matrix[8] = cosA * cosB;
    matrix[9] = sinA * cosB;
    matrix[10] = sinB;
    matrix[12] = x;
    matrix[13] = y;
    matrix[14] = z;
    return { x: x, y: y, z: z, matrix: matrix };
  }

  // --- focus_target: orient camera to given coords ---
  // Matches adamsky/globe focus_target function
  function focusTarget(cx, cy, xyOffset) {
    var camXY = cx * PI * -1 - 1.5 - xyOffset;
    var camZ = cy * 3 - 1.5;
    return { camXY: camXY, camZ: camZ };
  }

  // --- Render globe onto output grid ---
  // Direct port of Globe::render_on from lib.rs
  //
  // In the original:
  //   Internal canvas is N×N pixels, charPix = (4, 8)
  //   Output: cols = N/4, rows = N/8
  //   Ray normalization uses cols/2 for x, rows/2 for y
  //   Both x and y span [-1, 1] over the output area
  //   cols = 2*rows ensures circular globe (compensating for char aspect ratio)
  //
  function renderGlobe(texture, output, radius, angle, cam, cols, rows) {
    var texX = texture[0].length - 1;
    var texY = texture.length - 1;
    var halfCols = cols / 2;
    var halfRows = rows / 2;

    for (var row = 0; row < rows; row++) {
      for (var col = 0; col < cols; col++) {
        // Camera origin
        var ox = cam.x,
          oy = cam.y,
          oz = cam.z;

        // Ray direction (matches original normalization)
        var u = [
          -(col - halfCols + 0.5) / halfCols,
          (row - halfRows + 0.5) / halfRows,
          -1
        ];

        transformVector(u, cam.matrix);
        u[0] -= cam.x;
        u[1] -= cam.y;
        u[2] -= cam.z;
        normalize(u);

        var dotUo = u[0] * ox + u[1] * oy + u[2] * oz;
        var dotOo = ox * ox + oy * oy + oz * oz;
        var discriminant = dotUo * dotUo - dotOo + radius * radius;

        if (discriminant < 0) continue;

        var distance = -Math.sqrt(discriminant) - dotUo;

        // Intersection point
        var ix = ox + distance * u[0];
        var iy = oy + distance * u[1];
        var iz = oz + distance * u[2];

        // Texture coordinates
        var phi = -iz / radius / 2 + 0.5;
        var theta = Math.atan2(iy, ix) / PI + 0.5 + angle / 2 / PI;
        theta -= Math.floor(theta);

        var earthX = Math.floor(theta * texX);
        var earthY = Math.floor(phi * texY);
        if (earthX < 0) earthX = 0;
        if (earthX > texX) earthX = texX;
        if (earthY < 0) earthY = 0;
        if (earthY > texY) earthY = texY;

        output[row][col] = texture[earthY][earthX];
      }
    }
  }

  // --- Main ---
  function createGlobe(element, textureUrl) {
    var pre = document.createElement("pre");
    pre.style.cssText =
      "margin:0;padding:0;overflow:hidden;position:relative;" +
      "font-family:monospace;line-height:1.15;letter-spacing:0;" +
      "border-radius:1rem;display:flex;align-items:center;justify-content:center;";
    pre.className = "globe-pre";
    element.appendChild(pre);

    /**
     * Returns a random percentage between min and max.
     */
    function randomPct(min, max) {
      return min + Math.random() * (max - min);
    }

    /**
     * Returns random top/left (in %) outside the central globe circle so stars never overlap it.
     * Center at 50%, 50%; exclusion radius in % (globe is roughly central).
     */
    var globeCenterX = 50;
    var globeCenterY = 50;
    var globeExclusionRadius = 32;

    function randomPositionOutsideGlobe() {
      var top, left, dx, dy, distSq, r2;
      r2 = globeExclusionRadius * globeExclusionRadius;
      do {
        top = randomPct(2, 98);
        left = randomPct(2, 98);
        dx = left - globeCenterX;
        dy = top - globeCenterY;
        distSq = dx * dx + dy * dy;
      } while (distSq < r2);
      return { top: top, left: left };
    }

    /** Duration (s) for one star pulse. */
    var starDuration = 7;

    function createStarElement() {
      var el = document.createElement("span");
      el.className = "globe-star";
      el.style.cssText =
        "position:absolute;font-size:1.5em;line-height:1;pointer-events:none;" +
        "transform-origin:center;opacity:0;transition:none;";
      el.addEventListener("animationend", function () {
        el.style.opacity = "0";
      });
      return el;
    }

    /**
     * Creates an independent star set: own slots (random positions outside globe), two elements, 50% overlap.
     */
    function createStarSet(chars, numSlots) {
      var starSlots = [];
      for (var i = 0; i < numSlots; i++) {
        var pos = randomPositionOutsideGlobe();
        starSlots.push({
          char: chars[i % chars.length],
          top: pos.top,
          left: pos.left
        });
      }
      var starElements = [createStarElement(), createStarElement()];
      starElements.forEach(function (el) {
        element.appendChild(el);
      });
      var currentStarIndex = 0;
      var nextStarTimeoutId = null;
      var activeStarElIndex = 0;

      function showNextStar() {
        if (nextStarTimeoutId != null) {
          clearTimeout(nextStarTimeoutId);
          nextStarTimeoutId = null;
        }
        var starEl = starElements[activeStarElIndex];
        var slot = starSlots[currentStarIndex];
        starEl.textContent = slot.char;
        starEl.style.top = slot.top + "%";
        starEl.style.left = slot.left + "%";
        starEl.style.opacity = "1";
        starEl.style.animation = "none";
        starEl.offsetHeight;
        starEl.style.animation =
          "starPulse " + starDuration + "s ease-in-out 1";
        currentStarIndex = (currentStarIndex + 1) % starSlots.length;
        activeStarElIndex = 1 - activeStarElIndex;
        nextStarTimeoutId = setTimeout(function () {
          nextStarTimeoutId = null;
          showNextStar();
        }, starDuration * 500);
      }

      return { start: showNextStar };
    }

    var starSet1 = createStarSet(["✴", "✴", "✶", "✴"], 8);
    var starSet2 = createStarSet(["✶", "✴", "✴", "✴"], 8);
    var starSet2DelayMs = 1500;
    starSet1.start();
    setTimeout(function () {
      starSet2.start();
    }, starSet2DelayMs);

    // Globe parameters (matches adamsky defaults)
    var radius = 1;
    var camZoom = 1.7;

    // Initial camera from focus_target(0.4, 0.6)
    var focused = focusTarget(0.4, 0.6, 0);
    var camXY = focused.camXY;
    var camZ = focused.camZ;
    var globeAngle = 0;

    // Animation speeds: equivalent to `globe -sc2 -g10`
    var globeRotSpeed = 10 / 1000;
    var camRotSpeed = 2 / 1000;

    var texture = null;

    // Camera control state
    var isDragging = false;
    var lastX = 0;
    var lastY = 0;
    var rotSensitivity = 0.008;

    function getPointerCoords(e) {
      if (e.touches && e.touches.length) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
      return { x: e.clientX, y: e.clientY };
    }

    function onPointerDown(e) {
      isDragging = true;
      var coords = getPointerCoords(e);
      lastX = coords.x;
      lastY = coords.y;
      element.style.cursor = "grabbing";
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      var coords = getPointerCoords(e);
      camXY += (coords.x - lastX) * rotSensitivity;
      camZ += (coords.y - lastY) * rotSensitivity;
      camZ = Math.max(-1.2, Math.min(1.2, camZ));
      lastX = coords.x;
      lastY = coords.y;
    }

    function onPointerUp() {
      isDragging = false;
      element.style.cursor = "grab";
    }

    element.style.cursor = "grab";
    element.style.userSelect = "none";
    element.addEventListener("mousedown", onPointerDown);
    element.addEventListener("touchstart", onPointerDown, { passive: true });
    element.addEventListener("mousemove", onPointerMove);
    element.addEventListener(
      "touchmove",
      function (e) {
        onPointerMove(e);
        if (isDragging) e.preventDefault();
      },
      { passive: false }
    );
    element.addEventListener("mouseup", onPointerUp);
    element.addEventListener("touchend", onPointerUp);
    element.addEventListener("mouseleave", onPointerUp);

    function computeGrid() {
      var w = element.offsetWidth;
      var h = element.offsetHeight || 400;

      // Determine rows from height, cols = 2*rows for circular globe
      // (monospace chars are ~2:1 height:width)
      var rows = 36;
      var cols = rows * 2;

      // Font size to fill container height
      var fontSize = h / (rows * 1.15);

      // Check if cols fit the width; if not, shrink
      var charW = fontSize * 0.6;
      if (cols * charW > w) {
        cols = Math.floor(w / charW);
        rows = Math.floor(cols / 2);
        fontSize = h / (rows * 1.15);
      }

      return { cols: cols, rows: rows, fontSize: fontSize, w: w, h: h };
    }

    function render() {
      var grid = computeGrid();
      pre.style.width = grid.w + "px";
      pre.style.height = grid.h + "px";
      pre.style.fontSize = grid.fontSize + "px";

      var cam = buildCamera(camZoom, camXY, camZ);
      var output = [];
      for (var i = 0; i < grid.rows; i++) {
        output[i] = [];
        for (var j = 0; j < grid.cols; j++) {
          output[i][j] = " ";
        }
      }

      renderGlobe(
        texture,
        output,
        radius,
        globeAngle,
        cam,
        grid.cols,
        grid.rows
      );

      var lines = [];
      for (var r = 0; r < grid.rows; r++) {
        lines[r] = output[r].join("");
      }
      pre.textContent = lines.join("\n");
    }

    fetch(textureUrl)
      .then(function (r) {
        return r.text();
      })
      .then(function (text) {
        texture = parseTexture(text);

        function animate() {
          requestAnimationFrame(animate);

          // Screensaver mode animation (pause when user is dragging)
          if (!isDragging) {
            globeAngle += globeRotSpeed;
            camXY -= globeRotSpeed / 2;
            camXY -= camRotSpeed;
          }

          render();
        }
        animate();
      })
      .catch(function () {
        pre.textContent = "Failed to load Earth texture.";
      });

    window.addEventListener("resize", function () {
      if (texture) render();
    });
  }

  // Boot
  var container = document.getElementById("globe-container");
  if (container) {
    var url = container.dataset.textureUrl || "/textures/earth.txt";
    createGlobe(container, url);
  }
})();
