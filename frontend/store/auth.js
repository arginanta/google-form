export const state = () => ({
  accessToken: null,
  refreshToken: null,
  fullname: null
})

// Getters Authenticated
export const getters = {
  authenticated(state) {
    if (state.accessToken) {
      return true
    }
    return false
  }
}

export const mutations = {
  setFullname(state, fullname) {
    state.fullname = fullname
  },
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
  },
  setRefreshToken(state, refreshToken) {
    state.refreshToken = refreshToken
  },
  logout(state) {
    state.fullname = null
    state.accessToken = null
    state.refreshToken = null
  }
}

export const actions = {
  async login({ commit }, payload) {
    const response = await this.$axios.post('/login', payload)
    if (!response) { return false }

    commit('setAccessToken', response.data.accessToken)
    commit('setRefreshToken', response.data.refreshToken)
    commit('setFullname', response.data.fullname)

    return response
  }
}