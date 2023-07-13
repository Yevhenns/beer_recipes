import { useState, useEffect } from "react";
import useStore from "./store";
import "./App.css";

function App() {
  const [current, setCurrent] = useState(null);

  const getRecipes = useStore((state) => state.getRecipes);
  const recipes = useStore((state) => state.recipes);

  const getCurrent = (id) => {
    const recipe = recipes.find((item) => item.id === id);
    setCurrent(recipe);
  };
  console.log(current);

  useEffect(() => {
    getRecipes();
  }, [getRecipes]);
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "40vw",
          textAlign: "left"         
        }}
      >
        {recipes.map(({ id, name }) => {
          return (
            <div
              style={{ cursor: "pointer", backgroundColor: "grey", height: '20vh' }}
              key={id}
              onClick={() => getCurrent(id)}
            >
              {name}
            </div>
          );
        })}
      </div>
      {current !== null && (
        <div style={{ width: "60vw" }}>
          <p>{current.name}</p>
          <p>{current.brewers_tips}</p>
          <img src={current.image_url} height={200} />
          <button type="button">Delete</button>
        </div>
      )}
    </div>
  );
}

export default App;
