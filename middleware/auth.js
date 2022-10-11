import { useAccountStore } from "@/stores/account";
import { useGlobalStore } from "@/stores/global";

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log("In middleware");

  const globalStore = useGlobalStore();
  globalStore.error = null;

  if (to.path.includes("/workouts")) {
    const accountStore = useAccountStore();
    const account = await accountStore.getAccount();
    if (!account) return navigateTo("/login");
  }

  if (to.path == "/signup" || to.path == "/login") {
    const accountStore = useAccountStore();
    const account = await accountStore.getAccount();
    if (account) return navigateTo("/workouts");
  }
});
