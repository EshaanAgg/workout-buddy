import { useAccountStore } from "@/stores/account";

export default defineNuxtRouteMiddleware((to, from) => {
  const accountStore = useAccountStore();
  if (to.path.includes("/workouts") && !accountStore.account) {
    return navigateTo("/login");
  }
});
