import Vue from 'vue';
import Vuex from 'vuex';

import employee from '@/store/modules/employee';

Vue.use(Vuex);

console.log(employee);

export default new Vuex.Store({
    modules: {
        employee,
    },
});
