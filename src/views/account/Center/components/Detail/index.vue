<template>
    <j-modal visible :title="t('components.Detail.index.5rmxl9q904s0')" @cancel="emit('close')">
        <j-descriptions :column="1">
            <j-descriptions-item :label="t('components.Detail.index.5rmxl9q91dc0')">{{ userInfos?.username }}</j-descriptions-item>
            <j-descriptions-item :label="t('components.Detail.index.5rmxl9q91l00')">{{ userInfos?.id }}</j-descriptions-item>
            <j-descriptions-item :label="t('components.Detail.index.5rmxl9q91qc0')">{{ userInfos.name }}</j-descriptions-item>
            <j-descriptions-item :label="t('components.Detail.index.5rmxl9q91v80')">{{ role }}</j-descriptions-item>
            <j-descriptions-item :label="t('components.Detail.index.5rmxl9q920w0')">{{ org }}</j-descriptions-item>
            <j-descriptions-item :label="t('components.Detail.index.5rmxl9q927g0')">{{ userInfos?.telephone || '--' }}</j-descriptions-item>
            <j-descriptions-item :label="t('components.Detail.index.5rmxl9q92c80')">{{ userInfos?.email || '--' }}</j-descriptions-item>
        </j-descriptions>
        <template #footer>
            <j-button type="primary" @click="emit('close')">{{t('components.Detail.index.5rmxl9q92ho0')}}</j-button>
        </template>
    </j-modal>
</template>

<script lang="ts" setup>
import { useUserInfo } from '@/store/userInfo';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { userInfos } = useUserInfo();
const emit = defineEmits(['close', 'save']);

const role = computed(() => {
    const _role = userInfos?.roleList.map((item: any) => item?.name).join(',') 
    return _role || t('components.Detail.index.5rmxl9q92mo0')
})

const org = computed(() => {
    const _role = userInfos?.orgList.map((item: any) => item?.name).join(',') 
    return _role || t('components.Detail.index.5rmxl9q92tw0')
})
</script>