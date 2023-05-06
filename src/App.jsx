import React, { useEffect } from "react";
import "./App.css";
import { socket } from "./socket.js";

function App() {
  const [images, setImages] = React.useState([
    {
      path: "https://picsum.photos/200/300",
    },
  ]);
  const addImage = (image) => setImages((images) => [image, ...images]);

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
    addImage(data);
    console.log(data);
  };

  return (
    <>
      <section>
        <h1>Upload an image</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="image">Choose a image:</label>
          <input id="image" name="image" type="file" accept="image/*" />
          <input type="submit" value="Submit" />
        </form>
      </section>

      <section>
        <h1>Images</h1>
        {images.map((image) => (
          <figure>
            <img
              key={image.path}
              src={`${image.path}`}
              alt=""
            />
            <figcaption>{image.path}</figcaption>
          </figure>
        ))}
      </section>
    </>
  );
}

export default App;
