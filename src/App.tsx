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
  const [sliceValue, setSliceValue] = useState([0, 15]);
  const [page, setPage] = useState(1);

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

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }
    if (sliceValue[1] !== 25) {
      setSliceValue([sliceValue[0] + 5, sliceValue[1] + 5]);
    } else {
      setPage(page + 1);
      setSliceValue([0, 15]);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const reload = () => {
    setSliceValue([0, 15]);
    setPage(1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    getRecipes(page);
  }, [getRecipes, page]);

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
        {recipes.slice(sliceValue[0], sliceValue[1]).map(({ id, name }) => {
          return (
            <div
              className={selected.includes(id) ? "selected" : ""}
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
        <button onClick={nextPage}>Next page</button>
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
        {page === 14 && <button onClick={reload}>Reload list</button>}
      </div>
    </div>
  );
};

export default App;
