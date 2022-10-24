import { useAccountStore } from "@/stores/account";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const accountStore = useAccountStore();
  await accountStore.fetchAccount();
  const account = computed(() => accountStore.account);
  if (to.path.includes("/workouts") && account === null) {
    return navigateTo("/login");
  }
});
