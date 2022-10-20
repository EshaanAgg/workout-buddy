import { defineStore, acceptHMRUpdate } from "pinia";
import { useGlobalStore } from "./global";
import api from "@/api/index";

export const useAccountStore = defineStore("account", {
  state: () => ({
    account: null,
  }),
  actions: {
    signup: async function ({ email, password, name }) {
      try {
        const account = await api.createAccount(email, password, name);
        await api.createSession(email, password);
        this.account = account;
      } catch (e) {
        console.log("Error creating Account", e);
        const globalStore = useGlobalStore();
        globalStore.setError({
          show: true,
          message: e.message,
        });
      }
    },
    fetchAccount: async function () {
      try {
        const account = await api.getAccount();
        this.account = account;
      } catch (e) {
        console.log("Error getting Account", e);
      }
    },
    login: async function ({ email, password }) {
      try {
        await api.createSession(email, password);
        const account = await api.getAccount();
        this.account = account;
      } catch (e) {
        console.log("Error creating Session", e);
        const globalStore = useGlobalStore();
        globalStore.setError({
          show: true,
          message: e.message,
        });
      }
    },
    logout: async function () {
      try {
        await api.deleteCurrentSession();
        this.account = null;
        await navigateTo("/login");
      } catch (e) {
        console.log("Error deleting session");
        const globalStore = useGlobalStore();
        globalStore.setError({
          show: true,
          message: `Failed to logout. Deatiled error message : ${e.message}`,
        });
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccountStore, import.meta.hot));
}
