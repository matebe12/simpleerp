import Vue from 'vue';
import Vuex from 'vuex';

import employee from '@/store/modules/employee';
import loading from '@/store/modules/loading';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        employee,
        loading,
    },
});
