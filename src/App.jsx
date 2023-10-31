import { useEffect } from "react";
import {
  checkPermission,
  registerSW,
  registerNotificationPermission,
} from "./utils/registerSW";
import "./App.css";

import Home from "./components/home/Home";

function App() {
  useEffect(() => {
    checkPermission(), registerSW();
    registerNotificationPermission();
  }, []);

  return (
      <Home />
  );
}

export default App;
