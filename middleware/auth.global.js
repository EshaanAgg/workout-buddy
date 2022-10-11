import { useAccountStore } from "@/stores/account";
import { useGlobalStore } from "@/stores/global";

export default defineNuxtRouteMiddleware((to, from) => {
  let accountStore = useAccountStore();
  let account = computed(() => accountStore.account);

  if (to.path.includes("/workouts")) {
    if (!account) return navigateTo("/login");
    return navigateTo(from.path);
  }

  if (to.path == "/signup" || to.path == "/login") {
    if (account) return navigateTo("/workouts");
    return navigateTo(from.path);
  }

  // The global error must be reset to null every time the page is changed
  let gloabalStore = useGlobalStore();
  gloabalStore.error = null;
});
