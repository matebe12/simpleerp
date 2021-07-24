<template>
    <v-container fluid>
        <h1>직원관리</h1>
        <v-card outlined class="spacing-playground pa-6" fluid>
            <div class="searchform">
                <div class="searchform">
                    <span class="search-label">아이디</span>
                    <v-text-field
                        outlined
                        dense
                        v-model="userId"
                        hide-details
                    ></v-text-field>
                </div>
                <div class="searchform">
                    <span class="search-label">이름</span>
                    <v-text-field
                        outlined
                        dense
                        v-model="userNm"
                        hide-details
                    ></v-text-field>
                </div>
                <div class="searchform">
                    <span class="search-label">이메일</span>

                    <v-text-field
                        outlined
                        dense
                        v-model="userEmail"
                        hide-details
                    ></v-text-field>
                </div>
                <div class="searchform">
                    <span class="search-label">사용여부</span>

                    <v-select
                        v-model="useYN"
                        :items="items"
                        dense
                        outlined
                        hide-details
                    ></v-select>
                </div>
                <div>
                    <v-btn
                        color="#2C2E3E"
                        @click.prevent="searchEmployee"
                        elevation="2"
                        dense
                        class="btnm"
                    >
                        검색
                    </v-btn>
                </div>
            </div>
        </v-card>
        <v-container class="spacing-playground pa-6" fluid>
            <v-row align="end" justify="end" class="btnArea">
                <h2>total : {{ totalCnt }}</h2>
                <v-spacer />
                <v-btn color="#730000" @click="reset" class="btnm">
                    비밀번호 초기화
                </v-btn>
                <v-btn
                    color="#2C2E3E"
                    @click="onSelectId('', false)"
                    class="btnm  btn"
                >
                    등록
                </v-btn>
            </v-row>

            <v-data-table
                :headers="headers"
                :items="employee"
                hide-default-footer
                class="elevation-1"
                v-model="selected"
                item-key="USER_ID"
                show-select
            >
                <template v-slot:[`item.USER_ID`]="{ item }">
                    <a
                        href="javascript:void(0);"
                        class="userId"
                        @click="onSelectId(item.USER_ID, true)"
                        >{{ item.USER_ID }}</a
                    >
                </template>
                <template v-slot:no-data>
                    <v-btn color="primary">
                        Reset
                    </v-btn>
                </template>
            </v-data-table>
        </v-container>
        <modal
            name="bar"
            draggable=".window-header"
            :width="600"
            height="auto"
            :adaptive="true"
        >
            <SignupModal
                ref="employeeModal"
                class="window-header"
                @closeModal="closeModal"
                @searchEmployee="searchEmployee"
                :selectUserId="this.selectUserId"
                :isUpdate="this.isUpdate"
            />
        </modal>
        <!-- <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
            transition="dialog-bottom-transition"
        >
            <SignupModal
                ref="employeeModal"
                v-if="dialog"
                @closeModal="closeModal"
                @searchEmployee="searchEmployee"
                :selectUserId="this.selectUserId"
                :isUpdate="this.isUpdate"
            />
        </v-dialog> -->
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
    useYN = '전체';
    page = 1;
    dialog = false;
    valid = true;
    allSelected = false;
    selectUserId = '';
    isUpdate = false;
    items = ['전체', '사용', '미사용'];
    selected: any = [];
    employee: Employees[] = [];
    headers = [
        {
            text: '아이디',
            align: 'center',
            value: 'USER_ID',
        },
        { text: '이름', value: 'USER_NM' },
        { text: '이메일', value: 'USER_EMAIL' },
        { text: '사용 여부', value: 'USE_YN' },
        { text: '생년월일', value: 'USER_BIRTH' },
        { text: '주소', value: 'USER_ADDRESS' },
        { text: '생성자', value: 'CREATED_NO' },
        { text: '생성일', value: 'CREATED_DT' },
    ];
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
    // onCheckUser(user: Employees): void {
    //     //console.log(this.selected.indexOf(user));
    //     let index = this.selected.indexOf(user);
    //     if (index == -1) this.selected.push(user);
    //     else this.selected.splice(index, 1);
    // }

    async onSelectId(id: string, isUpdate: boolean): Promise<void> {
        this.selectUserId = id;
        this.isUpdate = isUpdate;
        //if (isUpdate) {
        // await this.$store.dispatch(
        //     'getEmployeeOneAction',
        //     this.selectUserId
        // );
        //}
        this.$modal.show('bar');
    }
    closeModal(): void {
        console.log('fcjkhcjkchnjk');

        this.$modal.hide('bar');
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
.searchform {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

.search-label {
    font-weight: bold;
    margin-right: 1em;
}

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
.search-col {
    height: 50px;
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

input[type='text'] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
}
</style>
