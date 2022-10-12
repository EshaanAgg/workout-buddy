<script setup>
import { useWorkoutStore } from "@/stores/workout";
import { useGlobalStore } from "@/stores/global";

const globalStore = useGlobalStore();

const globalError = computed(() => globalStore.error);

const title = ref("");
const load = ref(10);
const reps = ref(10);
const link = ref("");

const error = computed(() => {
  var messages = "";
  if (title.value === "") messages += "The title can't be blank. \n";
  if (load.value < 0) messages += "The load can't be negative. \n";
  if (reps.value < 0) messages += "The number of reps can't be negative. \n";
  if (link.value === "") messages += "The tutorial link can't be blank. \n";
  return messages;
});

const handleSubmit = async () => {
  if (error.length === 0) {
    const workout = {
      title: title.value,
      load: load.value,
      reps: reps.value,
      link: link.value,
      createdAt: getTimestamp(),
    };
    const workoutStore = useWorkoutStore();
    await workoutStore.addWorkout(workout);
  }
};

function getTimestamp() {
  var date = new Date();
	var currentDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
	var currentTime = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
	return currentDate + " " + currentTime;
}
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

    <button @click="handleSubmit" :disabled="!error || !globalError" >Add Workout</button>


    <div v-if="globalError?.show || error" class="error">
       {{ globalError?.message }} {{error}}
    </div>
  </form>
</template>