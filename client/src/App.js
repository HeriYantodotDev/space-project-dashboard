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

import { theme, resources, sounds } from "./settings";

import { useState } from "react";



const App = () => {
  const [signInStatus, setSignInStatus] = useState(false);

  return <ThemeProvider theme={createTheme(theme)}>
    <SoundsProvider sounds={createSounds(sounds)}>
      <Arwes animate background={resources.background.large} pattern={resources.pattern}>
        {
          signInStatus === true ?
            
            anim => (
              <Router>
                <AppLayout show={anim.entered} setSignInStatus={setSignInStatus}  />
              </Router>
            ) :
            <div>
              <h1>Sign In first</h1>
              <button onClick={() => setSignInStatus(true)}>Sign In</button>
            </div>
        
        }
      </Arwes>
    </SoundsProvider>
  </ThemeProvider>;
};

export default App;
