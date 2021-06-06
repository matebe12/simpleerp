<template>
    <v-container class="spacing-playground pa-6" fluid>
        <h1>직원관리</h1>
        <v-card outlined class="spacing-playground pa-6" fluid>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-row align="center" justify="center" class="inputfield">
                    <v-col cols="12" sm="6" md="2">
                        <v-text-field label="아이디" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="2">
                        <v-text-field label="이름" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="2">
                        <v-text-field label="이메일" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="2">
                        <v-select
                            v-model="select"
                            :items="items"
                            label="사용여부"
                            outlined
                        ></v-select>
                    </v-col>
                    <v-row align="end" justify="end" class="btnArea">
                        <v-btn
                            color="error"
                            @click="reset"
                            x-large
                            class="btnm"
                        >
                            초기화
                        </v-btn>
                        <v-btn
                            color="primary"
                            @click.prevent="searchEmployee"
                            @click="reset"
                            x-large
                            class="btnm"
                        >
                            검색
                        </v-btn>
                    </v-row>
                </v-row>
            </v-form>
        </v-card>
        <v-container class="spacing-playground pa-6" fluid>
            <v-row align="end" justify="end" class="btnArea">
                <v-btn color="error" @click="reset" x-large class="btnm">
                    비밀번호 초기화
                </v-btn>
                <v-btn
                    color="primary"
                    @click="dialog = !dialog"
                    x-large
                    class="btnm"
                >
                    등록
                </v-btn>
            </v-row>
            <v-simple-table
                fixed-header
                height="500px"
                class="overflow-y-auto elevation-1"
                dense
            >
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th style="width:2%">
                                <v-checkbox
                                    v-model="allSelected"
                                    @click="selectAll"
                                ></v-checkbox>
                            </th>
                            <th class="text-center" style="width:5%">
                                아이디
                            </th>
                            <th class="text-center" style="width:5%">
                                이름
                            </th>
                            <th class="text-center" style="width:10%">
                                이메일
                            </th>
                            <th class="text-center" style="width:5%">
                                사용여부
                            </th>
                            <th class="text-center" style="width:5%">
                                생년월일
                            </th>
                            <th class="text-center" style="width:10%">
                                주소
                            </th>
                            <th class="text-center" style="width:5%">
                                생성자
                            </th>
                            <th class="text-center" style="width:5%">
                                생성일
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in employee" :key="item.USER_ID">
                            <td>
                                <v-checkbox
                                    v-model="selected"
                                    :value="item"
                                ></v-checkbox>
                            </td>

                            <td class="text-center">{{ item.USER_ID }}</td>
                            <td class="text-center">{{ item.USER_NM }}</td>
                            <td class="text-center">{{ item.USER_EMAIL }}</td>
                            <td class="text-center">{{ item.USE_YN }}</td>
                            <td class="text-center">{{ item.USER_BIRTH }}</td>
                            <td class="text-center">{{ item.USER_ADDRESS }}</td>
                            <td class="text-center">{{ item.CREATED_NO }}</td>
                            <td class="text-center">{{ item.CREATED_DT }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-container>
        <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
            transition="dialog-bottom-transition"
        >
            <SignupModal @closeModal="dialog = !dialog" />
        </v-dialog>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SignupModal from '@/components/employee/signup.vue';
import { getEmployee } from '@/axios/employeeAPI';
interface Employees {
    USER_ID: string;
    USER_NM: string;
    USE_YN: string;
    USER_EMAIL: string;
    USER_BIRTH: string;
    USER_ADDRESS: string;
    CREATED_NO: string;
    CREATED_DT: string;
}
@Component({
    name: 'employee',
    components: {
        SignupModal,
    },
})
export default class Employee extends Vue {
    dialog = false;
    valid = true;
    allSelected = false;
    select = '전체';
    items = ['전체', '사용', '미사용'];
    selected: Employees[] = [];
    employee: Employees[] = [];
    selectAll(): void {
        if (this.allSelected) {
            this.selected = this.employee;
        } else {
            this.selected = [];
        }
    }
    validate(): void {
        (this.$refs.form as HTMLFormElement).validate();
    }
    reset(): void {
        (this.$refs.form as HTMLFormElement).reset();
    }
    resetValidation(): void {
        (this.$refs.form as HTMLFormElement).resetValidation();
    }
    async searchEmployee(): Promise<void> {
        try {
            const result = await getEmployee();
            this.selected = [];
            this.allSelected = false;
            this.employee = result.data.data.getEmployee;
        } catch (error) {
            console.log(error);
        }
    }
    async created(): Promise<void> {
        await this.searchEmployee();
    }
}
</script>

<style scoped>
.inputfield {
    margin-top: 1%;
    margin-left: 1%;
    margin-right: 1%;
}
.btnArea {
    margin-bottom: 1%;
    margin-left: 1%;
    margin-right: 1%;
}
.btnm {
    margin-left: 1%;
    margin-right: 1%;
}
::-webkit-scrollbar {
    width: 15px;
}

::-webkit-scrollbar-track {
    background: #e6e6e6;
    border-left: 1px solid #dadada;
}

::-webkit-scrollbar-thumb {
    background: #b0b0b0;
    border: solid 3px #e6e6e6;
    border-radius: 7px;
}

::-webkit-scrollbar-thumb:hover {
    background: black;
}
</style>
