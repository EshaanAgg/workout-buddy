<template>
    <h3>Landing Page....</h3>
</template>

<script setup>
import { useAccountStore } from "@/stores/account";
const accountStore = useAccountStore();
const user = computed(() => accountStore.account)
if (user) await navigateTo('/workouts');
else await navigateTo('/login');
</script>