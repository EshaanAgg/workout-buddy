<script setup>
import { useWorkoutStore } from "@/stores/workout";

const workoutStore = useWorkoutStore();
const workouts = computed(() => workoutStore.workouts);
workoutStore.fetchWorkouts();
</script>

<template>
  <div class="home">
    <div v-if="workouts.length!=0">
      <div class="workouts">
        <div v-for="workout in workouts" :key="workout['$id']">
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
