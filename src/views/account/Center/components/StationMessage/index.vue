<template>
    <div style="margin-top: 24px;">
        <j-tabs tab-position="left">
            <j-tab-pane v-for="item in tabs" :key="item.key" :tab="item.tab"><NotificationRecord /></j-tab-pane>
        </j-tabs>
    </div>
</template>

<script lang="ts" setup>
import NotificationRecord from './components/NotificationRecord/index.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const tabs = [
    {
        key: '1',
        tab: t('components.StationMessage.index.5rmxrscb5n00')
    },
    {
        key: '2',
        tab: t('components.StationMessage.index.5rmxrscb7840')
    },
    {
        key: '3',
        tab: t('components.StationMessage.index.5rmxrscb7ho0')
    }
]
</script>