<template>
    <j-modal :width="700" visible :title="t('components.Detail.index.5rga8ahulh80')" @cancel="emit('close')">
        <j-descriptions bordered :column="2">
            <j-descriptions-item :label="t('components.Detail.index.5rga8ahum8g0')">Cloud Database</j-descriptions-item>
            <j-descriptions-item :label="t('components.Detail.index.5rga8ahume00')">Cloud Database</j-descriptions-item>
            <j-descriptions-item :label="t('components.Detail.index.5rga8ahumig0')">Cloud Database</j-descriptions-item>
            <j-descriptions-item :label="t('components.Detail.index.5rga8ahummg0')">Cloud Database</j-descriptions-item>
            <j-descriptions-item :label="t('components.Detail.index.5rga8ahumq80')">Cloud Database</j-descriptions-item>
            <j-descriptions-item :label="t('components.Detail.index.5rga8ahumu80')">Cloud Database</j-descriptions-item>
        </j-descriptions>
        <template #footer>
            <j-button type="primary" @click="emit('close')">{{t('components.Detail.index.5rga8ahumxs0')}}</j-button>
        </template>
    </j-modal>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps({
    data: {
        type: Object,
        default: () => {},
    },
});
const emit = defineEmits(['close', 'save']);
</script>