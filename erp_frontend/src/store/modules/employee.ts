import { getEmployeeOne } from '@/axios/employeeAPI';
import { ActionTree } from 'vuex';
import { MutationTree } from 'vuex';
export interface State {
    USER_ID: '';
    USER_NM: '';
    USER_ADDRESS: '';
    USER_BIRTH: '';
    USER_EMAIL: '';
    USE_YN: '';
}
const state: State = {
    USER_ID: '',
    USER_NM: '',
    USER_ADDRESS: '',
    USER_BIRTH: '',
    USER_EMAIL: '',
    USE_YN: '',
};

const actions: ActionTree<State, any> = {
    async getEmployeeOneAction(store: any, userId: string): Promise<void> {
        try {
            const result = await getEmployeeOne({ USER_ID: userId });
            const value = result.data.data.getEmployeeOne[0];
            store.commit('getEmployeeOneMutation', value);
        } catch (error) {
            console.error(error);
        }
    },
};

const mutations: MutationTree<State> = {
    getEmployeeOneMutation(state: any, employee: any): void {
        state.USER_ID = employee['USER_ID'];
        state.USER_NM = employee['USER_NM'];
        state.USER_ADDRESS = employee['USER_ADDRESS'];
        state.USER_BIRTH = employee['USER_BIRTH'];
        state.USER_EMAIL = employee['USER_EMAIL'];
        state.USE_YN = employee['USE_YN'];
    },
};

//let mutations = {};

// state,
// actions,
// mutations,
//getters: {},
export default { state, actions, mutations, getters: {} };
