<template>
    <j-modal
        visible
        :title="props.data.id ? t('NotificationSubscription.components.EditDialog.5rmxpg5f4nw0') : t('NotificationSubscription.components.EditDialog.5rmxpg5f6kw0')"
        width="865px"
        :confirmLoading="loading"
        @ok="confirm"
        @cancel="emits('update:visible', false)"
    >
        <j-form :model="form" layout="vertical" ref="formRef">
            <j-form-item
                :label="t('NotificationSubscription.components.EditDialog.5rmxpg5f6u40')"
                name="subscribeName"
                :rules="[
                    { required: true, message: t('NotificationSubscription.components.EditDialog.5rmxpg5f70w0') },
                    {
                        max: 64,
                        message: t('NotificationSubscription.components.EditDialog.5rmxpg5f76o0'),
                    },
                ]"
            >
                <j-input
                    v-model:value="form.subscribeName"
                    :placeholder="t('NotificationSubscription.components.EditDialog.5rmxpg5f70w0')"
                />
            </j-form-item>

            <j-row :gutter="24">
                <j-col :span="12">
                    <j-form-item
                        :label="t('NotificationSubscription.components.EditDialog.5rmxpg5f7hc0')"
                        name="topicProvider"
                        :rules="[{ required: true, message: t('NotificationSubscription.components.EditDialog.5rmxpg5f7nk0') }]"
                    >
                        <j-select
                            v-model:value="form.topicProvider"
                            :placeholder="t('NotificationSubscription.components.EditDialog.5rmxpg5f7nk0')"
                            :options="typeList"
                        />
                    </j-form-item>
                </j-col>
                <j-col :span="12">
                    <j-form-item
                        :label="t('NotificationSubscription.components.EditDialog.5rmxpg5f7s80')"
                        :name="['topicConfig', 'alarmConfigId']"
                        :rules="[{ required: true, message: t('NotificationSubscription.components.EditDialog.5rmxpg5f7z40') }]"
                    >
                        <j-select
                            :value="form.topicConfig?.alarmConfigId?.split(',')"
                            :options="alarmList"
                            :placeholder="t('NotificationSubscription.components.EditDialog.5rmxpg5f7z40')"
                            mode="multiple"
                            @change="onSelect"
                        ></j-select>
                    </j-form-item>
                </j-col>
            </j-row>
            <j-form-item
                name="notice"
                :label="t('NotificationSubscription.components.EditDialog.5rmxpg5f8640')"
                :rules="[{ required: true, message: t('NotificationSubscription.components.EditDialog.5rmxpg5f8bg0') }]"
            >
                <j-checkbox-group
                    v-model:value="form.notice"
                    name="checkboxgroup"
                    :options="[
                        {
                            label: t('NotificationSubscription.components.EditDialog.5rmxpg5f8h00'),
                            value: 1,
                        },
                    ]"
                />
            </j-form-item>
        </j-form>
    </j-modal>
</template>

<script setup lang="ts">
import { rowType } from '../typing';
import {
    getTypeList_api,
    getAlarmList_api,
    save_api,
} from '@/api/account/notificationSubscription';
import { optionsType } from '@/views/system/Department/typing';
import { dictItemType } from '@/views/system/DataSource/typing';
import { optionItem } from '@/views/rule-engine/Scene/typings';
import { FormInstance, message } from 'ant-design-vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const emits = defineEmits(['ok', 'update:visible']);
const props = defineProps<{
    visible: boolean;
    data: rowType;
}>();

const loading = ref(false);
const initForm = {
    subscribeName: '',
    topicConfig: {},
    notice: [1],
};

const formRef = ref<FormInstance>();
const form = ref({
    ...initForm,
    ...props.data,
});
const confirm = () => {
    formRef.value &&
        formRef.value.validate().then(() => {
            loading.value = true;
            save_api(form.value)
                .then((resp) => {
                    if (resp.status === 200) {
                        message.success(t('NotificationSubscription.components.EditDialog.5rmxpg5f8m40'));
                        emits('ok');
                        emits('update:visible', false);
                    }
                })
                .finally(() => (loading.value = false));
        });
};

const typeList = ref<optionsType>([]);
const alarmList = ref<optionsType>([]);

init();
function init() {
    getTypeList_api().then((resp: any) => {
        if (resp.status === 200)
            typeList.value = resp.result
                .map((item: dictItemType) => ({
                    label: item.name,
                    value: item.id,
                }))
                .filter((item: optionItem) => item.value === 'alarm');
    });
    getAlarmList_api().then((resp: any) => {
        if (resp.status === 200)
            alarmList.value = resp.result.map((item: dictItemType) => ({
                label: item.name,
                value: item.id,
            }));
    });
}

function onSelect(keys: string[], items: optionsType) {
    form.value.topicConfig = {
        alarmConfigId: keys.length ? keys.join(',') : undefined,
        alarmConfigName: items.length ? items.map((item) => item.label).join(',') : undefined,
    };
}
</script>

<style scoped></style>
