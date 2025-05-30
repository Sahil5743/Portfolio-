"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface StarBackgroundProps {
  themeColor: string
  count?: number
}

const StarBackground: React.FC<StarBackgroundProps> = ({ themeColor, count = 300 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Get theme color in RGB format
  const getThemeColorRGB = (color: string): [number, number, number] => {
    switch (color) {
      case "purple":
        return [147, 51, 234] // rgb(147, 51, 234) - purple-600
      case "blue":
        return [37, 99, 235] // rgb(37, 99, 235) - blue-600
      case "green":
        return [22, 163, 74] // rgb(22, 163, 74) - green-600
      case "orange":
        return [234, 88, 12] // rgb(234, 88, 12) - orange-600
      case "pink":
        return [219, 39, 119] // rgb(219, 39, 119) - pink-600
      default:
        return [147, 51, 234] // Default to purple
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 3 // Make canvas taller to cover the entire page
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Star properties
    const stars: {
      x: number
      y: number
      size: number
      opacity: number
      speed: number
      blinkSpeed: number
      blinkDirection: number
      hasGlow: boolean
      glowIntensity: number
      glowDirection: number
    }[] = []

    // Create stars
    const themeRGB = getThemeColorRGB(themeColor)
    const starCount = count

    for (let i = 0; i < starCount; i++) {
      const size = Math.random() * 2 + 0.5
      const hasGlow = Math.random() > 0.85 // 15% of stars have glow

      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.05 + 0.01,
        blinkSpeed: Math.random() * 0.02 + 0.005,
        blinkDirection: Math.random() > 0.5 ? 1 : -1,
        hasGlow,
        glowIntensity: hasGlow ? Math.random() * 0.5 + 0.3 : 0,
        glowDirection: Math.random() > 0.5 ? 1 : -1,
      })
    }

    // Animation
    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach((star, i) => {
        // Update star opacity (blinking effect)
        star.opacity += star.blinkSpeed * star.blinkDirection

        if (star.opacity >= 1) {
          star.opacity = 1
          star.blinkDirection = -1
        } else if (star.opacity <= 0.2) {
          star.opacity = 0.2
          star.blinkDirection = 1
        }

        // Update glow intensity for stars with glow
        if (star.hasGlow) {
          star.glowIntensity += 0.01 * star.glowDirection

          if (star.glowIntensity >= 0.8) {
            star.glowIntensity = 0.8
            star.glowDirection = -1
          } else if (star.glowIntensity <= 0.3) {
            star.glowIntensity = 0.3
            star.glowDirection = 1
          }
        }

        // Draw star glow first (if it has glow)
        if (star.hasGlow) {
          const [r, g, b] = themeRGB
          const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 6)
          glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${star.opacity * star.glowIntensity})`)
          glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
          ctx.fillStyle = glow
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 6, 0, Math.PI * 2)
          ctx.fill()
        }

        // Draw star
        const [r, g, b] = themeRGB
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${star.opacity})`

        // Draw a more complex star shape for larger stars
        if (star.size > 1.5) {
          drawStar(ctx, star.x, star.y, 4, star.size, star.size / 2)
        } else {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
          ctx.fill()
        }

        // Move stars
        star.y += star.speed

        // Reset position if star goes off screen
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    // Function to draw star shape
    function drawStar(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number,
    ) {
      let rot = (Math.PI / 2) * 3
      const step = Math.PI / spikes

      ctx.beginPath()
      ctx.moveTo(x, y - outerRadius)

      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(x + Math.cos(rot) * outerRadius, y + Math.sin(rot) * outerRadius)
        rot += step
        ctx.lineTo(x + Math.cos(rot) * innerRadius, y + Math.sin(rot) * innerRadius)
        rot += step
      }

      ctx.lineTo(x, y - outerRadius)
      ctx.closePath()
      ctx.fill()
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [themeColor, count])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" style={{ background: "transparent" }} />
  )
}

export default StarBackground
