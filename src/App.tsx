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
import { IState, IMe, IThemeState } from "./types";
import Home from "./App/Home/Home";
import Settings from "./App/Home/Settings";
import Profile from "./App/Home/Profile";
import Notes from "./App/Home/Notes";
import { AnimatePresence, domAnimation, LazyMotion } from "framer-motion";
import Note from "./App/Home/Notes/Note";
import Section from "./App/Home/Notes/Section";
import { fetchNotes, fetchSections } from "./redux/calls/notes_calls";


function App() {
  const dispatch = useDispatch()
  const me = useSelector<IState, IMe>(state => state.me)
  const theme = useSelector<IState, IThemeState>(state => state.theme)
  const location = useLocation()

  useEffect(() => {
    getMe(dispatch)
  }, [dispatch])

  useEffect(() => {
    getTheme(dispatch)
    if (me.meInfo) {
      fetchNotes(dispatch)
      fetchSections(dispatch)
    }
  }, [dispatch, me.meInfo])

  if (me.finished === false || !theme.theme) {
    return null
  }

  return (
    <LazyMotion features={domAnimation}>
      <ThemeProvider theme={theme.theme}>
        <GlobalStyle />
        <AnimatePresence exitBeforeEnter>
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<RequireVerified><HomePage /></RequireVerified>}>
              <Route index element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
              <Route path="notes" element={<Notes />} />
              <Route path="notes/:id" element={<Note />} />
              <Route path="sections/:id" element={<Section />} />
            </Route>
            <Route path="login" element={<ExcludeAuth><LoginPage /></ExcludeAuth>} />
            <Route path="register" element={<ExcludeAuth><RegisterPage /></ExcludeAuth>} />
            <Route path="verify" element={<RequireAuth><VerifyPage /></RequireAuth>} />
            <Route path='reset_password/:uri' element={<ExcludeAuth><ResetPassPage /></ExcludeAuth>} />
          </Routes>
        </AnimatePresence>
      </ThemeProvider>
    </LazyMotion>
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