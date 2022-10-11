import { useAccountStore } from "@/stores/account";

export default defineNuxtRouteMiddleware((to, from) => {
  let accountStore = useAccountStore();
  let account = accountStore.account;

  if (to.path.includes("/workouts")) {
    if (!account) return navigateTo("/login");
    return navigateTo(from.path);
  }

  if (to.path == "/signup" || to.path == "/login") {
    if (account) return navigateTo("/workouts");
    return navigateTo(from.path);
  }
});
