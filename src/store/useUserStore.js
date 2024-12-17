import { create } from "zustand";

const useUserStore = create((set) => ({
    records:{},
    setRecord: (records) => 
     set({ records})
}))
export default useUserStore