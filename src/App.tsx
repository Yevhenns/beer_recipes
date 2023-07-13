import { useState, useEffect } from "react";
import useStore from "./store";
import "./App.css";

function App() {
  const [current, setCurrent] = useState(null);

  const recipes = useStore((state) => state.recipes);
  const getRecipes = useStore((state) => state.getRecipes);
  const deleteItem = useStore((state) => state.deleteItem);

  const getCurrent = (id) => {
    const recipe = recipes.find((item) => item.id === id);
    setCurrent(recipe);
  };
  console.log(current);

  const deleteCurrent = (id) => {
    deleteItem(id);
    setCurrent(null);
  };

  useEffect(() => {
    getRecipes();
  }, [getRecipes]);
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "40vw",
          textAlign: "left",
        }}
      >
        {recipes.slice(0, 15).map(({ id, name }) => {
          return (
            <div
              style={{
                cursor: "pointer",
                height: "20vh",
                display: "flex",
                // justifyContent: "center",
                alignItems: "center",
              }}
              key={id}
              onClick={() => getCurrent(id)}
            >
              <p>{id}</p>
              <p>{name}</p>
            </div>
          );
        })}
      </div>
      <div style={{ width: "60vw" }}>
        {current !== null && (
          <div>
            <p>{current.name}</p>
            <p>{current.brewers_tips}</p>
            <img src={current.image_url} height={200} />
            <button type="button" onClick={() => deleteCurrent(current.id)}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
