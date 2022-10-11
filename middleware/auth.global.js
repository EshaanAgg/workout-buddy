import { useAccountStore } from "@/stores/account";
import { useGlobalStore } from "@/stores/global";

export default defineNuxtRouteMiddleware((to, from) => {
  console.log("In middleware");
  let accountStore = useAccountStore();
  let account = computed(() => accountStore.account);

  let globalStore = useGlobalStore();
  globalStore.error = null;

  if (to.path.includes("/workouts")) {
    if (!account) return navigateTo("/login");
  }

  if (to.path == "/signup" || to.path == "/login") {
    if (account) return navigateTo("/workouts");
  }
});
