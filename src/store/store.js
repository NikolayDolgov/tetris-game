import { createStore } from 'vuex';
import { matrix } from '../assets/utils/utils';

const store = createStore({
  state () {
    return {
      count: 0,
      matrixField: matrix,
    }
  },

  mutations: {
    increment (state) {
      state.count++
    },
    сhangeKey (state, newMatrix) {
      state.matrixField = newMatrix
    }
  }
})

export default store