import { useEffect } from "react";
import AnimatedPage from "../AnimatePage";
import { useEscape } from "../hooks";


const Profile = () => {
  useEffect(() => {
    document.title = 'Profile | Incedo'
  }, [])

  useEscape('/')

  return (
    <AnimatedPage>
      <span>Profile</span>
    </AnimatedPage>
  )
}

export default Profile;
