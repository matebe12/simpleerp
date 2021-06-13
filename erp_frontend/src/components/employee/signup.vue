<template>
    <v-card>
        <v-toolbar color="primary" dark>직원 등록</v-toolbar>
        <v-card-text>
            <br />
            <h3>* 필수항목</h3>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                label="*아이디"
                                required
                                outlined
                                v-model="userId"
                                :rules="validationMixin.idRules"
                                :error-messages="
                                    check ? '중복된 아이디 입니다.' : ''
                                "
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                label="*이름"
                                required
                                outlined
                                v-model="userName"
                                :rules="validationMixin.nameRules"
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
                                    :max="
                                        new Date().toISOString().substr(0, 10)
                                    "
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
                                :rules="validationMixin.emailRules"
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
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        @click="insertEmployee"
                        large
                        class="btnm"
                    >
                        등록
                    </v-btn>
                    <v-btn
                        color="error"
                        @click="$emit('closeModal')"
                        large
                        class="btnm"
                    >
                        닫기
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card-text>
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
import validation from '@/mixin/validation';
import { checkId, insertEmployee } from '@/axios/employeeAPI';

@Component({
    name: 'SignUp',
    components: {
        VueDaumPostcode,
    },
})
export default class SignUp extends Vue {
    validationMixin: any = new validation();
    picker = false;
    //age: number = 37;
    activePicker = '';
    userBirth = null;
    userId = '';
    userName = '';
    userAddr = '';
    userEmail = '';
    useYN = 'Y';
    menu = false;
    isOpen = false;
    valid = true;
    check = 0;
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
    async insertEmployee(): Promise<void> {
        try {
            const req = {
                USER_ID: this.userId,
                USER_NM: this.userName,
                USER_ADDRESS: this.userAddr,
                USER_EMAIL: this.userEmail,
                USER_BIRTH: this.userBirth,
                USE_YN: this.useYN,
            };
            const result = await insertEmployee(req);
        } catch (error) {
            console.error(error);
        }
    }
    @Watch('userId')
    public async checkId(val: string): Promise<any> {
        const result = await checkId({ USER_ID: val });
        this.check = result.data.data.checkId;
        console.log(this.check);
    }
    //openAddr(): void {}
}
</script>

<style></style>
