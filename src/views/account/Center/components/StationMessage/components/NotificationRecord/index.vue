<template>
    <page-container>
        <div class="notification-record-container">
            <pro-search
                :columns="columns"
                target="category"
                style="padding: 0"
                @search="(params:any)=>queryParams = {...params}"
            />

            <j-pro-table
                ref="tableRef"
                :columns="columns"
                :request="getList_api"
                model="TABLE"
                :params="queryParams"
                :bodyStyle="{padding: 0}"
                :defaultParams="{
                  sorts: [{
                    name: 'notifyTime', order: 'desc'
                  }]
                }"
            >
                <template #headerTitle>
                    <j-button type="primary">{{t('components.NotificationRecord.index.5rmxnueqiwg0')}}</j-button>
                </template>
                <template #topicProvider="slotProps">
                    {{ slotProps.topicName }}
                </template>
                <template #notifyTime="slotProps">
                    {{
                        moment(slotProps.notifyTime).format(
                            'YYYY-MM-DD HH:mm:ss',
                        )
                    }}
                </template>
                <template #state="slotProps">
                    <BadgeStatus
                        :status="slotProps.state.value"
                        :text="slotProps.state.text"
                        :statusNames="{
                            read: 'success',
                            unread: 'error',
                        }"
                    ></BadgeStatus>
                </template>
                <template #action="slotProps">
                    <j-space :size="16">
                        <PermissionButton
                            type="link"
                            :popConfirm="{
                                title: t('components.NotificationRecord.index.Markers',{type:slotProps.state.value === 'read'
                                        ? t('components.NotificationRecord.index.5rmxnueqkk80')
                                        : t('components.NotificationRecord.index.5rmxnueqkv40')}),
                                onConfirm: () => table.changeStatus(slotProps),
                            }"
                            :tooltip="{
                                title:
                                    slotProps.state.value === 'read'
                                        ? t('components.NotificationRecord.index.5rmxnueql300')
                                        : t('components.NotificationRecord.index.5rmxnueqlaw0'),
                            }"
                        >
                            <AIcon type="icon-a-PIZHU1" />
                        </PermissionButton>
                        <PermissionButton
                            type="link"
                            :tooltip="{
                                title: t('components.NotificationRecord.index.5rmxnueqlmk0'),
                            }"
                            @click="table.view(slotProps)"
                        >
                            <AIcon type="SearchOutlined" />
                        </PermissionButton>
                    </j-space>
                </template>
            </j-pro-table>

            <ViewDialog
                v-if="viewVisible"
                v-model:visible="viewVisible"
                :data="viewItem"
            />
        </div>
    </page-container>
</template>

<script setup lang="ts" name="NotificationRecord">
import ViewDialog from './components/ViewDialog.vue';
import PermissionButton from '@/components/PermissionButton/index.vue';
import {
    getList_api,
    changeStatus_api,
} from '@/api/account/notificationRecord';
import { getTypeList_api } from '@/api/account/notificationSubscription';
import { optionItem } from '@/views/rule-engine/Scene/typings';
import { dictItemType } from '@/views/system/DataSource/typing';
import moment from 'moment';
import { message } from 'ant-design-vue';
import { useUserInfo } from '@/store/userInfo';
import { useRouterParams } from '@/utils/hooks/useParams';
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { updateAlarm } = useUserInfo();
const columns = [
    {
        title: t('components.NotificationRecord.index.5rmxnueqlu40'),
        dataIndex: 'topicProvider',
        key: 'topicProvider',
        search: {
            type: 'select',
            options: () =>
                getTypeList_api().then((resp: any) =>
                    resp.result
                        .map((item: dictItemType) => ({
                            label: item.name,
                            value: item.id,
                        }))
                        .filter((item: optionItem) => item.value === 'alarm'),
                ),
        },
        scopedSlots: true,
        ellipsis: true,
    },
    {
        title: t('components.NotificationRecord.index.5rmxnueqm1g0'),
        dataIndex: 'message',
        key: 'message',
        search: {
            type: 'string',
        },
        scopedSlots: true,
        ellipsis: true,
    },
    {
        title: t('components.NotificationRecord.index.5rmxnueqmeo0'),
        dataIndex: 'notifyTime',
        key: 'notifyTime',
        search: {
            type: 'date'
        },
        scopedSlots: true,
        ellipsis: true,
    },
    {
        title: t('components.NotificationRecord.index.5rmxnueqmmo0'),
        dataIndex: 'state',
        key: 'state',
        search: {
            type: 'select',
            options: [
                {
                    label: t('components.NotificationRecord.index.5rmxnueqkk80'),
                    value: 'unread',
                },
                {
                    label: t('components.NotificationRecord.index.5rmxnueqkv40'),
                    value: 'read',
                },
            ],
        },
        scopedSlots: true,
        ellipsis: true,
    },
    {
        title: t('components.NotificationRecord.index.5rmxnueqmtw0'),
        dataIndex: 'action',
        key: 'action',
        ellipsis: true,
        scopedSlots: true,
        width: '200px',
    },
];
const queryParams = ref({});

const tableRef = ref();
const table = {
    changeStatus: (row: any) => {
        const type = row.state.value === 'read' ? '_unread' : '_read';
        changeStatus_api(type, [row.id]).then((resp: any) => {
            if (resp.status === 200) {
                message.success(t('components.NotificationRecord.index.5rmxnueqn1k0'));
                table.refresh();
                updateAlarm();
            }
        });
    },
    view: (row: any) => {
        console.log('row: ', row);
        viewItem.value = row;
        viewVisible.value = true;
    },
    refresh: () => {
        tableRef.value && tableRef.value.reload();
    },
};

const viewVisible = ref<boolean>(false);
const viewItem = ref<any>({});

const routerParams = useRouterParams();
onMounted(() => {
    if (routerParams.params?.value.row) {
        table.view(routerParams.params?.value.row);
    }
});
</script>

<style lang="less" scoped>
.notification-record-container {
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
