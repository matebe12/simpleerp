<template>
    <v-app>
        <v-main>
            <transition name="modal" v-if="$store.state.loading.loading">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <v-container
                            fluid
                            fill-height
                            style="background-color: rgba(33, 33, 33, 0.1);"
                        >
                            <v-layout justify-center align-center>
                                <v-progress-circular
                                    indeterminate
                                    color="primary"
                                >
                                </v-progress-circular>
                            </v-layout>
                        </v-container>
                    </div>
                </div>
            </transition>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
//import Drawer from '@/components/common/drawer.vue';
export default Vue.extend({
    name: 'App',
    components: {
        //Drawer,
    },
});
</script>

<style scoped>
@import './assets/css/common.css';
</style>
