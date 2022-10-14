<template>
</template>

<script setup>
import { useAccountStore } from "@/stores/account"
const accountStore = useAccountStore();
await accountStore.fetchAccount();

if (accountStore.account) await navigateTo("/workouts");
else await navigateTo("/login");
</script>