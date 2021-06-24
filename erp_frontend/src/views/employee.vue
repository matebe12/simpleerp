<template>
    <v-container class="spacing-playground pa-6" fluid>
        <h1>직원관리</h1>
        <v-card outlined class="spacing-playground pa-6" fluid>
            <v-row align="center" justify="center" class="inputfield">
                <v-col cols="12" sm="6" md="2">
                    <v-text-field
                        label="아이디"
                        outlined
                        v-model="userId"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                    <v-text-field
                        label="이름"
                        outlined
                        v-model="userNm"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                    <v-text-field
                        label="이메일"
                        outlined
                        v-model="userEmail"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                    <v-select
                        v-model="useYN"
                        :items="items"
                        label="사용여부"
                        outlined
                    ></v-select>
                </v-col>
                <v-row align="end" justify="end" class="btnArea">
                    <v-btn color="error" @click="reset" x-large class="btnm">
                        초기화
                    </v-btn>
                    <v-btn
                        color="primary"
                        @click.prevent="searchEmployee"
                        x-large
                        class="btnm"
                    >
                        검색
                    </v-btn>
                </v-row>
            </v-row>
        </v-card>
        <v-container class="spacing-playground pa-6" fluid>
            <v-row align="end" justify="end" class="btnArea">
                <h2>total : {{ totalCnt }}</h2>
                <v-spacer />
                <v-btn color="error" @click="reset" x-large class="btnm">
                    비밀번호 초기화
                </v-btn>
                <v-btn
                    color="primary"
                    @click="onSelectId('', false)"
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
                        <tr
                            v-for="(item, index) in employee"
                            :key="index"
                            @click="onCheckUser(item)"
                        >
                            <td>
                                <v-checkbox
                                    v-model="selected"
                                    :value="item"
                                ></v-checkbox>
                            </td>

                            <td class="text-center">
                                <a
                                    href="javascript:void(0);"
                                    class="userId"
                                    @click="onSelectId(item.USER_ID, true)"
                                    >{{ item.USER_ID }}</a
                                >
                            </td>
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
            <SignupModal
                ref="employeeModal"
                v-if="dialog"
                @closeModal="dialog = !dialog"
                @searchEmployee="searchEmployee"
                :selectUserId="this.selectUserId"
                :isUpdate="this.isUpdate"
            />
        </v-dialog>
        <div class="text-center">
            <v-pagination
                v-model="page"
                :length="getTotalPage"
                :total-visible="10"
                @input="searchEmployee($event)"
            ></v-pagination>
        </div>
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
    get getTotalPage(): number {
        return Math.ceil(this.totalCnt / 10);
    }
    totalCnt = 0;
    userId = '';
    userNm = '';
    userEmail = '';
    useYN = '';
    page = 1;
    dialog = false;
    valid = true;
    allSelected = false;
    selectUserId = '';
    isUpdate = false;
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
    onCheckUser(user: Employees): void {
        //console.log(this.selected.indexOf(user));
        let index = this.selected.indexOf(user);
        if (index == -1) this.selected.push(user);
        else this.selected.splice(index, 1);
    }
    async onSelectId(id: string, isUpdate: boolean): Promise<void> {
        this.selectUserId = id;
        this.isUpdate = isUpdate;
        //if (isUpdate) {
        // await this.$store.dispatch(
        //     'getEmployeeOneAction',
        //     this.selectUserId
        // );
        //}
        this.dialog = !this.dialog;
    }
    async searchEmployee(n: number): Promise<void> {
        try {
            console.log(this.page);

            const req = {
                USER_ID: this.userId,
                USER_NM: this.userNm,
                USER_EMAIL: this.userEmail,
                USE_YN: this.useYN,
                PAGE: this.page == 1 ? 0 : (this.page - 1) * 10,
            };
            const result = await getEmployee(req);
            this.selected = [];
            this.allSelected = false;
            this.employee = result.data.data.getEmployee.Employee;
            this.totalCnt = result.data.data.getEmployee.TotalCnt;
        } catch (error) {
            console.log(error);
        }
    }
    async created(): Promise<void> {
        await this.searchEmployee(0);
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
.userId {
    text-decoration-line: none;
    color: black;
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
