/* 
Global store
Would be using this to only store the error object
*/
import { defineStore, acceptHMRUpdate } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    /*
  error is an object with the following properties:
    - show : Boolean : To control the visibility of the error
    - message : The error message
  */
    error: {},
  }),
  actions: {
    setError: function (error) {
      this.error = error;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot));
}
