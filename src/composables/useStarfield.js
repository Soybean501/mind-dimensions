// Canvas starfield with twinkle, shooting stars, and nebula glow.
// Returns a directive-like attach(canvas) you call inside onMounted.
import { onMounted, onBeforeUnmount } from 'vue'

export function useStarfield(canvasRef, opts = {}) {
  const density = opts.density ?? 1
  const lines = opts.lines ?? true
  let raf, ro
  const hueOptions = [220, 220, 220, 200, 280, 330, 60]

  function attach() {
    const canvas = canvasRef.value
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w, h, stars = [], shooters = []
    let lastShoot = 0
    const isLight = () => document.documentElement.getAttribute('data-theme') === 'light'

    function resize() {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      w = canvas.clientWidth; h = canvas.clientHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.floor((w * h) / 4500 * density)
      stars = Array.from({ length: n }, () => ({
        x: Math.random()*w, y: Math.random()*h,
        z: Math.random()*0.9 + 0.1,
        vx: (Math.random()-0.5)*0.06,
        vy: (Math.random()-0.5)*0.06,
        phase: Math.random()*Math.PI*2,
        twinkleSpeed: 0.008 + Math.random()*0.025,
        twinkleAmp: 0.35 + Math.random()*0.55,
        hue: hueOptions[Math.floor(Math.random()*hueOptions.length)],
        burst: Math.random() < 0.06,
        burstPhase: Math.random()*Math.PI*2,
      }))
      shooters = []
    }

    function spawnShooter() {
      const fromTop = Math.random() < 0.5
      const x = fromTop ? Math.random()*w*0.4 + w*0.1 : Math.random()*w*0.4 + w*0.5
      const y = fromTop ? -20 : Math.random()*h*0.3
      const angle = Math.PI/4 + (Math.random()-0.5)*0.4
      const speed = 6 + Math.random()*3
      shooters.push({
        x, y, vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed,
        life: 0, maxLife: 80 + Math.random()*30,
        len: 60 + Math.random()*40,
        hue: [200,220,280][Math.floor(Math.random()*3)],
      })
    }

    function draw(t) {
      if (isLight()) { ctx.clearRect(0,0,w,h); raf = requestAnimationFrame(draw); return }
      ctx.clearRect(0,0,w,h)
      const g1 = ctx.createRadialGradient(w*0.7,h*0.3,0,w*0.7,h*0.3,Math.max(w,h)*0.55)
      g1.addColorStop(0,'rgba(80,120,220,0.10)'); g1.addColorStop(0.5,'rgba(120,60,200,0.05)'); g1.addColorStop(1,'rgba(0,0,0,0)')
      ctx.fillStyle = g1; ctx.fillRect(0,0,w,h)
      const g2 = ctx.createRadialGradient(w*0.2,h*0.85,0,w*0.2,h*0.85,Math.max(w,h)*0.45)
      g2.addColorStop(0,'rgba(200,120,240,0.06)'); g2.addColorStop(1,'rgba(0,0,0,0)')
      ctx.fillStyle = g2; ctx.fillRect(0,0,w,h)

      if (lines) {
        ctx.lineWidth = 1
        for (let i = 0; i < stars.length; i++) {
          const a = stars[i]
          for (let j = i+1; j < Math.min(i+5, stars.length); j++) {
            const b = stars[j]
            const dx = a.x-b.x, dy = a.y-b.y
            const d2 = dx*dx+dy*dy
            if (d2 < 11000) {
              const o = (1 - d2/11000) * 0.15 * Math.min(a.z,b.z)
              ctx.strokeStyle = `rgba(200,210,255,${o})`
              ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke()
            }
          }
        }
      }
      for (const s of stars) {
        s.x += s.vx; s.y += s.vy; s.phase += s.twinkleSpeed; s.burstPhase += 0.015
        if (s.x < -10) s.x = w+10; if (s.x > w+10) s.x = -10
        if (s.y < -10) s.y = h+10; if (s.y > h+10) s.y = -10
        let tw = 1 - s.twinkleAmp + s.twinkleAmp * (0.5 + 0.5*Math.sin(s.phase))
        if (s.burst) { const f = Math.max(0, Math.sin(s.burstPhase*3.7)); tw = Math.min(1.6, tw + f*f*0.9) }
        const r = s.z * 1.2 * Math.max(0.4, tw)
        const o = Math.min(1, 0.55 * s.z * tw)
        ctx.fillStyle = `oklch(92% 0.06 ${s.hue} / ${o})`
        ctx.beginPath(); ctx.arc(s.x,s.y,r,0,Math.PI*2); ctx.fill()
        if (s.z > 0.75 || (s.burst && tw > 1.1)) {
          ctx.fillStyle = `oklch(85% 0.12 ${s.hue} / ${o*0.35})`
          ctx.beginPath(); ctx.arc(s.x,s.y,r*3,0,Math.PI*2); ctx.fill()
        }
        if (s.burst && tw > 1.3) {
          ctx.strokeStyle = `oklch(95% 0.05 ${s.hue} / ${(tw-1.3)*0.7})`
          ctx.lineWidth = 0.6
          ctx.beginPath()
          ctx.moveTo(s.x - r*5, s.y); ctx.lineTo(s.x + r*5, s.y)
          ctx.moveTo(s.x, s.y - r*5); ctx.lineTo(s.x, s.y + r*5)
          ctx.stroke()
        }
      }
      if (t - lastShoot > 4500 + Math.random()*5000) { lastShoot = t; if (Math.random()<0.7) spawnShooter() }
      for (let i = shooters.length-1; i >= 0; i--) {
        const s = shooters[i]
        s.x += s.vx; s.y += s.vy; s.life++
        const alpha = Math.sin((s.life/s.maxLife)*Math.PI)
        if (s.life > s.maxLife || s.x > w+100 || s.y > h+100) { shooters.splice(i,1); continue }
        const tailX = s.x - s.vx*(s.len/Math.hypot(s.vx,s.vy))
        const tailY = s.y - s.vy*(s.len/Math.hypot(s.vx,s.vy))
        const grad = ctx.createLinearGradient(tailX,tailY,s.x,s.y)
        grad.addColorStop(0, `oklch(92% 0.12 ${s.hue} / 0)`)
        grad.addColorStop(1, `oklch(95% 0.06 ${s.hue} / ${alpha})`)
        ctx.strokeStyle = grad; ctx.lineWidth = 1.4; ctx.lineCap = 'round'
        ctx.beginPath(); ctx.moveTo(tailX,tailY); ctx.lineTo(s.x,s.y); ctx.stroke()
        ctx.fillStyle = `oklch(96% 0.08 ${s.hue} / ${alpha})`
        ctx.beginPath(); ctx.arc(s.x,s.y,1.6,0,Math.PI*2); ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    resize()
    raf = requestAnimationFrame(draw)
    ro = new ResizeObserver(resize); ro.observe(canvas)
  }

  onMounted(attach)
  onBeforeUnmount(() => { if (raf) cancelAnimationFrame(raf); if (ro) ro.disconnect() })
}
