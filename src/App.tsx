import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Routes,
  Route,
  useLocation,
  Navigate
} from "react-router-dom";
import  { ThemeProvider } from "styled-components";
import AccountSetup from "./pages/AccountSetup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Verify from "./pages/Verify";
import { getCurrentUser } from "./redux/apiCalls";
import GlobalStyle, { DefaultTheme } from './theme/globalStyle';
import { IState, IUser, IUserInfo } from "./types";



function App() {
  const dispatch = useDispatch()
  const user = useSelector<IState, IUser>(state => state.user)

  useEffect(() => {
    getCurrentUser(dispatch)
  }, [dispatch])

  if (!user.getCurrentUser.finished) {
    return null
  }

  // Have a component indicate that the page is loading
  return (
    <ThemeProvider theme={DefaultTheme}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<RequireAuth><Home /></RequireAuth>}>
          <Route path="notes" element={<h1>Notes</h1>} />
          <Route path="days" element={<h1>Days</h1>} />
        </Route>
        <Route path="login" element={<ExcludeAuth><Login /></ExcludeAuth>} />
        <Route path="register" element={<ExcludeAuth><Register /></ExcludeAuth>} />
        <Route path="verify" element={<RequireAuth><Verify /></RequireAuth>} />
        <Route path='account_setup' element={<RequireAuth><AccountSetup /></RequireAuth>} />
      </Routes>
    </ThemeProvider>
  );
}


const RequireAuth = ({ children }: {children: any}) => {
  const user = useSelector<IState, IUserInfo | null>(state => state.user.userInfo)
  let location = useLocation();

  console.log(user)
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}


function ExcludeAuth({ children }: {children: any}) {
  const user = useSelector<IState, IUserInfo | null>(state => state.user.userInfo)

  if (user) {
    if (!user.verified) {
      return <Navigate to='/verify' replace />
    }
    return <Navigate to='/' />
  }

  return children
}

export default App;
