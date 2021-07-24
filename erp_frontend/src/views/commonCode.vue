<template>
    <div>
        <div class="spacing-playground pa-6 ma-2 menu-route">
            <v-icon>mdi-qrcode-remove</v-icon> 코드관리 > 공통코드 관리
        </div>
        <v-container>
            <v-card
                outlined
                class="spacing-playground pa-6"
                fluid
                color="#eeeeee"
            >
                <v-layout column>
                    <v-flex>
                        <span class="headline px-4 pt-4 pb-3"
                            >공통코드 관리</span
                        >
                    </v-flex>
                    <span class="Subtitle3 px-4 pt-4 pb-3 subtitleCode">
                        공통으로 사용하는 코드들을 생성하거나 수정/삭제
                        합니다.</span
                    >
                </v-layout>
            </v-card>
        </v-container>
        <div class="code-area">
            <v-card class="pa-8 ma-8" style="width:500px;">
                <v-layout column>
                    <span class="title pl-2 subject">코드 대분류</span>
                    <v-layout align-center>
                        <v-flex>
                            <span class="Subtitle3" style="color:grey"
                                >- 코드의 최상위 분류</span
                            >
                        </v-flex>
                        <v-btn
                            class="mx-2 mb-3"
                            dark
                            color="#730000"
                            @click="deleteCode(1)"
                        >
                            <v-icon dark>
                                mdi-minus
                            </v-icon>
                        </v-btn>
                        <v-btn
                            class="mx-2 mb-3"
                            dark
                            color="#2C2E3E"
                            @click="openCodeModal(1, false)"
                        >
                            <v-icon dark>
                                mdi-plus
                            </v-icon>
                        </v-btn>
                    </v-layout>
                </v-layout>
                <perfect-scrollbar>
                    <v-data-table
                        :headers="headers"
                        :items="code1"
                        hide-default-footer
                        class="elevation-1"
                        item-key="CODE_ID"
                        height="320px"
                    >
                        <template v-slot:[`item`]="{ item }">
                            <tr>
                                <td>
                                    <v-radio-group
                                        v-model="selectCode1"
                                        @change="getCodeList(item.CODE_ID, 2)"
                                    >
                                        <v-radio :value="item"></v-radio>
                                    </v-radio-group>
                                </td>
                                <td class="text-center">
                                    <a
                                        href="javascript:void(0)"
                                        @click="openCodeModal(1, true, item)"
                                        >{{ item.CODE_ID }}</a
                                    >
                                </td>
                                <td class="text-center">
                                    {{ item.CODE_NM }}
                                </td>
                                <td class="text-center">
                                    {{ item.USE_YN }}
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                </perfect-scrollbar>
            </v-card>
            <v-card class="pa-8 ma-8" style="width:500px;">
                <v-layout column>
                    <span class="title pl-2 subject">코드 중분류</span>
                    <v-layout align-center>
                        <v-flex>
                            <span class="Subtitle3" style="color:grey"
                                >- 코드 분류</span
                            >
                        </v-flex>
                        <v-btn
                            class="mx-2 mb-3"
                            color="#730000"
                            :disabled="!isTwo"
                            @click="deleteCode(2)"
                        >
                            <v-icon dark>
                                mdi-minus
                            </v-icon>
                        </v-btn>
                        <v-btn
                            class="mx-2 mb-3"
                            color="#2C2E3E"
                            :disabled="!isTwo"
                            @click="openCodeModal(2, false)"
                        >
                            <v-icon dark>
                                mdi-plus
                            </v-icon>
                        </v-btn>
                    </v-layout>
                </v-layout>
                <perfect-scrollbar>
                    <v-data-table
                        :headers="headers"
                        :items="code2"
                        hide-default-footer
                        class="elevation-1"
                        item-key="CODE_ID"
                        height="320px"
                    >
                        <template v-slot:[`item`]="{ item }">
                            <tr>
                                <td>
                                    <v-radio-group
                                        v-model="selectCode2"
                                        @change="getCodeList(item.CODE_ID, 3)"
                                    >
                                        <v-radio :value="item"></v-radio>
                                    </v-radio-group>
                                </td>
                                <td class="text-center">
                                    <a
                                        href="javascript:void(0)"
                                        @click="openCodeModal(2, true, item)"
                                        >{{ item.CODE_ID }}</a
                                    >
                                </td>
                                <td class="text-center">
                                    {{ item.CODE_NM }}
                                </td>
                                <td class="text-center">
                                    {{ item.USE_YN }}
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                </perfect-scrollbar>
            </v-card>
            <v-card class="pa-8 ma-8" style="width:500px;">
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
                            color="#730000"
                            :disabled="!isThird"
                            @click="deleteCode(3)"
                        >
                            <v-icon dark>
                                mdi-minus
                            </v-icon>
                        </v-btn>
                        <v-btn
                            class="mx-2 mb-3"
                            color="#2C2E3E"
                            :disabled="!isThird"
                            @click="openCodeModal(3, false)"
                        >
                            <v-icon dark>
                                mdi-plus
                            </v-icon>
                        </v-btn>
                    </v-layout>
                </v-layout>
                <perfect-scrollbar>
                    <v-data-table
                        :headers="headers"
                        :items="code3"
                        hide-default-footer
                        class="elevation-1"
                        item-key="CODE_ID"
                        height="320px"
                    >
                        <template v-slot:[`item`]="{ item }">
                            <tr>
                                <td>
                                    <v-radio-group v-model="selectCode3">
                                        <v-radio :value="item"></v-radio>
                                    </v-radio-group>
                                </td>
                                <td class="text-center">
                                    <a
                                        href="javascript:void(0)"
                                        @click="openCodeModal(3, true, item)"
                                        >{{ item.CODE_ID }}</a
                                    >
                                </td>
                                <td class="text-center">
                                    {{ item.CODE_NM }}
                                </td>
                                <td class="text-center">
                                    {{ item.USE_YN }}
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                </perfect-scrollbar>
            </v-card>
            <modal
                name="bar"
                draggable=".window-header"
                :width="600"
                height="auto"
                :adaptive="true"
            >
                <CodeModal
                    ref="codeModal"
                    class="window-header"
                    @closeModal="closeModal"
                    @getCodeList="getCodeList"
                    :selectCode="selectCode"
                    :isUpdate="isUpdate"
                    :level="level"
                    :updatecode="updatecode"
                    persistent
                />
            </modal>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CodeModal from '@/components/code/codeModal.vue';
