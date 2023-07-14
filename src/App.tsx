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
  selectItem: (
    e: { nativeEvent: { preventDefault: () => void } },
    id: number
  ) => void;
  deleteSelectedItem: () => void;
}

const App: FC<Recipes> = () => {
  const [current, setCurrent] = useState(null as null | Recipe);
  const [selected, setSelected] = useState([] as [] | { id: number }[]);
  console.log(selected);

  const { recipes, getRecipes, deleteItem, deleteSelected } = useStore();

  const getCurrent = (id: number) => {
    const recipe = recipes.find((item) => item.id === id);
    if (recipe !== undefined) {
      setCurrent(recipe);
    }
    if (current !== null && current.id === id) {
      setCurrent(null);
    }
  };

  const deleteCurrent = (id: number) => {
    deleteItem(id);
    setCurrent(null);
  };

  const selectItem = (
    e: { nativeEvent: { preventDefault: () => void } },
    id: number
  ) => {
    e.nativeEvent.preventDefault();
    if (!selected.includes(id)) {
      setSelected((prev) => [...prev, id]);
    } else {
      const newArr = selected.filter((item) => item !== id);
      setSelected(newArr);
    }
  };

  const deleteSelectedItem = () => {
    deleteSelected(selected);
    setSelected([]);
  };

  useEffect(() => {
    getRecipes();
  }, [getRecipes]);

  useEffect(() => {
    if (!recipes.includes(current)) {
      setCurrent(null);
    }
  }, [current, recipes]);
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
              onContextMenu={(e) => selectItem(e, id)}
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
              Delete current
            </button>
          </div>
        )}
        {selected.length > 0 && (
          <button type="button" onClick={deleteSelectedItem}>
            Delete selected
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
