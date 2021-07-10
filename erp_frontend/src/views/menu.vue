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
                        <v-treeview
                            v-model="selected"
                            :open="initiallyOpen"
                            :items="getNodes(items)"
                            activatable
                            item-key="name"
                            open-on-click
                        >
                            <template v-slot:label="{ item }">
                                <div class="v-treeview-node__label">
                                    <span>{{ item.name }}</span>
                                    <v-btn
                                        class="mx-2 mb-1"
                                        dark
                                        x-small
                                        color="error"
                                        @click.stop="deleteMenu(item)"
                                        v-if="item.order == 1"
                                    >
                                        {{ item['ORDER'] }}
                                        <v-icon dark>
                                            mdi-minus
                                        </v-icon>
                                    </v-btn>
                                    <v-btn
                                        class="mx-2 mb-1"
                                        dark
                                        x-small
                                        color="primary"
                                        @click="openCodeModal(1, false)"
                                        v-if="item.order == 1"
                                    >
                                        <v-icon dark>
                                            mdi-plus
                                        </v-icon>
                                    </v-btn>
                                </div>
                            </template>
                            <template v-slot:prepend="{ item, open }">
                                <v-icon v-if="item.children.length > 0">
                                    {{
                                        open ? 'mdi-folder-open' : 'mdi-folder'
                                    }} </v-icon
                                ><v-icon v-else>
                                    {{ 'mdi-language-html5' }}
                                </v-icon>
                            </template>
                        </v-treeview>
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
    selected = [];
    items = [];
    initiallyOpen = ['public'];
    async created(): Promise<void> {
        try {
            let result = await getMenuList({ MENU_NO: 'menu000000000' });
            console.log(result.data.data['getMenuList']);
            let item = result.data.data['getMenuList'];
            this.items = item;
            this.getNodes(this.items);
        } catch (error) {
            console.error(error);
        }
    }
    getNodes(items: any): any {
        return items.map(item => {
            let itemList = {
                id: item['MENU_NO'],
                name: item['MENU_NM'],
                order: item['ORDER'],
                children: item.children ? this.getNodes(item.children) : [],
            };
            return itemList;
        });
    }
    deleteMenu(): void {
        console.log('gg');
    }
}
</script>
