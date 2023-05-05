import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <form>
      <label for="file">Choose a image:</label>
      <input id="file" name="file" type="file" accept="image/*" />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default App;
