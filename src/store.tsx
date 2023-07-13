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
}

const useStore = create<Recipes>((set) => ({
  recipes: [],
  getRecipes: async () => {
    const response = await axios.get<[]>("https://api.punkapi.com/v2/beers?page=1");
    const newArray = response.data.map(
      ({ id, name, brewers_tips, image_url }) => {
        return { id, name, brewers_tips, image_url };
      }
    );
    console.log(newArray);
    set({ recipes: newArray });
  },
  deleteItem: (id: number) => {
    set((state) => ({
      recipes: state.recipes.filter((item: { id: number }) => item.id !== id),
    }));
  },
}));

export default useStore;
