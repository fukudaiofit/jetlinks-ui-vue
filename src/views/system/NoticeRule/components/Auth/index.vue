<template>
    <j-modal
        :width="900"
        visible
        :title="t('components.Auth.index.5rga80st4r00')"
        @cancel="emit('close')"
        @ok="onSave"
    >
        <Role v-model="_selectedRowKeys" />
    </j-modal>
</template>

<script lang="ts" setup>
import { onlyMessage } from '@/utils/comm';
import Role from '../Role/index.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const emit = defineEmits(['close', 'save']);

const _selectedRowKeys = ref<string[]>([]);
const checked = ref<boolean>(false);

const onSave = () => {
    if(_selectedRowKeys.value.length) {
        emit('save', _selectedRowKeys.value);
    } else {
        onlyMessage(t('components.Auth.index.5rga80st5qg0'), 'error')
    }
};

</script>