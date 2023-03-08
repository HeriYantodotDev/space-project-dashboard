import {
  BrowserRouter as Router,
} from "react-router-dom";
import {
  Arwes,
  SoundsProvider,
  ThemeProvider,
  createSounds,
  createTheme,
} from "arwes";

import AppLayout from "./pages/AppLayout";
import LogIn from "./components/LogIn";
import { theme, resources, sounds } from "./settings";
import { useState } from "react";

const URL_FETCH_STATUS = 'https://localhost:8000/v1/auth/status'


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function useLoginState() {
    const response = await fetch(URL_FETCH_STATUS);
    const data = await response.json();
    setIsLoggedIn(data.isLoggedIn);
  }

  useLoginState();


  return (
    <ThemeProvider theme={createTheme(theme)}>
      <SoundsProvider sounds={createSounds(sounds)}>
        <Arwes animate background={resources.background.large} pattern={resources.pattern}>
          {
            isLoggedIn ?
              
              anim => (
                <Router>
                  <AppLayout show={anim.entered}  />
                </Router>
              ) :
              <LogIn/>
          
          }
        </Arwes>
      </SoundsProvider>
    </ThemeProvider>
  );
};

export default App;
