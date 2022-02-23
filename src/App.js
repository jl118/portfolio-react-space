import { Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import GlobalStyle from "./globalStyles";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./components/Themes";
import Loading from "./subComponents/Loading";

//Components
const Main = lazy(() => import("./components/Main"));
const AboutPage = lazy(() => import("./components/AboutPage"));
const MySkillsPage = lazy(() => import("./components/MySkillsPage"));
const BlogPage = lazy(() => import("./components/BlogPage"));
const WorkPage = lazy(() => import("./components/WorkPage"));
const SoundBar = lazy(() => import("./subComponents/SoundBar"));
const ContactPage = lazy(() => import("./components/ContactPage"));

function App() {
  const location = useLocation();

  return (
    <>
      <GlobalStyle />

      <ThemeProvider theme={lightTheme}>
        <Suspense fallback={<Loading />}>
          <SoundBar />

          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.pathname}>
              <Route exact path="/portfolio-react-space" component={Main} />

              <Route exact path="/portfolio-react-space/contact" component={ContactPage} />

              <Route exact path="/portfolio-react-space/about" component={AboutPage} />

              <Route exact path="/portfolio-react-space/blog" component={BlogPage} />

              <Route exact path="/portfolio-react-space/work" component={WorkPage} />

              <Route exact path="/portfolio-react-space/skills" component={MySkillsPage} />
            </Switch>
          </AnimatePresence>
        </Suspense>
      </ThemeProvider>
    </>
  );
}

export default App;
