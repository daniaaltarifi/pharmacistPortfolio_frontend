
import { useEffect, useRef, useState } from 'react'
import {
  animate,
  motion,
  MotionConfig,
  useInView,
  useScroll,
  useTransform,
} from 'motion/react'

export const easeOut = [0.22, 1, 0.36, 1]

export function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  )
}

export function Counter({ value, className }) {
  const match = value.match(/^([^\d]*)([\d.,]+)(.*)$/)
  const prefix = match?.[1] ?? ''
  const raw = match?.[2] ?? ''
  const suffix = match?.[3] ?? ''
  const target = match ? Number.parseFloat(raw.replace(/,/g, '')) : 0
  const decimals = raw.includes('.') ? raw.split('.')[1].length : 0
  const format = (n) =>
    new Intl.NumberFormat('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n)

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState(match ? format(0) : value)

  useEffect(() => {
    if (!inView || !match) return
    const controls = animate(0, target, {
      duration: 1.8,
      ease: easeOut,
      onUpdate: (v) => setDisplay(format(v)),
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {match ? prefix : ''}
        {display}
        {match ? suffix : ''}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  )
}

export function ScrollRevealText({ text, className }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.85'] })
  const words = text.split(' ')

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length
        return (
          <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, start + 1 / words.length]}>
            {word}
          </Word>
        )
      })}
    </p>
  )
}

function Word({
  progress,
  range,
  children,
}) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <motion.span style={{ opacity }}>
      {children}{' '}
    </motion.span>
  )
}
