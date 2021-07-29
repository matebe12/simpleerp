<template>
    <v-app>
        <v-app-bar color="#2c2e3e" dense dark app>
            <h3>Simple ERP</h3>
        </v-app-bar>
        <v-container
            fluid
            class="login-container"
            fill-height
            :style="{
                'background-image':
                    'url(' + require('../assets/image/ERP_picture.jpeg') + ')',
            }"
        >
            <v-container>
                <v-layout justify-center align-center>
                    <form @submit.prevent="" form>
                        <v-row>
                            <v-col>
                                <v-card class="mx-auto" max-width="400">
                                    <v-toolbar
                                        color="#2C2E3E"
                                        dark
                                        class="window-header"
                                        >로그인</v-toolbar
                                    >
                                    <v-form ref="form">
                                        <v-container>
                                            <v-col>
                                                <v-text-field
                                                    label="아이디"
                                                    required
                                                    outlined
                                                    v-model="userId"
                                                    hide-details
                                                ></v-text-field>
                                            </v-col>
                                            <v-col>
                                                <v-text-field
                                                    label="비밀번호"
                                                    required
                                                    outlined
                                                    v-model="userPw"
                                                    :append-icon="
                                                        show
                                                            ? 'mdi-eye'
                                                            : 'mdi-eye-off'
                                                    "
                                                    :type="
                                                        show
                                                            ? 'text'
                                                            : 'password'
                                                    "
                                                    @mousedown="show = !show"
                                                    :rules="[
                                                        rules.required,
                                                        rules.min,
                                                    ]"
                                                ></v-text-field>
                                            </v-col>
                                            <v-row>
                                                <v-col>
                                                    <v-btn
                                                        width="100%"
                                                        dark
                                                        color="#2C2E3E"
                                                        >로그인</v-btn
                                                    >
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-form>
                                </v-card>
                            </v-col>
                        </v-row>
                    </form>
                </v-layout>
            </v-container>
        </v-container>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
    name: 'login',
    components: {},
})
export default class Employee extends Vue {
    userId = '';
    userPw = '';
    show = true;
    rules = {
        required: (value: any) => !!value || 'Required.',
        min: (v: string | any[]) => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => `The email and password you entered don't match`,
    };
}
</script>

<style scoped>
.login-container {
    background-color: #f5f6f7;
    background-size: cover;
}
</style>
