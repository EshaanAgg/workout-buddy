import api from "../api";
import { Server } from "../utils/config";

const state = {
  workouts: []
};

const actions = {
  async fetchWorkouts({ commit }) {
    try {
      const data = await api.listDocuments(Server.collectionID);
      commit("setWorkouts", data.documents);
    } catch (e) {
      console.log("Could not fetch documents ", e);
      commit(
        "setError",
        {
          show: true,
          message: "Failed to fetch Workout",
          color: "red",
        },
        { root: true }
      );
    }
  },
  async addWorkout({ commit }, { data, read, write }) {
    try {
      const response = await api.createDocument(
        Server.collectionID,
        data,
        read,
        write
      );
      console.log(response);
      commit("addWorkout", response);
    } catch (e) {
      console.log("Could not create document", e);
      commit(
        "setError",
        {
          show: true,
          message: "Failed to Add Workout",
          color: "red",
        },
        { root: true }
      );
    }
  },
  async updateWorkout({ commit }, { documentId, data, read, write }) {
    try {
      const response = await api.updateDocument(
        Server.collectionID,
        documentId,
        data,
        read,
        write
      );
      commit("updateWorkout", response);
    } catch (e) {
      console.log("Could not update document", e);
      commit(
        "setError",
        {
          show: true,
          message: "Failed to updated Workout",
          color: "red",
        },
        { root: true }
      );
    }
  },
  async deleteWorkout({ commit }, documentId) {
    try {
      await api.deleteDocument(Server.collectionID, documentId);
      commit("deleteWorkout", documentId);
    } catch (e) {
      console.log("Could not delete document", e);
      commit(
        "setError",
        {
          show: true,
          message: "Failed to delete Workout",
          color: "red",
        },
        { root: true }
      );
    }
  },
};

const getters = {
  workouts: (state) => state.workouts,
};

const mutations = {
  setWorkouts: (state, workouts) => (state.workouts = workouts),
  addWorkout: (state, workout) => state.workouts.unshift(workout),
  deleteWorkout: (state, id) => (state.workouts = state.workouts.filter((workout) => workout["$id"] !== id)),
  updateWorkout: (state, updatedWorkout) => {
    const index = state.workouts.findIndex(
      (workout) => workout["$id"] === updatedWorkout["$id"]
    );
    if (index !== -1) state.workouts.splice(index, 1, updatedWorkout);
  }
};

export default {
  state,
  actions,
  getters,
  mutations,
};