<script setup>
import { useWorkoutStore } from "@/stores/workout";
import { useGlobalStore } from "@/stores/global";

const workoutStore = useWorkoutStore();
const globalStore = useGlobalStore();

const workouts = computed(() => workoutStore.workouts);
const error = computed(() => globalStore.error);
await workoutStore.fetchWorkouts();

</script>

<template>
  <div class="home">
    <div v-if="error.show" class="error">{{ error.message }}</div>
    <div v-else-if="workouts">
      <div class="workouts">
        <div v-for="workout in workouts" :key="workout[$id]">
        <WorkoutDetails
          :workout="workout"
        />
        </div>
      </div>
    </div>
    <div v-else>No workouts added.</div>
    <WorkoutForm />
  </div>
</template>
