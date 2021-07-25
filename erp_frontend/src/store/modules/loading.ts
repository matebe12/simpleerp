import { getEmployeeOne } from '@/axios/employeeAPI';
import { ActionTree } from 'vuex';
import { MutationTree } from 'vuex';
export interface State {
    loading: boolean;
}
const state: State = {
    loading: false,
};

const actions: ActionTree<State, any> = {};

const mutations: MutationTree<State> = {
    turn_off: () => {
        state.loading = false;
    },
    turn_on: () => {
        state.loading = true;
    },
};

//let mutations = {};

// state,
// actions,
// mutations,
//getters: {},
export default { state, actions, mutations, getters: {} };
