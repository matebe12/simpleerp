<template>
    <div>
        <v-list-item class="px-2" style="background-color: #2c2e3e">
            <v-icon large color="white">mdi-home</v-icon>
            <v-list-item-content>
                <v-list-item-title class="px-5 title" style="color: #eeeeee"
                    >BACK International</v-list-item-title
                >
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
            <v-list-group
                v-for="item in items"
                :key="item.MENU_NM"
                link
                :prepend-icon="item.MENU_ICON"
                no-action
            >
                <template v-slot:prepend>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-icon v-on="on" color="yellow">place</v-icon>
                        </template>
                        tooltip text
                    </v-tooltip>
                </template>
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title
                            v-text="item.MENU_NM"
                            class="title font-weight-bold"
                            style="padding: 5px; color:#eeeeee;"
                        ></v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item
                    v-for="subItem in item.children"
                    :key="subItem.MENU_NM"
                    :to="subItem.MENU_URL"
                >
                    <v-list-item-content>
                        <v-list-item-title
                            v-text="subItem.MENU_NM"
                            style="padding: 5px; color:white;"
                        ></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
        </v-list>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getMenuList } from '@/axios/menu';

export default Vue.extend({
    name: 'App',
    methods: {
        getCode() {
            console.log('dfkjdhkj');
            return 'mdi-view-dashboard';
        },
        getNodes(items: any): any {
            return items.map(item => {
                let itemList = {
                    id: item['MENU_NO'],
                    name: item['MENU_NM'],
                    children: item.children ? this.getNodes(item.children) : [],
                };
                return itemList;
            });
        },
    },
    async created(): Promise<void> {
        try {
            let result = await getMenuList({ MENU_NO: 'menu000000000' });
            //console.log(result.data.data['getMenuList']['result']);
            let item = result.data.data['getMenuList'];
            this.items = item;

            this.getNodes(this.items);
        } catch (error) {
            console.error(error);
        }
    },

    data: () => ({
        drawer: true,
        items: [],
        mini: true,
    }),
});
</script>

<style scoped>
@import '../../assets/css/common.css';
</style>
