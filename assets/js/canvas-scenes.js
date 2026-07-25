/* Maharaja Readymade — per-tab 3D background scenes
   Part of the site's plain-JavaScript bundle; no build step, no dependencies. */

/* ============================================================
   PER-TAB 3D CANVAS SCENES
   Every tab gets its own animated 3D background, drawn with
   hand-rolled perspective projection (no external libraries).
   Only the canvas inside the ACTIVE tab renders, so the cost
   stays at one scene regardless of how many tabs exist.
   ============================================================ */
(function () {
  var GOLD = [212,175,55], BRIGHT = [244,208,63], MAROON = [190,70,90];
  var FOV = 340;
  function rgba(c, a) { return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')'; }

  var scenes = {};

  /* HOME — a golden starfield rushing toward the viewer */
  scenes.stars = function () {
    var pts = [];
    for (var i = 0; i < 160; i++) pts.push({ x:(Math.random()-0.5)*1000, y:(Math.random()-0.5)*1000, z:Math.random()*900+1, s:Math.random()*1.6+0.4 });
    return function (ctx, w, h, t, mx, my) {
      var cx = w/2 + mx*50, cy = h/2 + my*50;
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        p.z -= 1.5;
        if (p.z < 1) { p.z = 900; p.x = (Math.random()-0.5)*1000; p.y = (Math.random()-0.5)*1000; }
        var sc = FOV/(FOV+p.z), x = cx + p.x*sc, y = cy + p.y*sc;
        var a = (1 - p.z/900) * 0.85;
        ctx.beginPath();
        ctx.arc(x, y, Math.max(0.3, p.s*sc*2.2), 0, 6.283);
        ctx.fillStyle = rgba(i % 7 === 0 ? BRIGHT : GOLD, a);
        ctx.fill();
      }
    };
  };

  /* OUR STORY — a rotating helix ribbon: the thread of our timeline */
  scenes.ribbon = function () {
    return function (ctx, w, h, t, mx, my) {
      var cx = w/2, cy = h/2, ry = t*0.00025 + mx*0.5, rx = 0.4 + my*0.3;
      ctx.lineWidth = 1.4;
      for (var k = 0; k < 3; k++) {
        ctx.beginPath();
        var started = false;
        for (var i = 0; i < 180; i++) {
          var u = i/180*Math.PI*4, R = 190 + k*40;
          var px = Math.cos(u)*R, py = (i-90)*2.4, pz = Math.sin(u)*R;
          var c = Math.cos(ry), s = Math.sin(ry);
          var x1 = px*c - pz*s, z1 = px*s + pz*c;
          var c2 = Math.cos(rx), s2 = Math.sin(rx);
          var y1 = py*c2 - z1*s2, z2 = py*s2 + z1*c2;
          var sc = FOV/(FOV + z2 + 420);
          if (sc <= 0) continue;
          var X = cx + x1*sc, Y = cy + y1*sc;
          if (!started) { ctx.moveTo(X, Y); started = true; } else ctx.lineTo(X, Y);
        }
        ctx.strokeStyle = rgba(k === 1 ? BRIGHT : GOLD, 0.30 - k*0.07);
        ctx.stroke();
      }
    };
  };

  /* BRANDS — a drifting field of rotating wireframe cubes */
  scenes.cubes = function () {
    var V = [[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
    var E = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
    var cubes = [];
    for (var i = 0; i < 12; i++) cubes.push({ x:(Math.random()-0.5)*900, y:(Math.random()-0.5)*700, z:Math.random()*700+120, sz:28+Math.random()*34, sp:0.0004+Math.random()*0.0008, ph:Math.random()*6.283 });
    return function (ctx, w, h, t, mx, my) {
      var cx = w/2 + mx*40, cy = h/2 + my*40;
      ctx.lineWidth = 1.1;
      for (var i = 0; i < cubes.length; i++) {
        var cu = cubes[i], a = t*cu.sp + cu.ph;
        cu.z -= 0.35; if (cu.z < 80) cu.z = 800;
        var proj = [];
        for (var v = 0; v < 8; v++) {
          var px = V[v][0]*cu.sz, py = V[v][1]*cu.sz, pz = V[v][2]*cu.sz;
          var c = Math.cos(a), s = Math.sin(a);
          var x1 = px*c - pz*s, z1 = px*s + pz*c;
          var c2 = Math.cos(a*0.7), s2 = Math.sin(a*0.7);
          var y1 = py*c2 - z1*s2, z2 = py*s2 + z1*c2;
          var sc = FOV/(FOV + z2 + cu.z);
          proj.push([cx + (x1 + cu.x)*sc, cy + (y1 + cu.y)*sc]);
        }
        var al = Math.max(0, 1 - cu.z/800) * 0.5;
        ctx.strokeStyle = rgba(i % 3 === 0 ? BRIGHT : GOLD, al);
        ctx.beginPath();
        for (var e = 0; e < E.length; e++) {
          ctx.moveTo(proj[E[e][0]][0], proj[E[e][0]][1]);
          ctx.lineTo(proj[E[e][1]][0], proj[E[e][1]][1]);
        }
        ctx.stroke();
      }
    };
  };

  /* OUR RANGE — a rippling 3D fabric mesh */
  scenes.fabric = function () {
    var COLS = 22, ROWS = 13;
    return function (ctx, w, h, t, mx, my) {
      var cx = w/2, cy = h/2 + 40;
      var rx = 0.85 + my*0.25, ry = t*0.00012 + mx*0.4;
      function pt(i, j) {
        var x = (i-(COLS-1)/2)*52, z = (j-(ROWS-1)/2)*52;
        var y = Math.sin(i*0.55 + t*0.0016)*22 + Math.cos(j*0.5 + t*0.0012)*20;
        var c = Math.cos(ry), s = Math.sin(ry);
        var x1 = x*c - z*s, z1 = x*s + z*c;
        var c2 = Math.cos(rx), s2 = Math.sin(rx);
        var y1 = y*c2 - z1*s2, z2 = y*s2 + z1*c2;
        var sc = FOV/(FOV + z2 + 560);
        return [cx + x1*sc, cy + y1*sc];
      }
      ctx.lineWidth = 1;
      for (var j = 0; j < ROWS; j++) {
        ctx.beginPath();
        for (var i = 0; i < COLS; i++) { var p = pt(i, j); if (i === 0) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1]); }
        ctx.strokeStyle = rgba(GOLD, 0.10 + 0.16*(j/ROWS));
        ctx.stroke();
      }
      for (var i2 = 0; i2 < COLS; i2++) {
        ctx.beginPath();
        for (var j2 = 0; j2 < ROWS; j2++) { var p2 = pt(i2, j2); if (j2 === 0) ctx.moveTo(p2[0], p2[1]); else ctx.lineTo(p2[0], p2[1]); }
        ctx.strokeStyle = rgba(MAROON, 0.10);
        ctx.stroke();
      }
    };
  };

  /* REVIEWS — slowly spinning five-pointed stars floating upward */
  scenes.stars3d = function () {
    var st = [];
    for (var i = 0; i < 16; i++) st.push({ x:(Math.random()-0.5)*900, y:(Math.random()-0.5)*640, z:Math.random()*700+120, r:14+Math.random()*16, sp:0.0006+Math.random()*0.0012, ph:Math.random()*6.283, vy:0.12+Math.random()*0.2 });
    return function (ctx, w, h, t, mx, my) {
      var cx = w/2 + mx*36, cy = h/2 + my*36;
      for (var i = 0; i < st.length; i++) {
        var s0 = st[i];
        s0.y -= s0.vy; if (s0.y < -360) s0.y = 360;
        var a = t*s0.sp + s0.ph;
        var sc = FOV/(FOV + s0.z);
        var X = cx + s0.x*sc, Y = cy + s0.y*sc, R = s0.r*sc*1.8;
        var squash = Math.abs(Math.cos(a));
        ctx.beginPath();
        for (var k = 0; k < 10; k++) {
          var ang = -Math.PI/2 + k*Math.PI/5;
          var rr = (k % 2 === 0) ? R : R*0.42;
          var pxx = X + Math.cos(ang)*rr*(0.25 + 0.75*squash), pyy = Y + Math.sin(ang)*rr;
          if (k === 0) ctx.moveTo(pxx, pyy); else ctx.lineTo(pxx, pyy);
        }
        ctx.closePath();
        var al = Math.max(0, 1 - s0.z/820) * 0.5;
        ctx.fillStyle = rgba(BRIGHT, al*0.5); ctx.fill();
        ctx.strokeStyle = rgba(GOLD, al); ctx.lineWidth = 1.1; ctx.stroke();
      }
    };
  };

  /* GALLERY — floating 3D picture frames turning in space */
  scenes.frames = function () {
    var fr = [];
    for (var i = 0; i < 14; i++) {
      var fw = 40 + Math.random()*46;
      fr.push({ x:(Math.random()-0.5)*950, y:(Math.random()-0.5)*680, z:Math.random()*760+100, w:fw, h:fw*(0.7+Math.random()*0.6), sp:0.0004+Math.random()*0.0009, ph:Math.random()*6.283 });
    }
    return function (ctx, w, h, t, mx, my) {
      var cx = w/2 + mx*40, cy = h/2 + my*40;
      ctx.lineWidth = 1.2;
      for (var i = 0; i < fr.length; i++) {
        var f = fr[i], a = t*f.sp + f.ph;
        f.z -= 0.3; if (f.z < 70) f.z = 830;
        var turn = Math.cos(a), sc = FOV/(FOV + f.z);
        var X = cx + f.x*sc, Y = cy + f.y*sc;
        var W = Math.abs(f.w*sc*turn), H = f.h*sc;
        var al = Math.max(0, 1 - f.z/900) * 0.55;
        ctx.strokeStyle = rgba(i % 4 === 0 ? BRIGHT : GOLD, al);
        ctx.fillStyle = rgba(GOLD, al*0.12);
        ctx.beginPath(); ctx.rect(X-W, Y-H, W*2, H*2); ctx.fill(); ctx.stroke();
      }
    };
  };

  /* CONTACT — a rotating wireframe globe with our location pulsing at its heart */
  scenes.globe = function () {
    return function (ctx, w, h, t, mx, my) {
      var cx = w/2, cy = h/2, R = Math.min(w, h)*0.28;
      var ry = t*0.0003 + mx*0.6, rx = -0.35 + my*0.3;
      function proj(x, y, z) {
        var c = Math.cos(ry), s = Math.sin(ry);
        var x1 = x*c - z*s, z1 = x*s + z*c;
        var c2 = Math.cos(rx), s2 = Math.sin(rx);
        var y1 = y*c2 - z1*s2, z2 = y*s2 + z1*c2;
        var sc = FOV/(FOV + z2 + R*1.6);
        return [cx + x1*sc, cy + y1*sc];
      }
      ctx.lineWidth = 1;
      for (var la = -4; la <= 4; la++) {
        var phi = la*Math.PI/10;
        ctx.beginPath();
        for (var i = 0; i <= 60; i++) {
          var th = i/60*Math.PI*2;
          var p = proj(R*Math.cos(phi)*Math.cos(th), R*Math.sin(phi), R*Math.cos(phi)*Math.sin(th));
          if (i === 0) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1]);
        }
        ctx.strokeStyle = rgba(GOLD, 0.16); ctx.stroke();
      }
      for (var lo = 0; lo < 12; lo++) {
        var lam = lo*Math.PI/6;
        ctx.beginPath();
        for (var j = 0; j <= 60; j++) {
          var ph2 = -Math.PI/2 + j/60*Math.PI;
          var p2 = proj(R*Math.cos(ph2)*Math.cos(lam), R*Math.sin(ph2), R*Math.cos(ph2)*Math.sin(lam));
          if (j === 0) ctx.moveTo(p2[0], p2[1]); else ctx.lineTo(p2[0], p2[1]);
        }
        ctx.strokeStyle = rgba(lo % 3 === 0 ? BRIGHT : GOLD, 0.13); ctx.stroke();
      }
      var pulse = (Math.sin(t*0.003) + 1)/2;
      ctx.beginPath(); ctx.arc(cx, cy, 4 + pulse*7, 0, 6.283);
      ctx.fillStyle = rgba(MAROON, 0.5 - pulse*0.3); ctx.fill();
      ctx.beginPath(); ctx.arc(cx, cy, 3.4, 0, 6.283);
      ctx.fillStyle = rgba(BRIGHT, 0.95); ctx.fill();
    };
  };

  /* AI ASSISTANT — a drifting 3D neural constellation */
  scenes.neural = function () {
    var n = [];
    for (var i = 0; i < 34; i++) n.push({ x:(Math.random()-0.5)*820, y:(Math.random()-0.5)*600, z:(Math.random()-0.5)*520, vx:(Math.random()-0.5)*0.25, vy:(Math.random()-0.5)*0.25, vz:(Math.random()-0.5)*0.25 });
    return function (ctx, w, h, t, mx, my) {
      var cx = w/2, cy = h/2, ry = t*0.00018 + mx*0.5, rx = my*0.3;
      var pr = [];
      for (var i = 0; i < n.length; i++) {
        var p = n[i];
        p.x += p.vx; p.y += p.vy; p.z += p.vz;
        if (Math.abs(p.x) > 410) p.vx *= -1;
        if (Math.abs(p.y) > 300) p.vy *= -1;
        if (Math.abs(p.z) > 260) p.vz *= -1;
        var c = Math.cos(ry), s = Math.sin(ry);
        var x1 = p.x*c - p.z*s, z1 = p.x*s + p.z*c;
        var c2 = Math.cos(rx), s2 = Math.sin(rx);
        var y1 = p.y*c2 - z1*s2, z2 = p.y*s2 + z1*c2;
        var sc = FOV/(FOV + z2 + 520);
        pr.push({ X: cx + x1*sc, Y: cy + y1*sc, sc: sc });
      }
      ctx.lineWidth = 0.9;
      for (var i2 = 0; i2 < pr.length; i2++) {
        for (var j = i2+1; j < pr.length; j++) {
          var dx = pr[i2].X - pr[j].X, dy = pr[i2].Y - pr[j].Y;
          var d = Math.sqrt(dx*dx + dy*dy);
          if (d < 150) {
            ctx.beginPath();
            ctx.moveTo(pr[i2].X, pr[i2].Y); ctx.lineTo(pr[j].X, pr[j].Y);
            ctx.strokeStyle = rgba(GOLD, (1 - d/150)*0.22); ctx.stroke();
          }
        }
      }
      for (var k = 0; k < pr.length; k++) {
        ctx.beginPath(); ctx.arc(pr[k].X, pr[k].Y, Math.max(0.5, 2.2*pr[k].sc*2), 0, 6.283);
        ctx.fillStyle = rgba(k % 5 === 0 ? BRIGHT : GOLD, 0.75); ctx.fill();
      }
    };
  };

  /* ---- driver ---- */
  var items = [];
  document.querySelectorAll('.tab-canvas').forEach(function (cv) {
    var factory = scenes[cv.dataset.scene] || scenes.stars;
    items.push({ cv: cv, ctx: cv.getContext('2d'), render: factory(), section: cv.closest('.tab-content'), w: 0, h: 0 });
  });

  /* Tablets often report a 2–3x pixel ratio; rendering the scene at that
     density costs far more than it shows for a soft background effect. */
  var DPR = Math.min(window.devicePixelRatio || 1, window.innerWidth < 1024 ? 1 : 1.5);
  function sizeAll() {
    items.forEach(function (it) {
      var r = it.cv.getBoundingClientRect();
      if (!r.width || !r.height) { it.w = 0; it.h = 0; return; }
      it.cv.width = Math.round(r.width * DPR);
      it.cv.height = Math.round(r.height * DPR);
      it.w = r.width; it.h = r.height;
    });
  }
  window.addEventListener('resize', sizeAll);
  window.resizeTabCanvases = sizeAll;
  setTimeout(sizeAll, 0);

  var cmx = 0, cmy = 0;
  window.addEventListener('mousemove', function (e) {
    cmx = (e.clientX/window.innerWidth - 0.5) * 2;
    cmy = (e.clientY/window.innerHeight - 0.5) * 2;
  });

  function loop(t) {
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      if (!it.section || !it.section.classList.contains('active')) continue;
      /* offsetParent is null when the canvas is display:none — which is the
         case on phones. Without this guard the sizeAll() below would run on
         every animation frame, forcing a layout each time for a canvas that
         is never painted. */
      if (it.cv.offsetParent === null) continue;
      if (!it.w || !it.h) { sizeAll(); if (!it.w || !it.h) continue; }
      var ctx = it.ctx;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, it.w, it.h);
      it.render(ctx, it.w, it.h, t, cmx, cmy);
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
