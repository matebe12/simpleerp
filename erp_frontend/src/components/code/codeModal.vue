<template>
    <v-card>
        <v-toolbar color="primary" dark>코드등록</v-toolbar>
        <v-card-text>
            <br />
            <h3>* 필수항목</h3>
        </v-card-text>
        <v-form ref="form">
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-select
                            v-model="select1"
                            :items="items1"
                            item-text="name"
                            item-value="value"
                            label="대분류"
                            @change="getCodeList(select1, 2)"
                            outlined
                        ></v-select>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                        <v-select
                            :disabled="select1 == '1'"
                            v-model="select2"
                            :items="items2"
                            item-text="name"
                            item-value="value"
                            label="중분류"
                            outlined
                        ></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field
                            label="*코드 아이디"
                            required
                            outlined
                            :readonly="select1 != 1"
                            v-model="codeId"
                            @input="checkCodeId"
                            :error-messages="
                                checkCodeIds && !isUpdate
                                    ? '중복된 아이디 입니다.'
                                    : ''
                            "
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field
                            label="*코드 이름"
                            required
                            outlined
                            v-model="codeNm"
                            @input="checkCodeNm"
                            :error-messages="
                                checkCodeName && !isUpdate
                                    ? '중복된 아이디 입니다.'
                                    : ''
                            "
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
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        @click="insertUpdateCode"
                        large
                        class="btnm"
                        :disabled="!isFullInput"
                    >
                        등록
                    </v-btn>
                    <v-btn color="error" @click="closeModal" large class="btnm">
                        닫기
                    </v-btn>
                </v-card-actions>
            </v-container>
        </v-form>
    </v-card>
</template>

<script lang="ts">
import { Component, Watch, Vue, Prop } from 'vue-property-decorator';
import {
    insertUpdateCode,
    checkCodeId,
    checkCodeName,
    getCodeList,
    getCodeOne,
} from '@/axios/code';
@Component({
    name: 'CodeModal',
})
export default class CodeModal extends Vue {
    @Prop() selectCode!: { type: string; default: '' };
    @Prop() isUpdate!: { type: boolean };
    @Prop() level!: number;
    select1 = '1';
    select2 = '1';
    items1 = [{ name: '입력', value: '1' }];
    items2 = [{ name: '입력', value: '1' }];
    codeId = '';
    codeNm = '';
    useYN = 'Y';
    checkCodeIds = 0;
    checkCodeName = 0;

    closeModal(): void {
        this.$emit('closeModal');
    }
    async created(): Promise<void> {
        if (this.level == 1) {
            this.select1 = '';
            try {
                await this.getCodeList('root', 1);
            } catch (error) {
                console.log(error);
            }
        }
    }

    public async getCodeList(parent_code: any, level: number): Promise<any> {
        console.log(parent_code);

        const result = await getCodeList({ PARENT_CODE: parent_code });
        let list = result.data.data.getCodeList;
        if (level == 1) {
            this.items1 = [{ name: '입력', value: '1' }];
            for (let i = 0; i < list.length; i++) {
                this.items1.push({
                    name: list[i]['CODE_NM'],
                    value: list[i]['CODE_ID'],
                });
            }
        } else if (level == 2) {
            this.items2 = [{ name: '입력', value: '1' }];
            for (let i = 0; i < list.length; i++) {
                this.items2.push({
                    name: list[i]['CODE_NM'],
                    value: list[i]['CODE_ID'],
                });
            }
            const child = await getCodeOne({ CODE_ID: parent_code });
            console.log(child.data.data.getCodeOne[0]['CODE_ID']);

            this.codeId = child.data.data.getCodeOne[0]['CODE_TYPE'];
        }
        console.log(list);
    }

    public async checkCodeId(val: string): Promise<any> {
        const result = await checkCodeId({ CODE_ID: val });
        this.checkCodeIds = result.data.data.checkCodeId;
        console.log(this.checkCodeIds);
    }

    public async checkCodeNm(val: string): Promise<any> {
        const result = await checkCodeName({ CODE_NM: val });
        this.checkCodeName = result.data.data.checkCodeName;
        console.log(this.checkCodeName);
    }

    get isFullInput(): boolean {
        if (
            this.codeId &&
            this.useYN &&
            this.codeNm &&
            this.checkCodeIds == 0 &&
            this.checkCodeName == 0
        )
            return true;
        else return false;
    }

    async insertUpdateCode(): Promise<void> {
        try {
            let parent_code = '';
            if (this.select1 == '1') parent_code = 'root';
            else if (this.select1 != '1' && this.select2 == '1')
                parent_code = this.select1;
            else parent_code = this.select2;

            const req = {
                CODE_ID: this.codeId,
                CODE_NM: this.codeNm,
                PARENT_CODE: parent_code,
                USE_YN: this.useYN,
                IS_UPDATE: this.isUpdate,
            };
            const result = await insertUpdateCode(req);
            if (result.data.data['insertUpdateCode'] == 1) {
                alert('등록 되었습니다.');
                this.$emit('searchEmployee');
            } else {
                alert('등록에 실패하였습니다. 다시 시도해주세요.');
            }
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }
}
</script>
