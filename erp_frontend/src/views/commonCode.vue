<template>
    <v-container class="spacing-playground pa-6" fluid>
        <v-card outlined class="spacing-playground pa-6" fluid color="#F8F9FA">
            <v-layout column>
                <v-flex>
                    <span class="headline px-4 pt-4 pb-3">공통코드 관리</span>
                </v-flex>
                <span class="Subtitle3 px-4 pt-4 pb-3 subtitleCode">
                    공통으로 사용하는 코드들을 생성하거나 수정/삭제
                    합니다.</span
                >
            </v-layout>
        </v-card>
        <v-container>
            <v-layout>
                <v-card class="pa-8 ma-8" style="width:500px;">
                    <v-layout column>
                        <span class="title pl-2 subject">코드 대분류</span>
                        <v-layout align-center>
                            <v-flex>
                                <span class="Subtitle3" style="color:grey"
                                    >- 코드의 최상위 분류</span
                                >
                            </v-flex>
                            <v-btn class="mx-2 mb-1" dark color="error">
                                <v-icon dark>
                                    mdi-minus
                                </v-icon>
                            </v-btn>
                            <v-btn class="mx-2 mb-1" dark color="primary">
                                <v-icon dark>
                                    mdi-plus
                                </v-icon>
                            </v-btn>
                        </v-layout>
                    </v-layout>
                    <v-simple-table fixed-header height="500px">
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th style="width:2%"></th>
                                    <th class="text-center" style="width:1%">
                                        코드
                                    </th>
                                    <th class="text-center" style="width:5%">
                                        이름
                                    </th>
                                    <th class="text-center" style="width:5%">
                                        사용여부
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <v-radio></v-radio>
                                    </td>
                                    <td class="text-center">CODE000001</td>
                                    <td class="text-center">최상위코드</td>
                                    <td class="text-center">Y</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card>
                <v-layout column>
                    <v-card class="pa-8 ma-8" max-width="1000px" fluid>
                        <v-layout column>
                            <span class="title pl-2 subject">코드 중분류</span>
                            <v-layout align-center>
                                <v-flex>
                                    <span class="Subtitle3" style="color:grey"
                                        >- 코드 분류</span
                                    >
                                </v-flex>
                                <v-btn class="mx-2 mb-1" color="error" disabled>
                                    <v-icon dark>
                                        mdi-minus
                                    </v-icon>
                                </v-btn>
                                <v-btn
                                    class="mx-2 mb-1"
                                    color="primary"
                                    disabled
                                >
                                    <v-icon dark>
                                        mdi-plus
                                    </v-icon>
                                </v-btn>
                            </v-layout>
                        </v-layout>
                        <v-simple-table fixed-header height="200px" dense>
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th style="width:2%"></th>
                                        <th
                                            class="text-center"
                                            style="width:5%"
                                        >
                                            코드
                                        </th>
                                        <th
                                            class="text-center"
                                            style="width:5%"
                                        >
                                            이름
                                        </th>
                                        <th
                                            class="text-center"
                                            style="width:5%"
                                        >
                                            사용여부
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <v-radio></v-radio>
                                        </td>
                                        <td class="text-center">
                                            CODE000001
                                        </td>
                                        <td class="text-center">
                                            중위코드
                                        </td>
                                        <td class="text-center">Y</td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card>
                    <v-card class="pa-8 ma-8" max-width="1000px" fluid>
                        <v-layout column>
                            <span class="title pl-2 subject">코드 소분류</span>
                            <v-layout align-center>
                                <v-flex>
                                    <span class="Subtitle3" style="color:grey"
                                        >- 코드 값</span
                                    >
                                </v-flex>
                                <v-btn class="mx-2 mb-3" color="error" disabled>
                                    <v-icon dark>
                                        mdi-minus
                                    </v-icon>
                                </v-btn>
                                <v-btn
                                    class="mx-2 mb-3"
                                    color="primary"
                                    disabled
                                >
                                    <v-icon dark>
                                        mdi-plus
                                    </v-icon>
                                </v-btn>
                            </v-layout>
                        </v-layout>
                        <v-simple-table fixed-header height="200px" dense>
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th style="width:2%"></th>
                                        <th
                                            class="text-center"
                                            style="width:5%"
                                        >
                                            코드
                                        </th>
                                        <th
                                            class="text-center"
                                            style="width:5%"
                                        >
                                            이름
                                        </th>
                                        <th
                                            class="text-center"
                                            style="width:5%"
                                        >
                                            사용여부
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <v-radio></v-radio>
                                        </td>
                                        <td class="text-center">
                                            CODE000001
                                        </td>
                                        <td class="text-center">
                                            최하위코드
                                        </td>
                                        <td class="text-center">Y</td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card>
                </v-layout>
            </v-layout>
        </v-container>
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
.flex,
.child-flex > * {
    flex: 0 0 none;
    max-width: 100% !important;
}
.child-flex > *,
.flex {
    flex: 0 0 none !important;
    max-width: 100% !important;
}
.subject {
    border-left: 4px solid #03a9f3;
}
.subtitleCode {
    text-decoration: underline;
}
</style>
