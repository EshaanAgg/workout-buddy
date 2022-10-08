<script>
export default defineNuxtComponent({
  setup() {
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

    const getAccount = mapGetters(["getAccount"]);
    const [addWorkout, fetchAccount] = [
      ...mapActions(["addWorkout", "fetchAccount"]),
    ];

    const handleSubmit = (e) => {
      e.preventDefault();

      if (error.length === 0) {
        if (!getAccount) fetchAccount();
        const userID = getAccount[$id];
        const workout = {
          title: title.value,
          load: load.value,
          reps: reps.value,
          link: link.value,
          createdAt: Date.now(),
        };
        const read = [`user:${userID}`];
        addWorkout({
          workout,
          read,
          write: read,
        });
      }
    };
  },
});
</script>

<template>
  <form className="create" @submit="handleSubmit">
    <h3>Add a New Workout</h3>

    <label>Excersize Title:</label>
    <input type="text" :value="title" :class="title === '' ? 'error' : ''" />

    <label>Load (in kg):</label>
    <input type="number" :value="load" :class="load < 0 ? 'error' : ''" />

    <label>Reps:</label>
    <input type="number" :value="reps" :class="reps < 0 ? 'error' : ''" />

    <label>Tutorial Link:</label>
    <input type="url" :value="link" :class="link === 0 ? 'error' : ''" />

    <button>Add Workout</button>

    <div v-if="error" class="error">{{ error }}</div>
  </form>
</template>
