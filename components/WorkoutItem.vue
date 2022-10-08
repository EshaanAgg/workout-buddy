<script>
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default defineNuxtComponent({
  props: {
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
  },
  setup() {
    [deleteWorkout] = [...mapActions(["deleteWorkout"])];

    const handleDelete = (workout) => {
      deleteWorkout(workout["$id"]);
    };
  },
});
</script>

<template>
  <div class="workout-details">
    <h4>{{ workout.title }}</h4>
    <p><strong>Load (kg): </strong> {{ workout.load }}</p>
    <p><strong>Reps: </strong> {{ workout.reps }}</p>
    <p>Watch tutorial <a :href="workout.link">here</a></p>
    <p>
      {{
        formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })
      }}
    </p>
    <span class="material-symbols-outlined" @click="handleDelete(workout)"
      >delete</span
    >
  </div>
</template>
