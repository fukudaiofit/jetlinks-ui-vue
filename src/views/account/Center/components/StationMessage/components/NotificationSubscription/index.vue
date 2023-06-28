<template>
    <page-container>
        <div class="notification-subscription-container">
            <pro-search
                :columns="columns"
                target="category"
                @search="(params:any)=>queryParams = {...params}"
            />
            <j-pro-table
                ref="tableRef"
                :columns="columns"
                :request="getNoticeList_api"
                model="TABLE"
                :params="queryParams"
                :defaultParams="{
                    sorts: [{ name: 'notifyTime', order: 'desc' }],
                }"
            >
                <template #headerTitle>
                    <PermissionButton type="primary" @click="table.edit()">
                        <AIcon type="PlusOutlined" />
                        {{t('components.NotificationSubscription.index.5rmxpvx36880')}}
                    </PermissionButton>
                </template>

                <template #alarmConfigName="slotProps">
                    {{ slotProps.topicConfig.alarmConfigName }}
                </template>
                <template #state="slotProps">
                    <BadgeStatus
                        :status="slotProps.state.value"
                        :text="slotProps.state.text"
                        :statusNames="{
                            enabled: 'success',
                            disabled: 'error',
                        }"
                    ></BadgeStatus>
                </template>

                <template #action="slotProps">
                    <j-space :size="16">
                        <PermissionButton
                            type="link"
                            :tooltip="{
                                title: t('components.NotificationSubscription.index.5rmxpvx39ao0'),
                            }"
                            @click="table.edit(slotProps)"
                        >
                            <AIcon type="EditOutlined" />
                        </PermissionButton>

                        <PermissionButton
                            type="link"
                            :popConfirm="{
                                title: `${t('components.NotificationSubscription.index.verify') +(
                                    slotProps.state.value === 'enabled'
                                        ? t('components.NotificationSubscription.index.5rmxpvx39nw0')
                                        : t('components.NotificationSubscription.index.5rmxpvx39v40'))
                                }`,
                                onConfirm: () => table.changeStatus(slotProps),
                            }"
                            :tooltip="{
                                title:
                                    slotProps.state.value === 'enabled'
                                        ? t('components.NotificationSubscription.index.5rmxpvx39nw0')
                                        : t('components.NotificationSubscription.index.5rmxpvx39v40'),
                            }"
                        >
                            <AIcon
                                :type="
                                    slotProps.state.value === 'enabled'
                                        ? 'StopOutlined'
                                        : 'PlayCircleOutlined'
                                "
                            />
                        </PermissionButton>
                        <PermissionButton
                            type="link"
                            :tooltip="{
                                title:
                                    slotProps.state.value === 'enabled'
                                        ? t('components.NotificationSubscription.index.5rmxpvx3a0s0')
                                        : t('components.NotificationSubscription.index.5rmxpvx3a7k0'),
                            }"
                            :popConfirm="{
                                title: t('components.NotificationSubscription.index.confirmDelete'),
                                onConfirm: () => table.delete(slotProps),
                            }"
                            :disabled="slotProps.state.value === 'enabled'"
                        >
                            <AIcon type="DeleteOutlined" />
                        </PermissionButton>
                    </j-space>
                </template>
            </j-pro-table>

            <EditDialog
                v-if="dialogVisible"
                v-model:visible="dialogVisible"
                :data="table.seletctRow"
                @ok="table.refresh"
            />
        </div>
    </page-container>
</template>

<script setup lang="ts" name="NotificationSubscription">
import PermissionButton from '@/components/PermissionButton/index.vue';
import EditDialog from './components/EditDialog.vue';
import {
    getNoticeList_api,
    changeStatus_api,
    remove_api,
} from '@/api/account/notificationSubscription';
import { rowType } from './typing';
import { message } from 'ant-design-vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const columns = [
    {
        title: t('components.NotificationSubscription.index.5rmxpvx3ads0'),
        dataIndex: 'subscribeName',
        key: 'subscribeName',
        ellipsis: true,
        search: {
            type: 'string',
        },
    },
    {
        title: t('components.NotificationSubscription.index.5rmxpvx3aw80'),
        dataIndex: 'topicName',
        key: 'topicName',
        scopedSlots: true,
        ellipsis: true,
    },
    {
        title: t('components.NotificationSubscription.index.5rmxpvx3b6k0'),
        dataIndex: 'alarmConfigName',
        key: 'alarmConfigName',
        scopedSlots: true,
        ellipsis: true,
    },
    {
        title: t('components.NotificationSubscription.index.5rmxpvx3bes0'),
        dataIndex: 'state',
        key: 'state',
        scopedSlots: true,
        ellipsis: true,
    },
    {
        title: t('components.NotificationSubscription.index.5rmxpvx3blk0'),
        dataIndex: 'action',
        key: 'action',
        ellipsis: true,
        scopedSlots: true,
        width: '200px',
    },
];
const queryParams = ref({});
const dialogVisible = ref<boolean>(false);
const tableRef = ref();
const table = {
    seletctRow: ref<any>({}),
    edit: (row?: rowType) => {
        table.seletctRow = {
            ...(row || ({} as any)),
        };
        dialogVisible.value = true;
    },
    changeStatus: (row: rowType) => {
        const status = row.state.value === 'enabled' ? '_disabled' : '_enabled';
        changeStatus_api(row.id as string, status).then((resp) => {
            if (resp.status === 200) {
                message.success(t('components.NotificationSubscription.index.5rmxpvx3bu80'));
                table.refresh();
            } else message.warning(t('components.NotificationSubscription.index.5rmxpvx3c0s0'));
        });
    },
    delete: (row: rowType) => {
        remove_api(row.id as string).then((resp) => {
            if (resp.status === 200) {
                message.success(t('components.NotificationSubscription.index.5rmxpvx3bu80'));
                table.refresh();
            } else message.warning(t('components.NotificationSubscription.index.5rmxpvx3c0s0'));
        });
    },
    refresh: () => {
        tableRef.value && tableRef.value.reload();
    },
};
</script>

<style lang="less" scoped>
.notification-subscription-container {
    :deep(.ant-table-tbody) {
        .ant-table-cell {
            .ant-space-item {
                .ant-btn-link {
                    padding: 0;
                }
            }
        }
    }
}
</style>
