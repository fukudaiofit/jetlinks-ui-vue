<template>
    <j-table
        rowKey="id"
        :columns="columns"
        :data-source="dataSource"
        bordered
        :pagination="false"
    >
        <template #bodyCell="{ column, text, record }">
            <div>
                <template v-if="['valueType', 'name'].includes(column.dataIndex)">
                    <span>{{ text }}</span>
                </template>
                <template v-else>
                    <ValueItem
                        v-model:modelValue="record.value"
                        :itemType="record.type"
                        :options="
                            record.type === 'enum'
                                ? (record?.dataType?.elements || []).map(
                                        (item) => {
                                            return {
                                                label: item.text,
                                                value: item.value,
                                            };
                                        },
                                    )
                                : record.type === 'boolean'
                                ? [
                                        { label: t('Message.Function.EditTable.5rcyf72g1r80'), value: true },
                                        { label: t('Message.Function.EditTable.5rcyf72g3js0'), value: false },
                                    ]
                                : undefined
                        "
                    />
                </template>
            </div>
        </template>
    </j-table>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
type Emits = {
    (e: 'update:modelValue', data: Record<string, any>[]): void;
};
const _emit = defineEmits<Emits>();

const _props = defineProps({
    modelValue: {
        type: Array as PropType<Record<string, any>[]>,
        default: '',
    }
});
const columns = [
    {
        title: t('Message.Function.EditTable.5rcyf72g3ps0'),
        dataIndex: 'name',
        with: '33%',
    },
    {
        title: t('Message.Function.EditTable.5rcyf72g3tk0'),
        dataIndex: 'valueType',
        with: '33%',
    },
    {
        title: t('Message.Function.EditTable.5rcyf72g3x00'),
        dataIndex: 'value',
        with: '34%',
    },
];

const dataSource = computed({
    get: () => {
        return _props.modelValue || []
    },
    set: (val: any) => {
        _emit('update:modelValue', val);
    }
})

</script>