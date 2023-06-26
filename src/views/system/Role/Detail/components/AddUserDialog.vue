<template>
    <j-modal
        visible
        :title="t('Detail.components.AddUserDialog.5rkjopn8q0s0')"
        width="1000px"
        @ok="confirm"
        @cancel="emits('update:visible', false)"
    >
        <!-- <j-advanced-search
            :columns="columns"
            type="simple"
            @search="(params:any)=>queryParams = {...params}"
        /> -->
        <pro-search
            :columns="columns"
            target="simple"
            @search="(params:any)=>queryParams = {...params}"
        />

        <j-pro-table
            ref="tableRef"
            :columns="columns"
            :request="getUserList"
            model="TABLE"
            :params="queryParams"
            :rowSelection="{
                selectedRowKeys: selectedRowKeys,
                onSelect: changeSelect,
            }"
            @cancelSelect="selectedRowKeys = []"
            :defaultParams="{
                pageSize: 10,
            }"
            :pagination="{
                pageSizeOptions: ['10', '20', '50', '100'],
                showSizeChanger: true,
                hideOnSinglePage: false,
            }"
        >
        </j-pro-table>
    </j-modal>
</template>

<script setup lang="ts">
import { getUserByRole_api, bindUser_api } from '@/api/system/role';
import { message } from 'jetlinks-ui-components';
import { useI18n } from 'vue-i18n'

const { t } = useI18n() 
const emits = defineEmits(['refresh', 'update:visible']);
const props = defineProps<{
    visible: boolean;
    roleId: string;
}>();

const columns = [
    {
        title: t('Detail.components.AddUserDialog.5rkjopn8rco0'),
        dataIndex: 'name',
        key: 'name',
        search: {
            type: 'string',
        },
    },
    {
        title: t('Detail.components.AddUserDialog.5rkjopn8rmg0'),
        dataIndex: 'username',
        key: 'username',
        search: {
            type: 'string',
        },
    },
];
const queryParams = ref({});

const selectedRowKeys = ref<string[]>([]);
const getUserList = (oParams: any) => {
    const params = {
        ...oParams,
        sorts: [{ name: 'createTime', order: 'desc' }],
        terms: [
            {
                terms: [
                    {
                        column: 'id$in-dimension$role$not',
                        value: props.roleId,
                    },
                ],
            },
        ],
    };
    if (oParams.terms[0])
        params.terms.unshift({
            terms: oParams.terms[0].terms,
        });
    return getUserByRole_api(params);
};

const confirm = () => {
    if (selectedRowKeys.value.length < 1) {
        message.error(t('Detail.components.AddUserDialog.5rkjopn8ru80'));
    } else {
        bindUser_api(props.roleId, selectedRowKeys.value).then((resp) => {
            if (resp.status === 200) {
                message.success(t('Detail.components.AddUserDialog.5rkjopn8s180'));
                emits('refresh');
                emits('update:visible', false);
            }
        });
    }
};
const changeSelect = (item: any, state: boolean) => {
    const arr = new Set(selectedRowKeys.value);
    console.log(item, state);
    if (state) {
        arr.add(item.id);
    } else {
        arr.delete(item.id);
    }
    selectedRowKeys.value = [...arr.values()];
};
</script>
