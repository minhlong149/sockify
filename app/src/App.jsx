import React, { useEffect } from "react";
import { socket } from "./socket.js";
import "./App.css";

function App() {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <form>
      <label htmlFor="file">Choose a image:</label>
      <input id="file" name="file" type="file" accept="image/*" />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default App;
