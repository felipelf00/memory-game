import { useState, useEffect } from "react";
import "./App.css";

function App() {
  return (
    <>
      <h1>Cat:</h1>
      <ShowCats />
    </>
  );
}

async function makeCat() {
  const name = getCatName();
  const data = await getCatData();
  return { name, data };
}

function getCatName() {
  let name;

  do {
    name = catNames[Math.floor(Math.random() * catNames.length)];
  } while (catList.some((obj) => obj.name === name));

  return name;
}

let catList = [];

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
];

//get unique cat
async function getCatData() {
  let found = false;
  let catData = null;
  do {
    const response = await fetch(
      "https://api.giphy.com/v1/gifs/random?api_key=3IXGJRYgTecwybY6on1Ilu2f2vrvslQT&tag=cat&rating=g"
    );
    catData = await response.json();
    if (!catList.some((cat) => cat.data.id === catData.data.id)) {
      found = true;
    }
  } while (found === false);

  // console.log("getting cat: ");
  // console.log(catData);

  return catData;
}

function Cat(cat) {
  return (
    <div className="cat-card">
      <img src={cat.data.data.images.fixed_height_downsampled.url} />
      <p>{cat.name}</p>
    </div>
  );
}

function ShowCats() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    populateCatList(4);
  }, []);

  async function populateCatList(count) {
    const newCats = [];

    for (let i = 0; i < count; i++) {
      const cat = await makeCat();
      newCats.push(cat);
    }

    setCats(newCats);
  }

  console.log("list of cats:");
  console.log(cats);

  return (
    <div>
      {cats.map((cat) => {
        console.log(cat.name);
        console.log(cat.data.data.id);
        return <Cat key={cat.data.data.id} {...cat} />;
      })}
    </div>
  );
}

//testing only
// function ShowCat() {
//   const [catData, setCatData] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       const response = await fetch(
//         "https://api.giphy.com/v1/gifs/search?api_key=3IXGJRYgTecwybY6on1Ilu2f2vrvslQT&q=cat&limit=12&offset=0&rating=g&lang=en&bundle=messaging_non_clips"
//       );
//       const catData = await response.json();
//       setCatData(catData);
//       console.log(catData);
//     }
//     fetchData();
//   }, []);

//   return (
//     <div>
//       {catData ? (
//         catData.data.map((cat) => (
//           <img key={cat.id} src={cat.images.fixed_height_downsampled.url} />
//         ))
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

export default App;
