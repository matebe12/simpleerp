<template>
    <v-app>
        <v-app-bar color="#03a9f3" dense dark app>
            <v-app-bar-nav-icon @click="mini = !mini"></v-app-bar-nav-icon>
        </v-app-bar>
        <v-navigation-drawer
            v-model="drawer"
            :mini-variant.sync="mini"
            permanent
            app
        >
            <v-list-item class="px-2" style="background-color: #03a9f3">
                <v-icon large color="white">mdi-home</v-icon>
                <v-list-item-content>
                    <v-list-item-title class="px-5 title" style="color: white"
                        >BACK International</v-list-item-title
                    >
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense>
                <v-list-group
                    v-for="item in items"
                    :key="item.title"
                    link
                    :prepend-icon="item.icon"
                    no-action
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title
                                v-text="item.title"
                                class="title font-weight-bold"
                                style="padding: 5px;"
                            ></v-list-item-title>
                        </v-list-item-content>
                    </template>

                    <v-list-item
                        v-for="subItem in item.subItems"
                        :key="subItem.title"
                        :to="subItem.to"
                    >
                        <v-list-item-content>
                            <v-list-item-title
                                v-text="subItem.title"
                            ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
            </v-list>
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

export default Vue.extend({
    name: 'App',
    methods: {},
    data: () => ({
        drawer: true,
        items: [
            {
                title: '홈',
                icon: 'mdi-view-dashboard',
                subItems: [
                    {
                        title: 'Dashboard',
                        to: '/',
                    },
                    {
                        title: 'About',
                        to: '/about',
                    },
                ],
            },
            {
                title: '직원메뉴',
                active: true,
                icon: 'mdi-account-circle',
                subItems: [
                    {
                        title: '직원관리',
                        to: '/employee',
                    },
                ],
            },
            {
                title: '코드관리',
                active: true,
                icon: 'mdi-qrcode-remove',
                subItems: [
                    {
                        title: '코드관리',
                        to: '/code',
                    },
                ],
            },
        ],
        mini: true,
    }),
});
</script>

<style scoped>
@import './assets/css/common.css';
</style>
