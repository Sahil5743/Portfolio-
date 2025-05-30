"use client"

import { useEffect, useRef } from "react"

const HeroStarBackground = ({ themeColor }) => {
  const canvasRef = useRef(null)

  // Get theme color in RGB format
  const getThemeColorRGB = (color) => {
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
        return [234, 88, 12] // Default to orange like in the screenshot
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.offsetWidth
        canvas.height = container.offsetHeight
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Star properties
    const stars = []

    // Create stars
    const themeRGB = getThemeColorRGB(themeColor)
    const starCount = Math.floor((canvas.width * canvas.height) / 800) // Density based on area

    // Update the star creation loop to reduce intensity
    for (let i = 0; i < starCount; i++) {
      const size = Math.random() * 1.5 + 0.5 // Slightly smaller stars
      const hasGlow = Math.random() > 0.92 // Only 8% of stars have glow (was 15%)

      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        opacity: Math.random() * 0.6 + 0.2, // Reduced max opacity from 0.8 to 0.6
        blinkSpeed: Math.random() * 0.015 + 0.005, // Slightly slower blinking
        blinkDirection: Math.random() > 0.5 ? 1 : -1,
        hasGlow,
        glowIntensity: hasGlow ? Math.random() * 0.4 + 0.2 : 0, // Reduced glow intensity
        glowDirection: Math.random() > 0.5 ? 1 : -1,
      })
    }

    // Animation
    let animationFrameId

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach((star) => {
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

        // Update the glow rendering to make it more subtle
        if (star.hasGlow) {
          const [r, g, b] = themeRGB
          const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 4) // Smaller glow radius
          glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${star.opacity * star.glowIntensity * 0.7})`) // Reduced opacity
          glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
          ctx.fillStyle = glow
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2)
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
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    // Function to draw star shape
    function drawStar(ctx, x, y, spikes, outerRadius, innerRadius) {
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
  }, [themeColor])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />
}

export default HeroStarBackground
