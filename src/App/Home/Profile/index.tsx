import { useEffect } from "react";
import AnimatedPage from "../AnimatePage";


const Profile = () => {
  useEffect(() => {
    document.title = 'Profile | Incedo'
  }, [])

  return (
    <AnimatedPage>
      <span>Profile</span>
    </AnimatedPage>
  )
}

export default Profile;
