import { create } from "zustand";
import axios from "axios";

interface Recipe {
  id: number;
  name: string;
  brewers_tips: string;
  image_url: string;
}
interface Recipes {
  recipes: Recipe[];
  getRecipes: () => Promise<void>;
  deleteItem: (id: number) => void;
  deleteSelected: (arr: [id: number]) => void;
}

const useStore = create<Recipes>((set) => ({
  recipes: [],
  async getRecipes() {
    try {
      const response = await axios.get<[]>(
        "https://api.punkapi.com/v2/beers?page=1"
      );
      const newArray = response.data.map(
        ({ id, name, brewers_tips, image_url }) => {
          return { id, name, brewers_tips, image_url };
        }
      );
      set({ recipes: newArray });
    } catch (e) {
      console.log(e);
    }
  },
  deleteItem(id: number) {
    set((state) => ({
      recipes: state.recipes.filter((item: { id: number }) => item.id !== id),
    }));
  },
  deleteSelected(arr: [id: number]) {
    set((state) => ({
      recipes: state.recipes.filter((item) => !arr.includes(item.id)),
    }));
  },
}));

export default useStore;
