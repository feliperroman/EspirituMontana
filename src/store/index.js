import { createStore } from 'vuex'

export default createStore({
    state: {
    viewRoute: null,
    type_user: null,
    route_to_buy: null,
    creditsCard: null,
    current_plan: null,
    paymentNequi: null,
    operations: [],
  },
  mutations: {
    pushCreditCard(state, new_card) {
      try {
        if (new_card !== null) {
          if (state.creditsCard !== null) {
            state.creditsCard.push(new_card)
          } else {
            state.creditsCard = [new_card]
          }

        }
      } catch (error) {
        console.log("pushCreditCard ~ error:", error)
      }
    },
    addCreditCard(state, cards) {
      try {
        state.creditsCard = cards
      } catch (error) {
        console.log("addCreditCard ~ error:", error);
      }
    },
    setBuy(state, route){
      try {
        state.route_to_buy = route
      } catch (error) {
        console.log("setBuy error", error)
        
      }
    },
    viewRouteSet(state, view) {
      try {
        if (view !== null) {
          state.viewRoute = view
        }
      } catch (error) {
        console.log(" viewRouteSet ~ error vuex:", error)
      }
    },
    setTypeUser(state, type_user){
      try {
        if(type_user !== null){
          state.type_user = type_user
        }
      } catch (error) {
        console.log("setTypeUser error:", error)
        
      }
    },
    pushPaymentNequi(state, nequi) {
      try {
        if (nequi !== null) {
          if (state.paymentNequi?.length > 0) {
            state.paymentNequi.push(nequi)
          } else {
            state.paymentNequi = [nequi]
          }
        }
      } catch (error) {
        console.log("pushPaymentNequi ~ error:", error);
      }
    },
  },
  actions: {
    setViewRoute({ commit }, payload) {
      commit('viewRouteSet', payload);
    },
    typeUserSet({ commit }, payload) {
      commit('setTypeUser', payload);
    },
    setRouteBuy({ commit }, payload) {
      commit('setBuy', payload);
    },
    addCreditCard({ commit }, payload) {
      commit("pushCreditCard", payload);
    },
    setCreditsCards({ commit }, payload) {
      commit("addCreditCard", payload);
    },
    addNequi({ commit }, payload) {
      commit("pushPaymentNequi", payload);
    },
  },
  modules: {
  }
})