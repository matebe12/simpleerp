<template>
    <v-container class="spacing-playground pa-6" fluid>
        <div class="spacing-playground pa-6 ma-2 menu-route">
            <v-icon>mdi-folder</v-icon> 메뉴관리 > 메뉴등록
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
                        <span class="headline px-4 pt-4 pb-3">메뉴 관리</span>
                    </v-flex>
                    <span class="Subtitle3 px-4 pt-4 pb-3 subtitleCode">
                        페이지의 메뉴를 등록 및 수정 합니다.</span
                    >
                </v-layout>
            </v-card>
        </v-container>
        <v-layout wrap>
            <v-flex mb-5 xs12>
                <v-card>
                    <v-card-title> </v-card-title>
                    <v-card-text>
                        <v-draggable-treeview v-model="items" group="hoge">
                            <!-- eslint-disable-next-line vue/no-unused-vars -->
                            <template v-slot:prepend="{ item }">
                                <v-icon>mdi-folder</v-icon>
                            </template>
                            <template v-slot:label="{ item }">
                                <span class="primary--text">{{
                                    item.MENU_NM
                                }}</span>
                            </template>
                            <template v-slot:append="{ item }">
                                <template
                                    v-if="
                                        item.children != null &&
                                            item.children.length > 0
                                    "
                                >
                                    has {{ item.children.length }} children
                                </template>
                            </template>
                        </v-draggable-treeview>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VuetifyDraggableTreeview from 'vuetify-draggable-treeview';
import { getMenuList } from '@/axios/menu';

@Component({
    name: 'menuman',
    components: { VuetifyDraggableTreeview },
})
export default class Menu extends Vue {
    items = [
        {
            id: 1,
            name: 'Central League',
            children: [
                { id: 101, name: 'Dragons' },
                { id: 102, name: 'Tigers' },
            ],
        },
        {
            id: 2,
            name: 'Pacific League',
            children: [
                {
                    id: 201,
                    name: 'Lions',
                    children: [
                        { id: 203, name: 'Lions Minor' },
                        {
                            id: 204,
                            name: 'Lions third',
                            children: [
                                { id: 2041, name: 'Lions Minor Second' },
                            ],
                        },
                    ],
                },
            ],
        },
    ];
    async created(): Promise<void> {
        try {
            let result = await getMenuList({ MENU_NO: 'menu000000000' });
            console.log(result.data.data['getMenuList']['result']);
            let item = result.data.data['getMenuList']['result'];
            this.items = item;
        } catch (error) {
            console.error(error);
        }
    }
}
</script>
