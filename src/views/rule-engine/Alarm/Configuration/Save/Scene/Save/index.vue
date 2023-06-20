<template>
    <j-modal
        visible
        :title="t('Scene.Save.index.5rg41y6hqh00')"
        :okText="t('Scene.Save.index.5rg41y6hrlc0')"
        :cancelText="t('Scene.Save.index.5rg41y6hrvo0')"
        :width="1000"
        @cancel="closeModal"
        @ok="saveCorrelation"
    >
        <pro-search :columns="columns" @search="handleSearch" />
        <div style="height: 500px; overflow-y: auto">
            <JProTable
                model="CARD"
                :request="query"
                :rowSelection="{
                    selectedRowKeys: _selectedRowKeys,
                }"
                @cancelSelect="cancelSelect"
                :gridColumns="[1, 1, 1]"
                :defaultParams="{
                    sorts: [
                        {
                            name: 'createTime',
                            order: 'desc',
                        },
                    ],
                    terms,
                }"
                :params="params"
            >
                <template #card="slotProps">
                    <CardBox
                        :value="slotProps"
                        :status="slotProps.state?.value"
                        :statusText="slotProps.state?.text"
                        :active="_selectedRowKeys.includes(slotProps.id)"
                        @click="handleClick"
                        :statusNames="{
                            started: 'processing',
                            disable: 'error',
                        }"
                    >
                        <template #type>
                            <span
                                ><img
                                    :height="16"
                                    :src="
                                        typeMap.get(slotProps.triggerType)?.icon
                                    "
                                    style="margin-right: 5px"
                                />{{
                                    typeMap.get(slotProps.triggerType)?.text
                                }}</span
                            >
                        </template>
                        <template #img>
                            <img
                                :src="typeMap.get(slotProps.triggerType)?.img"
                            />
                        </template>
                        <template #content>
                            <Ellipsis style="width: calc(100% - 100px)">
                                <span style="font-size: 16px; font-weight: 600">
                                    {{ slotProps.name }}
                                </span>
                            </Ellipsis>
                            <Ellipsis :lineClamp="2">
                                <div class="subTitle">
                                    说明：{{
                                        slotProps?.description ||
                                        typeMap.get(slotProps.triggerType)?.tip
                                    }}
                                </div>
                            </Ellipsis>
                        </template>
                    </CardBox>
                </template>
            </JProTable>
        </div>
    </j-modal>
</template>

<script lang="ts" setup>
import { query } from '@/api/rule-engine/scene';
import { bindScene } from '@/api/rule-engine/configuration';
import { getImage } from '@/utils/comm';
import { message } from 'jetlinks-ui-components';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const columns = [
    {
        title: t('Scene.Save.index.5rg41y6hs380'),
        dataIndex: 'name',
        key: 'name',
        search: {
            type: 'string',
        },
    },
    {
        title: t('Scene.Save.index.5rg41y6hsac0'),
        dataIndex: 'triggerType',
        key: 'triggerType',
        search: {
            type: 'select',
            options: [
                {
                    label: t('Scene.Save.index.5rg41y6hsi40'),
                    value: 'manual',
                },
                {
                    label: t('Scene.Save.index.5rg41y6hspc0'),
                    value: 'timer',
                },
                {
                    label: t('Scene.Save.index.5rg41y6hsvs0'),
                    value: 'device',
                },
            ],
        },
    },
    {
        title: t('Scene.Save.index.5rg41y6ht380'),
        dataIndex: 'state',
        key: 'state',
        search: {
            type: 'select',
            options: [
                {
                    label: t('Scene.Save.index.5rg41y6htcg0'),
                    value: 'started',
                },
                {
                    label: t('Scene.Save.index.5rg41y6htm80'),
                    value: 'disable',
                },
            ],
        },
    },
];
const props = defineProps({
    id: {
        type: String,
    },
    type: {
        type: String,
    },
});
const terms = [
    {
        terms: [
            {
                column: 'id',
                termType: 'alarm-bind-rule$not',
                value: props.id,
                type: 'and',
            },
            {
                column: 'triggerType',
                termType: 'eq',
                value: props.type === 'other' ? undefined : 'device',
            },
        ],
        type: 'and',
    },
];
const params = ref();
const typeMap = new Map();
typeMap.set('manual', {
    text: t('Scene.Save.index.5rg41y6hsi40'),
    img: getImage('/scene/scene-hand.png'),
    icon: getImage('/scene/trigger-type-icon/manual.png'),
    tip: t('Scene.Save.index.5rg41y6htt00'),
});
typeMap.set('timer', {
    text: t('Scene.Save.index.5rg41y6hspc0'),
    img: getImage('/scene/scene-timer.png'),
    icon: getImage('/scene/trigger-type-icon/timing.png'),
    tip: t('Scene.Save.index.5rg41y6htz00'),
});
typeMap.set('device', {
    text: t('Scene.Save.index.5rg41y6hsvs0'),
    img: getImage('/scene/scene-device.png'),
    icon: getImage('/scene/trigger-type-icon/device.png'),
    tip: t('Scene.Save.index.5rg41y6hu540'),
});
const _selectedRowKeys = ref<string[]>([]);
const handleClick = (dt: any) => {
    if (_selectedRowKeys.value.includes(dt.id)) {
        const _index = _selectedRowKeys.value.findIndex((i) => i === dt.id);
        _selectedRowKeys.value.splice(_index, 1);
    } else {
        _selectedRowKeys.value = [..._selectedRowKeys.value, dt.id];
    }
    console.log(_selectedRowKeys.value);
};
/**
 * 取消选择事件
 */
const cancelSelect = () => {
    _selectedRowKeys.value = [];
};
const log = () => {};
log();
const handleSearch = (e: any) => {
    params.value = e;
};
const emit = defineEmits(['closeSave', 'saveScene']);
/**
 * 保存选中关联场景
 */
const saveCorrelation = async () => {
    if (_selectedRowKeys.value.length > 0) {
        const list = _selectedRowKeys.value.map((item: any) => {
            return {
                alarmId: props.id,
                ruleId: item,
            };
        });
        const res = await bindScene([...list]);
        if (res.status === 200) {
            message.success(t('Scene.Save.index.5rg41y6huas0'));
            emit('saveScene');
        }
    } else {
        message.error(t('Scene.Save.index.5rg41y6huh00'));
    }
};
const closeModal = () => {
    emit('closeSave');
};
</script>
<style lang="less" scoped>
.subTitle {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    margin-top: 10px;
}
</style>