import React, { useEffect, useState } from 'react'
import { getProfilePicUrl } from '../../lib/portfolioUrl'

/**
 * Broadcast that a portfolio's avatar changed so every mounted
 * ProfileAvatar re-fetches the image (bypasses the browser cache).
 */
export const AVATAR_UPDATED_EVENT = 'portfolio-avatar-updated'

export function notifyAvatarUpdated(portfolioId: string) {
  window.dispatchEvent(new CustomEvent(AVATAR_UPDATED_EVENT, { detail: { portfolioId, version: Date.now() } }))
}

interface ProfileAvatarProps {
  portfolioId: string
  alt?: string
  /** Classes for the outer wrapper (size, shape, borders, shadows...) */
  className?: string
  /** Classes for the <img> element */
  imgClassName?: string
  /** Decorative elements rendered inside the wrapper, on top of / around the image */
  children?: React.ReactNode
  /** Rendered instead of the avatar when no picture exists */
  fallback?: React.ReactNode
}

/**
 * Renders the portfolio owner's profile picture.
 * - Stays invisible until the image actually loads (no empty frames / flashes).
 * - Renders `fallback` (or nothing) if the portfolio has no picture.
 */
export default function ProfileAvatar({
  portfolioId,
  alt = 'Profile picture',
  className = '',
  imgClassName = '',
  children,
  fallback = null,
}: ProfileAvatarProps) {
  const [version, setVersion] = useState<number | null>(null)
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null)
  const [failedSrc, setFailedSrc] = useState<string | null>(null)

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail
      if (!detail || detail.portfolioId === portfolioId) {
        setVersion(detail?.version ?? Date.now())
      }
    }
    window.addEventListener(AVATAR_UPDATED_EVENT, handler)
    return () => window.removeEventListener(AVATAR_UPDATED_EVENT, handler)
  }, [portfolioId])

  if (!portfolioId) return <>{fallback}</>

  const src = getProfilePicUrl(portfolioId) + (version ? `?v=${version}` : '')

  if (failedSrc === src) return <>{fallback}</>
  const loaded = loadedSrc === src

  return (
    <>
      {!loaded && fallback}
      <div className={className} style={loaded ? undefined : { display: 'none' }}>
        <img
          key={src}
          src={src}
          alt={alt}
          loading="eager"
          decoding="async"
          draggable={false}
          className={`block w-full h-full object-cover ${imgClassName}`}
          onLoad={() => setLoadedSrc(src)}
          onError={() => setFailedSrc(src)}
        />
        {children}
      </div>
    </>
  )
}
