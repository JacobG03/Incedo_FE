import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


export const useEscape = (url: string) => {
  const navigate = useNavigate()
  useEffect(() => {
    const handleKeys = (e: any) => {
      if (e.keyCode === 27) {
        navigate(url)
      }
    }
    document.addEventListener('keydown', handleKeys)
    return () => document.removeEventListener('keydown', handleKeys)
  }, [navigate, url])
}
