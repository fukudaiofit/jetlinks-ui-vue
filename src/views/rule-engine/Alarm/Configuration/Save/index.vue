<template>
    <page-container>
        <j-card>
            <j-tabs :activeKey="activeKey" @change="changeTabs">
                <j-tab-pane key="1" :tab="t('Configuration.Save.index.5rg42qgd0no0')">
                    <Base v-if="activeKey === '1'" />
                </j-tab-pane>
                <j-tab-pane key="2" :tab="t('Configuration.Save.index.5rg42qgd1u80')">
                    <Scene></Scene>
                </j-tab-pane>
                <j-tab-pane key="3" :tab="t('Configuration.Save.index.5rg42qgd2040')">
                    <Log v-if="activeKey === '3'" />
                </j-tab-pane>
            </j-tabs>
        </j-card>
    </page-container>
</template>

<script lang="ts" setup>
import Base from './Base/index.vue';
import Scene from './Scene/index.vue';
import Log from './Log/indev.vue';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute();
const changeTabs = (e: any) => {
    if (route.query?.id) {
        activeKey.value = e;
    } else {
        message.error(t('Configuration.Save.index.5rg42qgd24w0'));
    }
};
const activeKey = ref('1');
</script>
<style lang="less" scoped>
</style>