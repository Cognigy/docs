import { useState, useRef, useEffect } from 'react'

// Muted, looping video that starts on its own and has a visible play and pause button.
// Stays paused for visitors who prefer reduced motion.
// align: 'left' (default) or 'center'. buttonPosition: 'left' (default) or 'right'. buttonSize: pixels.
// buttonBottom: distance of the button from the bottom edge, in pixels.
// flush: removes the default vertical margin of the video so the button sits inside the video corner.
export const AutoplayVideo = ({ src, title, label, height = 340, align = 'left', buttonPosition = 'left', buttonSize = 36, buttonBottom = 10, flush = false }) => {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !window.matchMedia) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause()
    }
  }, [])

  const toggle = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
    } else {
      video.pause()
    }
  }

  const iconSize = Math.round(buttonSize * 0.44)
  const player = (
    <div style={{ position: 'relative', display: 'inline-block', lineHeight: 0 }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        title={title}
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        style={{ height: `${height}px`, width: 'auto', maxWidth: '100%', border: '1px solid #ccc', borderRadius: '12px', display: 'block', ...(flush ? { margin: 0 } : {}) }}
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Pause video' : 'Play video'}
        title={playing ? 'Pause' : 'Play'}
        style={{
          position: 'absolute',
          [buttonPosition === 'right' ? 'right' : 'left']: '10px',
          bottom: `${buttonBottom}px`,
          width: `${buttonSize}px`,
          height: `${buttonSize}px`,
          borderRadius: '50%',
          border: 'none',
          background: 'rgba(17, 24, 39, 0.75)',
          color: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0
        }}
      >
        {playing ? (
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
        ) : (
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" /></svg>
        )}
      </button>
    </div>
  )

  if (align === 'center') {
    return <div style={{ textAlign: 'center' }}>{player}</div>
  }
  return player
}
