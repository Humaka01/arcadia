'use client'
import React from 'react'

const GlitchText = ({ children, speed = 0.5, enableShadows = true, enableOnHover = false, className = '' }) => {
  const inlineStyles = {
    '--after-duration': `${speed * 3}s`,
    '--before-duration': `${speed * 2}s`,
    '--after-shadow': enableShadows ? '-5px 0 0 rgba(255,0,0,0.9)' : 'none',
    '--before-shadow': enableShadows ? '5px 0 0 rgba(0,255,255,0.9)' : 'none'
  }

  const baseClasses = 'text-white font-extrabold relative inline-block select-none cursor-default text-inherit'

  const pseudoClasses = !enableOnHover
    ? 'after:content-[attr(data-text)] after:absolute after:top-0 after:left-[10px] after:text-white after:bg-[#060010] after:overflow-hidden after:[clip-path:inset(0_0_0_0)] after:[text-shadow:var(--after-shadow)] after:animate-glitch-after ' +
      'before:content-[attr(data-text)] before:absolute before:top-0 before:left-[-10px] before:text-white before:bg-[#060010] before:overflow-hidden before:[clip-path:inset(0_0_0_0)] before:[text-shadow:var(--before-shadow)] before:animate-glitch-before'
    : "after:content-[''] after:absolute after:top-0 after:left-[10px] after:text-white after:bg-[#060010] after:overflow-hidden after:[clip-path:inset(0_0_0_0)] after:opacity-0 " +
      "before:content-[''] before:absolute before:top-0 before:left-[-10px] before:text-white before:bg-[#060010] before:overflow-hidden before:[clip-path:inset(0_0_0_0)] before:opacity-0 " +
      'hover:after:content-[attr(data-text)] hover:after:opacity-100 hover:after:[text-shadow:var(--after-shadow)] hover:after:animate-glitch-after ' +
      'hover:before:content-[attr(data-text)] hover:before:opacity-100 hover:before:[text-shadow:var(--before-shadow)] hover:before:animate-glitch-before'

  const combinedClasses = `${baseClasses} ${pseudoClasses} ${className}`

  return (
    <div style={inlineStyles} data-text={children} className={combinedClasses}>
      {children}
    </div>
  )
}

export default GlitchText
