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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const image = e.target.image.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch("/api/images", {
      method: "POST",
      header: { "Content-Type": "multipart/form-data" },
      body: formData,
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <section>
      <h1>Upload an image</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="image">Choose a image:</label>
        <input id="image" name="image" type="file" accept="image/*" />
        <input type="submit" value="Submit" />
      </form>
    </section>
  );
}

export default App;
