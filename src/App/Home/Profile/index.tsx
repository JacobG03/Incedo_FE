import { useEffect } from "react";

const Profile = () => {
  useEffect(() => {
    document.title = 'Profile | Incedo'
  }, [])

  return (
    <>
      Profile
    </>
  )
}

export default Profile;
