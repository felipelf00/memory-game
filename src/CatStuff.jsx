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

    if (props.clickedCats.includes(props.data.data.id)) {
      //logic for losing game
      console.log("you lose");
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

export default function ShowCats({ incrementCounter }) {
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
        found = true;
      }
    } while (found === false);

    return catData;
  }

  // async function makeCat() {
  //   const data = await getCatData();
  //   const name = "Loading cat...";
  //   return { name, data };
  // }

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

  // async function populateCatList(count) {
  //   const newCats = [];

  //   for (let i = 0; i < count; i++) {
  //     const cat = await makeCat();
  //     newCats.push(cat);
  //   }

  //   nameCats(newCats);
  //   setCats(newCats);
  // }

  async function populateCatList(count) {
    setIsLoading(true);
    const newCats = [];

    for (let i = 0; i < count; i++) {
      let cat = null;
      while (cat === null) {
        cat = await makeCat();
      }
      newCats.push(cat);
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
          <img src="./src/images/loading.gif" />
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
            />
          );
        })
      )}
    </div>
  );
}
