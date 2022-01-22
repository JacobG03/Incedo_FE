import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Routes,
  Route,
  useLocation,
  Navigate
} from "react-router-dom";
import { ThemeProvider } from "styled-components";

import HomePage from "./App/Home/index";
import LoginPage from "./App/Login/index";
import RegisterPage from "./App/Register/index";
import VerifyPage from "./App/Verify/index";
import ResetPassPage from "./App/ResetPass";
import GlobalStyle from './shared/globalStyle';
import { getTheme } from "./redux/calls/theme_calls";
import { getMe } from "./redux/calls/me_calls";
import { IState, IMe, ITheme } from "./types";
import Home from "./App/Home/Home";
import Settings from "./App/Home/Settings";


function App() {
  const dispatch = useDispatch()
  const me = useSelector<IState, IMe>(state => state.me)
  const theme = useSelector<IState, ITheme>(state => state.theme)

  useEffect(() => {
    getMe(dispatch)
  }, [dispatch])

  useEffect(() => {
    if (me.finished) {
      getTheme(dispatch)
    }
  }, [dispatch, me.finished])

  if (me.finished === false || !theme.theme) {
    return null
  }

  return (
    <ThemeProvider theme={theme.theme}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<RequireVerified><HomePage /></RequireVerified>}>
          <Route index element={<Home />} />
          <Route path="profile" element={<h1>Profile</h1>} />
          <Route path="settings" element={<Settings />} />
          <Route path="notes" element={<h1>Notes</h1>} />
          <Route path="days" element={<h1>Days</h1>} />
        </Route>
        <Route path="login" element={<ExcludeAuth><LoginPage /></ExcludeAuth>} />
        <Route path="register" element={<ExcludeAuth><RegisterPage /></ExcludeAuth>} />
        <Route path="verify" element={<RequireAuth><VerifyPage /></RequireAuth>} />
        <Route path='reset_password/:uri' element={<ExcludeAuth><ResetPassPage /></ExcludeAuth>} />
      </Routes>
    </ThemeProvider>
  );
}


const RequireAuth = ({ children }: { children: any }) => {
  const me = useSelector<IState, IMe>(state => state.me)
  let location = useLocation();

  if (!me?.meInfo) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  else if (me.meInfo?.is_verified) {
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  return children;
}


const RequireVerified = ({ children }: { children: any }) => {
  const me = useSelector<IState, IMe>(state => state.me)
  let location = useLocation();

  if (!me.meInfo) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  else if (!me.meInfo.is_verified) {
    return <Navigate to="/verify" state={{ from: location }} replace />;
  }

  return children;
}


function ExcludeAuth({ children }: { children: any }) {
  const me = useSelector<IState, IMe>(state => state.me)
  if (me?.meInfo) {
    if (!me.meInfo.is_verified) {
      return <Navigate to='/verify' replace />
    }
    return <Navigate to='/' />
  }

  return children
}

export default App;