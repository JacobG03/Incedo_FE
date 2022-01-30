import AnimatedPage from "../AnimatePage"
import { Outlet } from "react-router-dom";
import Dashboard from "./Dashboard";


const Notes = () => {
  return (
    <AnimatedPage>
      <Dashboard />
      <Outlet />
    </AnimatedPage>
  )
}

export default Notes;
