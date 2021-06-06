<template>
    <v-card>
        <v-toolbar color="primary" dark>직원 등록</v-toolbar>
        <v-card-text>
            <br />
            <h3>* 필수항목</h3>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field
                            label="*아이디"
                            required
                            outlined
                            v-model="userId"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field
                            label="*이름"
                            required
                            outlined
                            v-model="userName"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="userBirth"
                                    label="생년월일"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    outlined
                                ></v-text-field>
                            </template>

                            <v-date-picker
                                v-model="userBirth"
                                :active-picker.sync="activePicker"
                                :max="new Date().toISOString().substr(0, 10)"
                                min="1950-01-01"
                                @change="save"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6" md="8">
                        <v-text-field
                            label="*주소"
                            required
                            outlined
                            v-model="userAddr"
                        ></v-text-field>
                        <!-- <div>
                            <pre v-if="userAddr">{{ userAddr['address'] }}</pre>
                        </div> -->
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-btn
                            color="primary"
                            @click="isOpen = true"
                            x-large
                            class="btnm"
                        >
                            주소찾기
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6" md="8">
                        <v-text-field
                            label="*이메일"
                            required
                            outlined
                            v-model="userEmail"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-select
                            :items="['Y', 'N']"
                            label="사용여부*"
                            required
                            outlined
                            v-model="useYN"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
                등록
            </v-btn>
            <v-btn color="blue darken-1" text @click="$emit('closeModal')">
                닫기
            </v-btn>
        </v-card-actions>
        <v-dialog
            v-model="isOpen"
            persistent
            max-width="600px"
            transition="dialog-bottom-transition"
        >
            <vue-daum-postcode @complete="onComplete" />
        </v-dialog>
    </v-card>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import { VueDaumPostcodePluginOptions } from 'vue-daum-postcode';
import { VueDaumPostcode } from 'vue-daum-postcode';
@Component({
    name: 'SignUp',
    components: {
        VueDaumPostcode,
    },
})
export default class SignUp extends Vue {
    picker = false;
    //age: number = 37;
    activePicker = '';
    userBirth = null;
    userId = '';
    userName = '';
    userAddr = '';
    userAddr2 = '';
    userEmail = '';
    useYN = '';
    menu = false;
    isOpen = false;
    @Watch('menu')
    public selectedWatch(val: string): void {
        val && setTimeout(() => (this.activePicker = 'YEAR'));
    }
    save(date: string): void {
        (this.$refs.menu as HTMLFormElement).save(date);
    }
    onComplete(result: any): void {
        console.log(result['address']);

        this.userAddr = result['address'];
        this.isOpen = false;
    }
    //openAddr(): void {}
}
</script>

<style></style>
