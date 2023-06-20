<!-- 国标级联-绑定通道 -->
<template>
    <j-modal
        v-model:visible="_vis"
        :title="t('Channel.BindChannel.index.5rg8o1uw7ng0')"
        :cancelText="t('Channel.BindChannel.index.5rg8o1uwaug0')"
        :okText="t('Channel.BindChannel.index.5rg8o1uwcx40')"
        width="80%"
        @ok="handleSave"
        @cancel="_vis = false"
        :confirmLoading="loading"
    >
        <pro-search :columns="columns" target="media" @search="handleSearch" />

        <JProTable
            ref="listRef"
            model="table"
            :columns="columns"
            :request="CascadeApi.queryChannelList"
            :defaultParams="{
                pageSize: 10,
                sorts: [{ name: 'name', order: 'desc' }],
                terms: [
                    {
                        column: 'id',
                        termType: 'cascade_channel$not',
                        type: 'and',
                        value: route.query.id,
                    },
                    {
                        column: 'catalogType',
                        termType: 'eq',
                        type: 'and',
                        value: 'device',
                    },
                ],
            }"
            :params="params"
            :rowSelection="{
                selectedRowKeys: _selectedRowKeys,
                onChange: onSelectChange,
            }"
            @cancelSelect="_selectedRowKeys = []"
            :pagination="{
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50', '100'],
            }"
        >
            <template #headerTitle>
                <h3>{{t('Channel.BindChannel.index.5rg8o1uwd940')}}</h3>
            </template>
            <template #status="slotProps">
                <j-space>
                    <j-badge
                        :status="
                            slotProps.status.value === 'online'
                                ? 'success'
                                : 'error'
                        "
                        :text="slotProps.status.text"
                    ></j-badge>
                </j-space>
            </template>
        </JProTable>
    </j-modal>
</template>

<script setup lang="ts">
import CascadeApi from '@/api/media/cascade';
import { message } from 'jetlinks-ui-components';
import { PropType } from 'vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute();

type Emits = {
    (e: 'update:visible', data: boolean): void;
    (e: 'submit'): void;
};
const emit = defineEmits<Emits>();

const props = defineProps({
    visible: { type: Boolean, default: false },
    data: {
        type: Object as PropType<Partial<Record<string, any>>>,
        default: () => ({}),
    },
});

const _vis = computed({
    get: () => props.visible,
    set: (val) => emit('update:visible', val),
});

watch(
    () => _vis.value,
    (val) => {
        if (val) handleSearch({ terms: [] });
        else _selectedRowKeys.value = [];
    },
);

const columns = [
    {
        title: t('Channel.BindChannel.index.5rg8o1uwdjg0'),
        dataIndex: 'deviceName',
        key: 'deviceName',
        search: {
            type: 'string',
        },
    },
    {
        title: t('Channel.BindChannel.index.5rg8o1uwf0w0'),
        dataIndex: 'name',
        key: 'name',
        search: {
            type: 'string',
            first: true,
        },
    },
    {
        title: t('Channel.BindChannel.index.5rg8o1uwg100'),
        dataIndex: 'address',
        key: 'address',
        search: {
            type: 'string',
        },
    },
    {
        title: t('Channel.BindChannel.index.5rg8o1uwhv00'),
        dataIndex: 'manufacturer',
        key: 'manufacturer',
        search: {
            type: 'string',
        },
    },
    {
        title: t('Channel.BindChannel.index.5rg8o1uwirs0'),
        dataIndex: 'status',
        key: 'status',
        scopedSlots: true,
        search: {
            type: 'select',
            options: [
                { label: t('Channel.BindChannel.index.5rg8o1uwj5w0'), value: 'online' },
                { label: t('Channel.BindChannel.index.5rg8o1uwk400'), value: 'offline' },
            ],
            handleValue: (v: any) => {
                return v;
            },
        },
    },
];

const params = ref<Record<string, any>>({});

/**
 * 搜索
 * @param params
 */
const handleSearch = (e: any) => {
    params.value = e;
};

const listRef = ref();
const _selectedRowKeys = ref<string[]>([]);

const onSelectChange = (keys: string[]) => {
    _selectedRowKeys.value = [...keys];
};

const loading = ref(false);
const handleSave = async () => {
    if (!_selectedRowKeys.value.length) {
        message.error(t('Channel.BindChannel.index.5rg8o1uwkik0'));
        return;
    }
    loading.value = true;
    const resp = await CascadeApi.bindChannel(
        route.query.id as string,
        _selectedRowKeys.value,
    );
    loading.value = false;
    if (resp.success) {
        message.success(t('Channel.BindChannel.index.5rg8o1uwl0s0'));
        _vis.value = false;
        emit('submit');
    } else {
        message.error(t('Channel.BindChannel.index.5rg8o1uwlao0'));
    }
};
</script>
