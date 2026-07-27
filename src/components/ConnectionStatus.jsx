import { useEffect, useState } from "react"

export default function ConnectionStatus({ signedIn = false }) {
  const [isOnline, setIsOnline] = useState(() => navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (isOnline) return null

  return (
    <div className="connection-status" role="status" aria-live="polite">
      <span aria-hidden="true">☁️</span>
      <span>
        {signedIn
          ? "You’re offline. Cloud actions are paused until your connection returns."
          : "You’re offline. Local library features remain available."}
      </span>
    </div>
  )
}
