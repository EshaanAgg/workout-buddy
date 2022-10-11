<script setup>
import { useWorkoutStore } from "@/stores/workout";
import { useGlobalStore } from "@/stores/global";

const workoutStore = useWorkoutStore();
const globalStore = useGlobalStore();

const globalError = computed(() => globalStore.error);

const title = ref("");
const load = ref(10);
const reps = ref(10);
const link = ref("");

let error = computed(() => {
  var messages = [];
  if (title === "") messages.push("The title can't be blank. ");
  if (load < 0) messages.push("The load can't be negative. ");
  if (reps < 0) messages.push("The number of reps can't be negative. ");
  if (link === "") messages.push("The tutorial link can't be blank. ");
  return messages;
});

const handleSubmit = async () => {
  if (error.length === 0) {
    const workout = {
      title: title.value,
      load: load.value,
      reps: reps.value,
      link: link.value,
      createdAt: Date.now(),
    };
    await workoutStore.addWorkout(workout);
  }
};
</script>

<template>
  <form className="create" @submit.prevent="handleSubmit">
    <h3>Add a New Workout</h3>

    <label>Excersize Title:</label>
    <input type="text" :value="title" :class="title === '' ? 'error' : ''" />

    <label>Load (in kg):</label>
    <input type="number" :value="load" :class="load < 0 ? 'error' : ''" />

    <label>Reps:</label>
    <input type="number" :value="reps" :class="reps < 0 ? 'error' : ''" />

    <label>Tutorial Link:</label>
    <input type="url" :value="link" :class="link === 0 ? 'error' : ''" />

    <button @click="handleSubmit">Add Workout</button>

    <div v-if="error || globalError.show" class="error">
      {{ error }} {{ globalError.message }}
    </div>
  </form>
</template>
