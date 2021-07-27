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
        <router-view></router-view>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Drawer from '@/components/common/drawer.vue';
export default Vue.extend({
    name: 'Home',
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
