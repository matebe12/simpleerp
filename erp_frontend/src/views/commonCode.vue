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
        <v-data-table :headers="headers" :items="cosas">
            <template v-slot:[`item.description`]>
                <td>
                    <template>
                        <v-treeview :items="treeItems"></v-treeview>
                    </template>
                </td>
            </template>
        </v-data-table>
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
    headers = [
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'description' },
    ];
    cosas = [
        { name: 'Item1', description: 'description1' },
        { name: 'Item2', description: 'description2' },
    ];
    treeItems = [
        {
            id: 1,
            name: 'Applications :',
            children: [
                {
                    id: 2,
                    name: 'Calendar : app',
                    children: [
                        { id: 2, name: 'Calendar : app' },
                        { id: 3, name: 'Chrome : app' },
                        { id: 4, name: 'Webstorm : app' },
                    ],
                },
                { id: 3, name: 'Chrome : app' },
                { id: 4, name: 'Webstorm : app' },
            ],
        },
        {
            id: 5,
            name: 'Documents :',
            children: [
                {
                    id: 6,
                    name: 'vuetify :',
                    children: [
                        {
                            id: 7,
                            name: 'src :',
                            children: [
                                { id: 8, name: 'index : ts' },
                                { id: 9, name: 'bootstrap : ts' },
                            ],
                        },
                    ],
                },
                {
                    id: 10,
                    name: 'material2 :',
                    children: [
                        {
                            id: 11,
                            name: 'src :',
                            children: [
                                { id: 12, name: 'v-btn : ts' },
                                { id: 13, name: 'v-card : ts' },
                                { id: 14, name: 'v-window : ts' },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: 15,
            name: 'Downloads :',
            children: [
                { id: 16, name: 'October : pdf' },
                { id: 17, name: 'November : pdf' },
                { id: 18, name: 'Tutorial : html' },
            ],
        },
        {
            id: 19,
            name: 'Videos :',
            children: [
                {
                    id: 20,
                    name: 'Tutorials :',
                    children: [
                        { id: 21, name: 'Basic layouts : mp4' },
                        { id: 22, name: 'Advanced techniques : mp4' },
                        { id: 23, name: 'All about app : dir' },
                    ],
                },
                { id: 24, name: 'Intro : mov' },
                { id: 25, name: 'Conference introduction : avi' },
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
