import { FC, useState, useEffect } from "react";
import useStore from "./store";
import "./App.css";

interface Recipe {
  id: number;
  name: string;
  brewers_tips: string;
  image_url: string;
}

interface Recipes {
  recipes: Recipe[];
  getCurrent: (id: number) => void;
  deleteCurrent: (id: number) => void;
}

const App: FC<Recipes> = () => {
  const [current, setCurrent] = useState(null as null | Recipe);

  const { recipes, getRecipes, deleteItem } = useStore();

  const getCurrent = (id: number) => {
    const recipe = recipes.find((item) => item.id === id);
    if (recipe !== undefined) {
      setCurrent(recipe);
    }
  };
  console.log(current);

  const deleteCurrent = (id: number) => {
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
};

export default App;
