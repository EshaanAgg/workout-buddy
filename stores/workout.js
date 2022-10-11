import { Role } from "appwrite";
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
    async getWorkout(documentId) {
      try {
        const data = await api.getDocument(documentId);
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
        const data = await api.listDocuments(Server.workoutCollectionID);
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

        const userId = accountStore.account["$id"];
        data.userId = userId;
        const response = await api.createDocument(
          Server.workoutCollectionID,
          data,
          Role.any(),
          [`user:${userId}`]
        );
        // Only the particular user has read and write access to the same
        this.workouts.push(response);
        return response;
      } catch (e) {
        console.log("Could not create document", e);
        const globalStore = useGlobalStore();
        globalStore.setError({
          show: true,
          message: "Failed to this workout group",
        });
      }
    },
  },
  async deleteWorkout(documentId) {
    try {
      await api.deleteDocument(Server.workoutCollectionID, documentId);
      this.workouts = this.workouts.filter(
        (document) => document["$id"] !== documentId
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
  async updateWorkout({ documentId, data }) {
    try {
      const accountStore = useAccountStore();

      const userId = accountStore.account["$id"];
      data.userId = userId;
      const response = await api.updateDocument(
        Server.workoutCollectionID,
        documentId,
        data,
        Role.any(),
        [`user:${userId}`]
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
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWorkoutStore, import.meta.hot));
}
