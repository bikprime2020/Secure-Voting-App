'use client'

import { Suspense, lazy, useEffect, useRef, useCallback } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const forwardEventToCanvas = useCallback((e: MouseEvent | PointerEvent) => {
    if (!containerRef.current) return
    const canvas = containerRef.current.querySelector('canvas')
    if (!canvas) return

    // If already over the canvas, let the browser handle it naturally
    if (e.target === canvas || (e.target instanceof Node && canvas.contains(e.target as Node))) return

    // Forward as PointerEvent (Spline uses pointer events internally)
    const pointerEvent = new PointerEvent('pointermove', {
      clientX: e.clientX,
      clientY: e.clientY,
      bubbles: true,
      cancelable: true,
      pointerType: 'mouse',
    })
    canvas.dispatchEvent(pointerEvent)

    // Also forward as mousemove for compatibility
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: e.clientX,
      clientY: e.clientY,
      bubbles: true,
      cancelable: true,
    })
    canvas.dispatchEvent(mouseEvent)
  }, [])

  useEffect(() => {
    const handler = (e: PointerEvent | MouseEvent) => forwardEventToCanvas(e)

    window.addEventListener('pointermove', handler)
    window.addEventListener('mousemove', handler)

    return () => {
      window.removeEventListener('pointermove', handler)
      window.removeEventListener('mousemove', handler)
    }
  }, [forwardEventToCanvas])

  return (
    <div ref={containerRef} className="w-full h-full">
      <Suspense 
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <span className="loader"></span>
          </div>
        }
      >
        <Spline
          scene={scene}
          className={className}
        />
      </Suspense>
    </div>
  )
}