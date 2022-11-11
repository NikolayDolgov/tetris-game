import { createStore } from 'vuex';
import { matrix } from '../assets/utils/utils';

const store = createStore({
  state () {
    return {
      count: 0,
      matrixField: matrix,
      status: 'Старт',
      score: 0,
    }
  },

  mutations: {
    increment (state) {
      state.count++
    },
    incrementScore (state) {
      state.score++
    },
    сhangeStatus (state, newStatus) {
      state.status = newStatus
    },
    сhangeKey (state, newMatrix) {
      state.matrixField = newMatrix
    }
  }
})

export default store