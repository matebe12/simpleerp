<template>
    <v-container class="spacing-playground pa-6" fluid>
        <h1>코드관리</h1>
        <v-card outlined class="spacing-playground pa-6" fluid>
            <v-row align="center" justify="center" class="inputfield">
                <v-col cols="12" sm="6" md="2">
                    <v-text-field
                        label="이름"
                        outlined
                        v-model="name"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                    <v-text-field
                        label="코드"
                        outlined
                        v-model="code"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                    <v-text-field
                        label="생성자"
                        outlined
                        v-model="employee"
                    ></v-text-field>
                </v-col>
                <v-row align="end" justify="end" class="btnArea">
                    <v-btn
                        color="primary"
                        @click.prevent="searchCode"
                        x-large
                        class="btnm"
                    >
                        검색
                    </v-btn>
                </v-row>
            </v-row>
        </v-card>
        <v-container class="spacing-playground pa-6" fluid> </v-container>
        <v-card class="mx-auto">
            <v-sheet class="pa-4 primary lighten-2">
                <v-text-field
                    v-model="search"
                    label="코드 검색.."
                    dark
                    flat
                    solo-inverted
                    hide-details
                    clearable
                    clear-icon="mdi-close-circle-outline"
                ></v-text-field>
                <!-- <v-checkbox
                    v-model="caseSensitive"
                    dark
                    hide-details
                    label="Case sensitive search"
                ></v-checkbox> -->
            </v-sheet>
            <v-card-text>
                <v-treeview
                    :items="items"
                    :search="search"
                    :filter="filter"
                    :open.sync="open"
                >
                </v-treeview>
            </v-card-text>
        </v-card>
        <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
            transition="dialog-bottom-transition"
        >
            <SignupModal
                ref="codeModal"
                v-if="dialog"
                @closeModal="dialog = !dialog"
                @searchCode="searchCode"
                :selectCode="this.selectCode"
                :isUpdate="this.isUpdate"
            />
        </v-dialog>
        <div class="text-center">
            <v-pagination
                v-model="page"
                :length="getTotalPage"
                :total-visible="10"
                @input="searchCode($event)"
            ></v-pagination>
        </div>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    name: 'commoncode',
    components: {},
})
export default class CommonCode extends Vue {
    get getTotalPage(): number {
        return Math.ceil(this.totalCnt / 10);
    }
    filter(item: any, search: any): any {
        return this.caseSensitive
            ? (item: any, search: any, textKey: string | number) =>
                  item[textKey].indexOf(search) > -1
            : undefined;
    }
    page = 1;
    totalCnt = 0;
    name = '';
    code = '';
    selectCode = '';
    employee = '';
    isUpdate = false;
    dialog = false;
    items = [
        {
            id: 1,
            name: '코드 목록',
            children: [
                {
                    id: 2,
                    name: 'Core team',
                    children: [
                        {
                            id: 201,
                            name: 'John',
                        },
                        {
                            id: 202,
                            name: 'Kael',
                        },
                        {
                            id: 203,
                            name: 'Nekosaur',
                        },
                        {
                            id: 204,
                            name: 'Jacek',
                        },
                        {
                            id: 205,
                            name: 'Andrew',
                        },
                    ],
                },
                {
                    id: 3,
                    name: 'Administrators',
                    children: [
                        {
                            id: 301,
                            name: 'Mike',
                        },
                        {
                            id: 302,
                            name: 'Hunt',
                        },
                    ],
                },
                {
                    id: 4,
                    name: 'Contributors',
                    children: [
                        {
                            id: 401,
                            name: 'Phlow',
                        },
                        {
                            id: 402,
                            name: 'Brandon',
                        },
                        {
                            id: 403,
                            name: 'Sean',
                        },
                    ],
                },
            ],
        },
    ];
    open = [1, 2];
    search = null;
    caseSensitive = false;
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
</style>
