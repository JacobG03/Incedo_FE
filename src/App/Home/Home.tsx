import { useEffect } from "react";


const Home = () => {
  useEffect(() => {
    document.title = 'Home | Incedo'
  }, [])
  return (
    <h1>Home</h1>
  )
}

export default Home;