import { getCodeList, deleteCode } from '@/axios/code';
import { isEmpty } from '@/util/util';
@Component({
    name: 'commoncode',
    components: {
        CodeModal,
    },
})
export default class CommonCode extends Vue {
    items = ['Group Item #1', 'Group Item #2', 'Group Item #3'];
    index = 1;
    updatecode = {};
    selectCode = {};
    selectCode1: any = [];
    selectCode2: any = {};
    selectCode3: any = {};
    isUpdate = false;
    dialog = false;
    level = 0;
    code1 = [];
    code2 = [];
    code3 = [];
    isThird = false;
    isTwo = false;
    headers = [
        { text: '선택', value: '선택' },
        {
            text: '코드',
            align: 'center',
            value: 'CODE_ID',
        },
        { text: '이름', value: 'CODE_NM' },
        { text: '사용 여부', value: 'USE_YN' },
    ];

    closeModal(): void {
        this.$modal.hide('bar');
    }

    openCodeModal(level: number, isUpdate: boolean, CODE_ID: string): void {
        if (level == 2) this.selectCode = this.selectCode1;
        if (level == 3) this.selectCode = this.selectCode2;
        isUpdate ? (this.isUpdate = true) : (this.isUpdate = false);
        if (CODE_ID) this.updatecode = CODE_ID;
        this.level = level;
        this.$modal.show('bar');
    }
    async getCodeList(parent: string, level: number): Promise<void> {
        try {
            const result = await getCodeList({ PARENT_CODE: parent });

            switch (level) {
                case 1:
                    this.code1 = result.data.data.getCodeList;
                    this.isTwo = false;
                    this.isThird = false;
                    break;
                case 2:
                    this.selectCode2 = {};
                    this.selectCode3 = {};
                    this.code2 = result.data.data.getCodeList;

                    this.isTwo = true;
                    break;
                case 3:
                    this.selectCode3 = {};
                    this.code3 = result.data.data.getCodeList;
                    this.isThird = true;
                    break;
            }
        } catch (error) {
            alert(error);
        }
    }
    async deleteCode(level: number): Promise<any> {
        let enter: boolean;

        if (level == 1 && isEmpty(this.selectCode1['CODE_ID'])) {
            alert('삭제할 코드를 선택해주세요.');
            return false;
        } else if (level == 2 && isEmpty(this.selectCode2['CODE_ID'])) {
            alert('삭제할 코드를 선택해주세요.');
            return false;
        } else if (level == 3 && isEmpty(this.selectCode3['CODE_ID'])) {
            alert('삭제할 코드를 선택해주세요.');
            return false;
        }
        enter = confirm('해당 코드를 삭제 하시겠습니까?');
        if (enter) {
            try {
                let req = { CODE_ID: '' };
                if (level == 1) req.CODE_ID = this.selectCode1['CODE_ID'];
                else if (level == 2) req.CODE_ID = this.selectCode2['CODE_ID'];
                else req.CODE_ID = this.selectCode3['CODE_ID'];
                let result = await deleteCode(req);
                if (
                    Object.prototype.hasOwnProperty.call(result.data, 'errors')
                ) {
                    alert(result.data.errors[0]['message']);
                } else {
                    if (level == 1) this.getCodeList('root', level);
                    else if (level == 2)
                        this.getCodeList(
                            this.selectCode2['PARENT_CODE'],
                            level
                        );
                    else
                        this.getCodeList(
                            this.selectCode3['PARENT_CODE'],
                            level
                        );
                }
            } catch (error) {
                alert(error);
            }
        }
    }
    async created(): Promise<void> {
        this.getCodeList('root', 1);
    }
    mounted(): void {
        console.log(2);
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
.menu-route {
    width: 100%;
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
a {
    color: black;
}
.code-area {
    display: flex;
    justify-content: center !important;
    align-items: center !important;
}
</style>
