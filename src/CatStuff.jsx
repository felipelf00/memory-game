import { useState, useEffect } from "react";

let catNames = [
  "Steve",
  "Broccoli",
  "Bil",
  "Sabina",
  "Frederico",
  "Josefina",
  "Twelves",
  "Renato",
  "Shelby",
  "Garbanzo",
  "Tiffany",
  "Margaret",
  "Stanley",
  "Potate",
  "Conrado",
  "Miranda",
  "Clifton MacNamara",
  "Batatinha",
  "Ronaldo",
];

// let catNames = ["Steve", "Broccoli", "Bil", "Sabina"];

function Cat(cat) {
  return (
    <div className="cat-card">
      <img src={cat.data.data.images.fixed_height_downsampled.url} />
      <p>{cat.name}</p>
    </div>
  );
}

export default function ShowCats() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    populateCatList(4);
  }, []);

  function nameCats(cats) {
    let availableCatNames = catNames.slice();
    cats.forEach((cat) => {
      const newName = availableCatNames.splice(
        Math.floor(Math.random() * availableCatNames.length),
        1
      );
      cat.name = newName;
    });
  }

  //get unique cat
  async function getCatData() {
    let found = false;
    let catData = null;
    do {
      const response = await fetch(
        "https://api.giphy.com/v1/gifs/random?api_key=3IXGJRYgTecwybY6on1Ilu2f2vrvslQT&tag=cat&rating=g"
      );
      catData = await response.json();
      if (!cats.some((cat) => cat.data.data.id === catData.data.id)) {
        found = true;
      }
    } while (found === false);

    return catData;
  }

  async function makeCat() {
    const data = await getCatData();
    // const name = getCatName();
    const name = "Loading cat...";
    return { name, data };
  }

  async function populateCatList(count) {
    const newCats = [];

    for (let i = 0; i < count; i++) {
      const cat = await makeCat();
      newCats.push(cat);
    }

    // newCats.forEach(cat => cat.name = giveCatName())
    nameCats(newCats);

    setCats(newCats);
  }

  console.log("list of cats:");
  console.log(cats);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function shuffleCats() {
    const newCatArray = shuffleArray([...cats]);
    setCats(newCatArray);
  }

  return (
    <div>
      {cats.map((cat) => {
        // console.log(cat.name);
        // console.log(cat.data.data.id);
        return <Cat key={cat.data.data.id} {...cat} />;
      })}
      <button onClick={shuffleCats}>Shuffle</button>
    </div>
  );
}
