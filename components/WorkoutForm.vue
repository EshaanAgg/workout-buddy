<script setup>
import { useWorkoutStore } from "@/stores/workout";
import { useGlobalStore } from "@/stores/global";

const globalStore = useGlobalStore();

const globalError = computed(() => globalStore.error);

const title = ref("");
const load = ref(0);
const reps = ref(0);
const link = ref("");

const handleSubmit = async () => {
  console.log("Function called");
    const workout = {
      title: title.value,
      load: load.value,
      reps: reps.value,
      link: link.value,
      createdAt: new Date(Date.now()).toLocaleString(),
    };
    const workoutStore = useWorkoutStore();
    await workoutStore.addWorkout(workout);
};

</script>

<template>
  <form className="create" @submit.prevent="handleSubmit">
    <h3>Add a New Workout</h3>

    <label>Excersize Title:</label>
    <input type="text" v-model.trim="title" :class="title === '' ? 'error' : ''" />

    <label>Load (in kg):</label>
    <input type="number" v-model="load" :class="load < 0 ? 'error' : ''" />

    <label>Reps:</label>
    <input type="number" v-model="reps" :class="reps < 0 ? 'error' : ''" />

    <label>Tutorial Link:</label>
    <input type="url" v-model.trim="link" :class="link === '' ? 'error' : ''" />

    <button>Add Workout</button>

    <div v-if="globalError?.show" class="error">
       {{ globalError?.message }}
    </div>
  </form>
</template>