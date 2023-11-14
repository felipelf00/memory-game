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
  "Adalberto",
  "Jackelyne",
];

function Cat(props) {
  function handleClick() {
    props.shuffleCats();
    console.log("Score: " + props.counter);
    if (props.clickedCats.includes(props.data.data.id)) {
      props.gameOver();
    } else {
      props.incrementCounter();
      props.addClickedCat(props.data.data.id);
    }
  }

  return (
    <div className="cat-card" onClick={handleClick}>
      <img src={props.data.data.images.fixed_height_downsampled.url} />
      <p>{props.name}</p>
    </div>
  );
}

export default function ShowCats({ incrementCounter, gameOver, counter }) {
  const [cats, setCats] = useState([]);
  //uses IDs
  const [clickedCats, setClickedCats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function addClickedCat(id) {
    setClickedCats([...clickedCats, id]);
    console.log(clickedCats);
  }

  const catCount = 12;

  useEffect(() => {
    populateCatList(catCount);
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
      if (
        !cats.some((cat) => cat.data.data.id === catData.data.id) &&
        catData.data.images.fixed_height_downsampled.width <= 350
      ) {
        // console.log("example cats[0]:" + cats[0]);
        // console.log("found cat:" + catData.data.id);
        found = true;
      } else {
        // console.log("Duplicate or too wide.");
        // console.log("Id: " + catData.data.id);
        // console.log(
        //   "width: " + catData.data.images.fixed_height_downsampled.width
        // );
      }
    } while (found === false);

    return catData;
  }

  async function makeCat(attempts = 5) {
    for (let i = 0; i < attempts; i++) {
      const data = await getCatData();
      if (!cats.some((cat) => cat.data.data.id === data.data.id)) {
        // Cat is not a duplicate, return it
        return { name: "Loading cat...", data };
      }
    }

    return null;
  }

  async function populateCatList(count) {
    setIsLoading(true);
    const newCats = [];

    // for (let i = 0; i < count; i++) {
    //   let cat = null;
    //   while (cat === null) {
    //     cat = await makeCat();
    //   }
    //   newCats.push(cat);
    // }

    while (newCats.length < count) {
      let newCat = null;
      while (newCat === null) {
        newCat = await makeCat();
      }
      // console.log("newCat: ");
      // console.log(newCat);
      // console.log("newCats: ");
      // console.log(newCats);
      if (!newCats.some((cat) => cat.data.data.id === newCat.data.data.id)) {
        newCats.push(newCat);
      } else {
        console.log("found duplicate!");
      }
    }

    nameCats(newCats);
    setCats(newCats);

    setIsLoading(false);
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
    <div className="card-container">
      {isLoading ? (
        <div className="loading">
          <h3>Loading...</h3>
          <img src="/loading.gif" />
        </div>
      ) : (
        cats.map((cat) => {
          // console.log(cat.name);
          // console.log(cat.data.data.id);
          return (
            <Cat
              key={cat.data.data.id}
              {...cat}
              shuffleCats={shuffleCats}
              incrementCounter={incrementCounter}
              addClickedCat={addClickedCat}
              clickedCats={clickedCats}
              gameOver={gameOver}
              counter={counter}
            />
          );
        })
      )}
    </div>
  );
}
