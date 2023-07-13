import { create } from "zustand";
import axios from "axios";

const useStore = create((set) => ({
  recipes: [],
  getRecipes: async () => {
    const response = await axios.get("https://api.punkapi.com/v2/beers?page=1");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    set({ recipes: response.data });
  },
  deleteItem: (id) => {
    set((state) => ({
      recipes: state.recipes.filter((item) => item.id !== id),
    }));
  },
}));

export default useStore;
