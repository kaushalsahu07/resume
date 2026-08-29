import React, { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'

interface PreviewFrameProps {
  children: React.ReactNode
  className?: string
}

export default function PreviewFrame({ children, className = 'w-full h-full border-0' }: PreviewFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null)

  const setupIframe = useCallback(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const doc = iframe.contentDocument
    if (!doc || !doc.body) return

    // 1. Clear any default or inherited elements
    doc.head.innerHTML = ''

    // 2. Add viewport meta
    const meta = doc.createElement('meta')
    meta.name = 'viewport'
    meta.content = 'width=device-width, initial-scale=1.0'
    doc.head.appendChild(meta)

    // 3. Clone all host stylesheets and styles
    document.querySelectorAll('style, link[rel="stylesheet"]').forEach((node) => {
      doc.head.appendChild(node.cloneNode(true))
    })

    // 4. Base styles
    doc.documentElement.style.height = '100%'
    doc.documentElement.style.backgroundColor = 'transparent'
    doc.body.style.margin = '0'
    doc.body.style.padding = '0'
    doc.body.style.minHeight = '100%'
    doc.body.style.backgroundColor = 'transparent'
    doc.body.style.overflowX = 'hidden'

    setMountNode(doc.body)
  }, [])

  useEffect(() => {
    setupIframe()

    // Sync styles when Vite performs hot module replacement
    const observer = new MutationObserver(() => {
      const iframe = iframeRef.current
      if (!iframe?.contentDocument?.head) return
      const doc = iframe.contentDocument

      // Keep stylesheet tags updated
      document.querySelectorAll('style, link[rel="stylesheet"]').forEach((node) => {
        if (!doc.head.contains(node)) {
          doc.head.appendChild(node.cloneNode(true))
        }
      })
    })

    observer.observe(document.head, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [setupIframe])

  return (
    <iframe
      ref={iframeRef}
      onLoad={setupIframe}
      srcDoc="<!DOCTYPE html><html><head></head><body style='margin:0;padding:0;background:transparent;'></body></html>"
      className={className}
      title="Studio Preview Frame"
    >
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  )
}
