<script>
export default defineNuxtComponent({
  computed: mapGetters(["workouts", "getAccount"]),
  methods: {
    ...mapActions(["fetchWorkouts", "fetchAccount"]),
  },

  created() {
    if (!this.getAccount) this.fetchAccount();
    this.fetchTodos();
  },
});
</script>

<template>
  <div class="home">
    <div class="workouts">
      <WorkoutDetails
        v-for="workout in workouts"
        :key="workout[$id]"
        :workout="workout"
      />
    </div>
    <WorkoutForm />
  </div>
</template>
