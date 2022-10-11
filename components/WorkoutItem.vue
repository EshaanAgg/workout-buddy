<script setup>
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useWorkoutStore } from "@/stores/workout";
import { useGlobalStore } from "@/stores/global";

const workoutStore = useWorkoutStore();
const globalStore = useGlobalStore();

const error = computed(() => globalStore.error);
const props = defineProps({
  workout: {
    type: Object,
    default: () => ({
      $id: "test1234",
      title: "Test Workout",
      load: 10,
      reps: 10,
      createdAt: Date.now(),
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    }),
  },
});

const handleDelete = async (workout) => {
  await workoutStore.deleteWorkout(workout["$id"]);
};
</script>

<template>
  <div class="workout-details">
    <h4>{{ props.workout.title }}</h4>
    <p><strong>Load (kg): </strong> {{ props.workout.load }}</p>
    <p><strong>Reps: </strong> {{ props.workout.reps }}</p>
    <p>Watch tutorial <a :href="props.workout.link">here</a></p>
    <p>
      {{
        formatDistanceToNow(new Date(props.workout.createdAt), {
          addSuffix: true,
        })
      }}
    </p>
    <span class="material-symbols-outlined" @click="handleDelete(props.workout)"
      >delete</span
    >
    <div class="error" v-if="error.show">{{ error.message }}</div>
  </div>
</template>
