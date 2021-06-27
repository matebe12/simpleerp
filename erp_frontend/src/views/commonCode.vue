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
                            <v-btn
                                class="mx-2 mb-1"
                                dark
                                color="primary"
                                @click="openCodeModal(1)"
                            >
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
                                <tr v-for="(item, index) in code1" :key="index">
                                    <td>
                                        <v-radio-group
                                            v-model="selectCode1"
                                            @change="
                                                getCodeList(item.CODE_ID, 2)
                                            "
                                        >
                                            <v-radio :value="item"></v-radio>
                                        </v-radio-group>
                                    </td>
                                    <td class="text-center">
                                        {{ item.CODE_ID }}
                                    </td>
                                    <td class="text-center">
                                        {{ item.CODE_NM }}
                                    </td>
                                    <td class="text-center">
                                        {{ item.USE_YN }}
                                    </td>
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
                                <v-btn
                                    class="mx-2 mb-1"
                                    color="error"
                                    :disabled="!isTwo"
                                >
                                    <v-icon dark>
                                        mdi-minus
                                    </v-icon>
                                </v-btn>
                                <v-btn
                                    class="mx-2 mb-1"
                                    color="primary"
                                    :disabled="!isTwo"
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
                                    <tr
                                        v-for="(item, index) in code2"
                                        :key="index"
                                    >
                                        <td>
                                            <v-radio-group
                                                v-model="selectCode2"
                                                @change="
                                                    getCodeList(item.CODE_ID, 3)
                                                "
                                            >
                                                <v-radio
                                                    :value="item"
                                                ></v-radio>
                                            </v-radio-group>
                                        </td>
                                        <td class="text-center">
                                            {{ item.CODE_ID }}
                                        </td>
                                        <td class="text-center">
                                            {{ item.CODE_NM }}
                                        </td>
                                        <td class="text-center">
                                            {{ item.USE_YN }}
                                        </td>
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
                                <v-btn
                                    class="mx-2 mb-3"
                                    color="error"
                                    :disabled="!isThird"
                                >
                                    <v-icon dark>
                                        mdi-minus
                                    </v-icon>
                                </v-btn>
                                <v-btn
                                    class="mx-2 mb-3"
                                    color="primary"
                                    :disabled="!isThird"
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
                                    <tr
                                        v-for="(item, index) in code3"
                                        :key="index"
                                    >
                                        <td>
                                            <v-radio-group
                                                v-model="selectCode3"
                                            >
                                                <v-radio
                                                    :value="item"
                                                ></v-radio>
                                            </v-radio-group>
                                        </td>
                                        <td class="text-center">
                                            {{ item.CODE_ID }}
                                        </td>
                                        <td class="text-center">
                                            {{ item.CODE_NM }}
                                        </td>
                                        <td class="text-center">
                                            {{ item.USE_YN }}
                                        </td>
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
            <CodeModal
                ref="codeModal"
                v-if="dialog"
                @closeModal="dialog = !dialog"
                :selectCode="selectCode"
                :isUpdate="isUpdate"
                :level="level"
            />
        </v-dialog>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CodeModal from '@/components/code/codeModal.vue';
import { getCodeList, getCodeOne } from '@/axios/code';
@Component({
    name: 'commoncode',
    components: {
        CodeModal,
    },
})
export default class CommonCode extends Vue {
    code = '';
    selectCode1 = {};
    selectCode2 = {};
    selectCode3 = {};
    isUpdate = false;
    dialog = false;
    level = 0;
    code1 = [];
    code2 = [];
    code3 = [];
    isThird = false;
    isTwo = false;
    openCodeModal(level: number): void {
        this.level = level;
        this.dialog = true;
    }
    async getCodeList(parent: string, level: number): Promise<void> {
        try {
            console.log(parent);

            const result = await getCodeList({ PARENT_CODE: parent });
            console.log(result.data.data.getCodeList);
            switch (level) {
                case 1:
                    this.code1 = result.data.data.getCodeList;
                    this.isTwo = false;
                    this.isThird = false;
                    break;
                case 2:
                    this.code2 = [];
                    this.code3 = [];
                    this.code2 = result.data.data.getCodeList;
                    this.isTwo = true;
                    this.isThird = false;
                    break;
                case 3:
                    this.code3 = result.data.data.getCodeList;
                    this.isThird = true;
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    }
    async created(): Promise<void> {
        this.getCodeList('root', 1);
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
