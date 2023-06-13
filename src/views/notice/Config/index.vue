<!-- 通知配置 -->
<template>
    <page-container>
        <pro-search :columns="columns" target="notice-config" @search="handleSearch" />
        <FullPage>
            <JProTable ref="configRef" :columns="columns" :request="ConfigApi.list" :defaultParams="{
                sorts: [{ name: 'createTime', order: 'desc' }],
            }" :params="params" :gridColumn="3">
                <template #headerTitle>
                    <j-space>
                        <PermissionButton type="primary" @click="handleAdd" hasPermission="notice/Config:add">
                            {{ t('common.add') }}
                        </PermissionButton>
                        <j-upload name="file" accept=".json" :showUploadList="false" :before-upload="beforeUpload">
                            <PermissionButton hasPermission="notice/Config:import">
                                {{ t('common.import') }}
                            </PermissionButton>
                        </j-upload>
                        <j-popconfirm :title="t('common.tips.export')" :ok-text="t('common.ok')"
                            :cancel-text="t('common.cancel')" @confirm="handleExport">
                            <PermissionButton hasPermission="notice/Config:export">
                                {{ t('common.export') }}
                            </PermissionButton>
                        </j-popconfirm>
                    </j-space>
                </template>
                <template #card="slotProps">
                    <CardBox :showStatus="false" :statusNames="{}" :value="slotProps"
                        :actions="getActions(slotProps, 'card')">
                        <template #img>
                            <slot name="img">
                                <img :src="getLogo(
                                    slotProps.type,
                                    slotProps.provider,
                                )
                                    " class="logo" />
                            </slot>
                        </template>
                        <template #content>
                            <h3 class="card-item-content-title">
                                {{ slotProps.name }}
                            </h3>
                            <j-row>
                                <j-col :span="12">
                                    <div class="card-item-content-text">
                                        {{ t('common.notiMode') }}
                                    </div>
                                    <div>
                                        {{ getMethodTxt(slotProps.type) }}
                                    </div>
                                </j-col>
                                <j-col :span="12">
                                    <div class="card-item-content-text">
                                        {{ t('common.descri') }}
                                    </div>
                                    <Ellipsis>
                                        {{ slotProps.description }}
                                    </Ellipsis>
                                </j-col>
                            </j-row>
                        </template>
                        <template #actions="item">
                            <j-tooltip v-bind="item.tooltip" :title="item.disabled && item.tooltip.title">
                                <j-dropdown placement="bottomRight" v-if="item.key === 'others'">
                                    <j-button>
                                        <AIcon :type="item.icon" />
                                        <span>{{ item.text }}</span>
                                    </j-button>
                                    <template #overlay>
                                        <j-menu>
                                            <j-menu-item v-for="(o, i) in item.children" :key="i">
                                                <PermissionButton type="link" @click="o.onClick"
                                                    :hasPermission="`notice/Config:${o.key}`">
                                                    <template #icon>
                                                        <AIcon :type="o.icon" />
                                                    </template>
                                                    <span>{{ o.text }}</span>
                                                </PermissionButton>
                                            </j-menu-item>
                                        </j-menu>
                                    </template>
                                </j-dropdown>
                                <j-popconfirm v-else-if="item.key === 'delete'" v-bind="item.popConfirm"
                                    :disabled="item.disabled">
                                    <PermissionButton :disabled="item.disabled"
                                        :hasPermission="`notice/Config:${item.key}`">
                                        <template #icon>
                                            <AIcon type="DeleteOutlined" />
                                        </template>
                                    </PermissionButton>
                                </j-popconfirm>
                                <template v-else>
                                    <PermissionButton :disabled="item.disabled" @click="item.onClick"
                                        :hasPermission="`notice/Config:${item.key}`">
                                        <template #icon>
                                            <AIcon :type="item.icon" />
                                        </template>
                                        <span>{{ item.text }}</span>
                                    </PermissionButton>
                                </template>
                            </j-tooltip>
                        </template>
                    </CardBox>
                </template>
                <template #type="slotProps">
                    <span> {{ getMethodTxt(slotProps.type) }}</span>
                </template>
                <template #provider="slotProps">
                    <span>
                        {{ getProviderTxt(slotProps.type, slotProps.provider) }}
                    </span>
                </template>
                <template #description="slotProps">
                    <Ellipsis>
                        {{ slotProps.description }}
                    </Ellipsis>
                </template>
                <template #action="slotProps">
                    <j-space :size="16">
                        <template v-for="i in getActions(slotProps, 'table')" :key="i.key">
                            <PermissionButton :danger="i.key === 'delete'" :disabled="i.disabled" :popConfirm="i.popConfirm"
                                :tooltip="{
                                    ...i.tooltip,
                                }" @click="i.onClick" type="link" style="padding: 0px"
                                :hasPermission="'notice/Config:' + i.key">
                                <template #icon>
                                    <AIcon :type="i.icon" />
                                </template>
                            </PermissionButton>
                        </template>
                    </j-space>
                </template>
            </JProTable>
        </FullPage>

        <Debug v-model:visible="debugVis" :data="currentConfig" />
        <Log v-model:visible="logVis" :data="currentConfig" />
        <SyncUser v-model:visible="syncVis" :data="currentConfig" />
    </page-container>
</template>

<script setup lang="ts">
import ConfigApi from '@/api/notice/config';
import type { ActionsType } from '@/views/device/Instance/typings';

import { message } from 'jetlinks-ui-components';

import { NOTICE_METHOD, MSG_TYPE } from '@/views/notice/const';
import SyncUser from './SyncUser/index.vue';
import Debug from './Debug/index.vue';
import Log from './Log/index.vue';
import { downloadObject } from '@/utils/utils';
import { useMenuStore } from 'store/menu';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const menuStory = useMenuStore();

