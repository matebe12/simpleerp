<template>
    <v-app>
        <v-app-bar color="#2c2e3e" dense dark app>
            <v-app-bar-nav-icon @click="mini = !mini"></v-app-bar-nav-icon>
        </v-app-bar>
        <v-navigation-drawer
            v-model="drawer"
            :mini-variant.sync="mini"
            permanent
            app
            color="#2c2e3e"
        >
            <Drawer />
        </v-navigation-drawer>
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
import Drawer from '@/components/common/drawer.vue';
export default Vue.extend({
    name: 'App',
    components: {
        Drawer,
    },
    data: () => ({
        drawer: true,
        items: [],
        mini: true,
    }),
});
</script>

<style scoped>
@import './assets/css/common.css';
</style>
