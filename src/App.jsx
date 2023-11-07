import { useState, useEffect } from "react";
import "./App.css";

function App() {
  return (
    <>
      <h1>Cat:</h1>
      <ShowCat />
    </>
  );
}

function makeCat() {
  return {
    name: "bil",
    url: null,
    id: null,
  };
}

function ShowCat() {
  const [catData, setCatData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://api.giphy.com/v1/gifs/search?api_key=3IXGJRYgTecwybY6on1Ilu2f2vrvslQT&q=cat&limit=12&offset=0&rating=g&lang=en&bundle=messaging_non_clips"
      );
      const catData = await response.json();
      setCatData(catData);
      console.log(catData);
    }
    fetchData();
  }, []);

  return (
    <div>
      {catData ? (
        catData.data.map((cat) => (
          <img key={cat.id} src={cat.images.fixed_height_downsampled.url} />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