let providerList: any = [];
Object.keys(MSG_TYPE).forEach((key) => {
    providerList = [...providerList, ...MSG_TYPE[key]];
});

const configRef = ref<Record<string, any>>({});
const params = ref<Record<string, any>>({});

const columns = [
    {
        title: t('pages.iot.notice.config.disposition'),
        dataIndex: 'name',
        key: 'name',
        ellipsis: true,
        search: {
            type: 'string',
        },
    },
    {
        title: t('common.notiMode'),
        dataIndex: 'type',
        key: 'type',
        scopedSlots: true,
        width: 100,
        search: {
            type: 'select',
            options: NOTICE_METHOD,
            handleValue: (v: any) => {
                return v;
            },
        },
    },
    {
        title: t('common.type'),
        dataIndex: 'provider',
        key: 'provider',
        scopedSlots: true,
        width: 200,
        search: {
            type: 'select',
            options: providerList,
            handleValue: (v: any) => {
                return v;
            },
        },
    },
    {
        title: t('common.descri'),
        dataIndex: 'description',
        key: 'description',
        scopedSlots: true,
        ellipsis: true,
        search: {
            type: 'string',
        },
    },
    {
        title: t('common.action'),
        key: 'action',
        fixed: 'right',
        width: 200,
        scopedSlots: true,
    },
];

/**
 * 搜索
 * @param params
 */
const handleSearch = (e: any) => {
    params.value = e;
};

/**
 * 根据通知方式展示对应logo
 */
const getLogo = (type: string, provider: string) => {
    return MSG_TYPE[type].find((f: any) => f.value === provider)?.logo;
};
/**
 * 通知方式字段展示对应文字
 */
const getMethodTxt = (type: string) => {
    return NOTICE_METHOD.find((f) => f.value === type)?.label;
};
/**
 * 根据类型展示对应文案
 * @param type
 * @param provider
 */
const getProviderTxt = (type: string, provider: string) => {
    return MSG_TYPE[type].find((f: any) => f.value === provider)?.label;
};

/**
 * 新增
 */
const handleAdd = () => {
    menuStory.jumpPage('notice/Config/Detail', { id: ':id' });
};

/**
 * 导入
 */
const beforeUpload = (file: any) => {
    console.log('file: ', file);
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = async (result) => {
        const text = result.target?.result;
        console.log('text: ', text);
        if (!file.type.includes('json')) {
            message.error(t('common.validate.json'));
            return false;
        }
        try {
            const data = JSON.parse(text || '{}');
            const { success } = await ConfigApi.update(data);
            if (success) {
                message.success(t('common.tips.suc'));
                configRef.value.reload();
            }
            return true;
        } catch {
            // message.error('请上传json格式文件');
        }
        return true;
    };
    return false;
};

/**
 * 导出
 */
const handleExport = () => {
    downloadObject(configRef.value._dataSource, `通知配置数据`);
};

const syncVis = ref(false);
const debugVis = ref(false);
const logVis = ref(false);
const currentConfig = ref<Partial<Record<string, any>>>();
const getActions = (
    data: Partial<Record<string, any>>,
    type: 'card' | 'table',
): ActionsType[] => {
    if (!data) return [];
    const actions = [
        {
            key: 'update',
            text: t('common.redact'),
            tooltip: {
                title: t('common.redact'),
            },
            icon: 'EditOutlined',
            onClick: () => {
                menuStory.jumpPage('notice/Config/Detail', {
                    id: data.id,
                });
            },
        },
        {
            key: 'debug',
            text: t('common.debug'),
            tooltip: {
                title: t('common.debug'),
            },
            icon: 'BugOutlined',
            onClick: () => {
                debugVis.value = true;
                currentConfig.value = data;
            },
        },
        {
            key: 'delete',
            text: t('common.delete'),
            popConfirm: {
                title: t('common.tips.delete'),
                onConfirm: async () => {
                    const resp = await ConfigApi.del(data.id);
                    if (resp.status === 200) {
                        message.success(t("common.tips.suc"));
                        configRef.value?.reload();
                    } else {
                        message.error(t('common.tips.err'));
                    }
                },
            },
            icon: 'DeleteOutlined',
        },
    ];

    const others: ActionsType = {
        key: 'others',
        text: t('common.others'),
        icon: 'EllipsisOutlined',
        children: [
            {
                key: 'export',
                text: t('common.export'),
                tooltip: {
                    title: t('common.export'),
                },
                icon: 'ArrowDownOutlined',
                onClick: () => {
                    downloadObject(data, `${data.name}`);
                },
            },
            {
                key: 'bind',
                text: t('pages.iot.notice.config.synchronization'),
                tooltip: {
                    title:  t('pages.iot.notice.config.synchronization'),
                },
                icon: 'TeamOutlined',
                onClick: () => {
                    syncVis.value = true;
                    currentConfig.value = data;
                },
            },
            {
                key: 'log',
                text: t('common.notiMode'),
                tooltip: {
                    title: t('common.notiMode'),
                },
                icon: 'BarsOutlined',
                onClick: () => {
                    logVis.value = true;
                    currentConfig.value = data;
                },
            },
        ],
    };

    if (type === 'card') {
        if (
            data.provider !== 'dingTalkMessage' &&
            data.provider !== 'corpMessage'
        )
            others.children?.splice(1, 1);
        actions.splice(actions.length - 1, 0, others);
        return actions;
    } else {
        if (
            data.provider !== 'dingTalkMessage' &&
            data.provider !== 'corpMessage'
        )
            others.children?.splice(1, 1);
        actions.splice(actions.length - 1, 0, ...others.children);
        return actions;
    }
};
</script>
<style lang="less" scoped>
.logo {
    width: 88px;
    height: 88px;
}
</style>
