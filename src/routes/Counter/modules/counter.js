import { createAction, handleAction } from 'vuex-actions'
import * as API from 'apis/counter'

// ------------------------------------
// States
// ------------------------------------
const state = {
  fetching: false,
  counter: 0
}

// ------------------------------------
// Getters
// ------------------------------------
const getters = {
  fetching: state => state.fetching,
  counter: state => state.counter
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const actions = {
  increment: createAction(API.INCREMENT),
  doubleAsync: createAction(API.DOUBLE_ASYNC, API.doubleAsync)
}

// ------------------------------------
// Mutations
// ------------------------------------
const mutations = {
  [API.INCREMENT]: handleAction((state, mutation) => {
    state.counter += 1
  }),

  [API.DOUBLE_ASYNC]: handleAction({
    pending(state) {
      state.fetching = true
    },
    success(state, mutation) {
      state.fetching = false
      state.counter += mutation
    },
    error(state) {
      state.fetching = false
    }
  })
}

export default {
  state,
  getters,
  actions,
  mutations
}
