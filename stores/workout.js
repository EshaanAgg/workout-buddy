import { Permission, Role } from "appwrite";
import { defineStore, acceptHMRUpdate } from "pinia";
import { useGlobalStore } from "./global";
import { useAccountStore } from "./account";
import api from "@/api";

/* 
All the actions in this store automatically fetch/add the the documents for the current user due to creation of a session with Appwrite
Thus you can directly use these from the pages without worrying about the current user
*/

export const useWorkoutStore = defineStore("workout", {
  state: () => ({
    workouts: [],
  }),
  actions: {
    async getWorkout(documentID) {
      try {
        const Server = useRuntimeConfig().public;
        const data = await api.getDocument(
          Server.databaseID,
          Server.workoutCollectionID,
          documentID
        );
        return data;
      } catch (e) {
        console.log("Could not fetch document ", e);
        const globalStore = useGlobalStore();
        globalStore.setError({
          show: true,
          message: "Failed to fetch the workout.",
        });
      }
    },
    async fetchWorkouts() {
      try {
        const Server = useRuntimeConfig().public;
        const data = await api.listDocuments(
          Server.databaseID,
          Server.workoutCollectionID
        );
        this.workouts = data.documents;
      } catch (e) {
        console.log("Could not fetch documents ", e);
        const globalStore = useGlobalStore();
        globalStore.setError({
          show: true,
          message: "Failed to fetch workouts",
        });
      }
    },
    async addWorkout(data) {
      try {
        const accountStore = useAccountStore();
        const Server = useRuntimeConfig().public;
        const userID = accountStore.account["$id"];

        const response = await api.createDocument(
          Server.databaseID,
          Server.workoutCollectionID,
          data,
          [
            Permission.read(Role.user(userID)),
            Permission.write(Role.user(userID)),
          ]
        );
        this.workouts.push(response);
        return response;
      } catch (e) {
        console.log("Could not create document", e);
        const globalStore = useGlobalStore();
        globalStore.setError({
          show: true,
          message: "Failed to create this workout." + e,
        });
      }
    },
    async deleteWorkout(documentID) {
      try {
        const Server = useRuntimeConfig().public;
        await api.deleteDocument(
          Server.databaseID,
          Server.workoutCollectionID,
          documentID
        );
        this.workouts = this.workouts.filter(
          (document) => document["$id"] !== documentID
        );
      } catch (e) {
        console.log("Could not delete document", e);
        const globalStore = useGlobalStore();

        globalStore.setError({
          show: true,
          message: "Failed to delete Workout",
        });
      }
    },
    async updateWorkout({ documentID, data }) {
      try {
        const accountStore = useAccountStore();
        const Server = useRuntimeConfig().public;
        const userID = accountStore.account["$id"];

        const response = await api.updateDocument(
          Server.databaseID,
          Server.workoutCollectionID,
          documentID,
          data,
          [
            Permission.read(Role.user(userID)),
            Permission.write(Role.user(userID)),
          ]
        );
        const index = this.workouts.findIndex(
          (doc) => doc["$id"] === response["$id"]
        );
        if (index !== -1) this.workouts.splice(index, 1, response);
      } catch (e) {
        console.log("Could not update document", e);
        const globalStore = useGlobalStore();
        globalStore.setError({
          show: true,
          message: "Failed to updated Workout",
        });
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWorkoutStore, import.meta.hot));
}
