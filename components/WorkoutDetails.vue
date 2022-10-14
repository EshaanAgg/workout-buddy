<script setup>
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useWorkoutStore } from "@/stores/workout";

const props = defineProps({
  workout: {
    type: Object,
    default: () => ({
      $id: "test1234",
      title: "Test Workout",
      load: 10,
      reps: 10,
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    }),
  },
});

const handleDelete = async (workout) => {
  console.log("delete");
  const workoutStore = useWorkoutStore();
  workoutStore.deleteWorkout(workout["$id"]);
}

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
    },
  ]
})
</script>

<template>
  <div class="workout-details">
    <h4>{{ props.workout.title }}</h4>
    <p><strong>Load (kg): </strong> {{ props.workout.load }}</p>
    <p><strong>Reps: </strong> {{ props.workout.reps }}</p>
    <p>Watch tutorial <a :href="props.workout.link">here</a></p>
    <p>
      {{
        formatDistanceToNow(new Date(props.workout["$createdAt"]), {
          addSuffix: true,
        })
      }}
    </p>
    <span class="material-icons" @click="handleDelete(props.workout)"
      >delete</span
    >
  </div>
</template>
