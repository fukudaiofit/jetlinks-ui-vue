<template>
    <j-modal
        :title="t('components.BatchUpdate.index.5rg7ss2s2xs0')"
        :visible="true"
        width="700px"
        @cancel="handleCancel"
    >
        <div class="sizeText">
            {{t('components.BatchUpdate.index.5rg7ss2s4gg0')}}
            {{ data.length }} {{t('components.BatchUpdate.index.5rg7ss2s4pc0')}}
        </div>
        <j-form
            class="form"
            layout="vertical"
            :model="formData"
            name="basic"
            autocomplete="off"
            ref="formRef"
        >
            <j-form-item :label="t('components.BatchUpdate.index.5rg7ss2s5040')" name="accessModes">
                <j-card-select
                    multiple
                    :showImage="false"
                    v-model:value="formData.accessModes"
                    :options="[
                        { label: t('components.BatchUpdate.index.5rg7ss2s5680'), value: 'read' },
                        { label: t('components.BatchUpdate.index.5rg7ss2s5gg0'), value: 'write' },
                        { label: t('components.BatchUpdate.index.5rg7ss2s5po0'), value: 'subscribe' },
                    ]"
                />
            </j-form-item>
            <j-form-item
                :name="['interval']"
                :rules="[
                    {
                        pattern: regOnlyNumber,
                        message: t('components.BatchUpdate.index.5rg7ss2s6040'),
                    },
                ]"
            >
                <template #label>
                    <span>
                        {{t('components.BatchUpdate.index.5rg7ss2s69c0')}}
                        <j-tooltip :title="t('components.BatchUpdate.index.5rg7ss2s6fg0')">
                            <AIcon
                                type="QuestionCircleOutlined"
                                style="margin-left: 2px"
                            />
                        </j-tooltip>
                    </span>
                </template>
                <j-input-number
                    style="width: 100%"
                    :placeholder="t('components.BatchUpdate.index.5rg7ss2s6ns0')"
                    v-model:value="formData.interval"
                    addon-after="ms"
                    :max="9999999999999998"
                />
            </j-form-item>

            <j-form-item :name="['features']">
                <j-checkbox-group v-model:value="formData.features">
                    <j-checkbox value="changedOnly" name="type"
                        >{{t('components.BatchUpdate.index.5rg7ss2s6ws0')}}</j-checkbox
                    >
                </j-checkbox-group>
            </j-form-item>
        </j-form>
        <template #footer>
            <j-button key="back" @click="handleCancel">{{t('components.BatchUpdate.index.5rg7ss2s72c0')}}</j-button>
            <PermissionButton
                key="submit"
                type="primary"
                :loading="loading"
                @click="handleOk"
                style="margin-left: 8px"
                :hasPermission="`DataCollect/Collector:update`"
            >
                {{t('components.BatchUpdate.index.5rg7ss2s77w0')}}
            </PermissionButton>
        </template>
    </j-modal>
</template>
<script lang="ts" setup>
import type { FormInstance } from 'ant-design-vue';
import { savePointBatch } from '@/api/data-collect/collector';
import { Rule } from 'ant-design-vue/lib/form';
import { cloneDeep, isObject } from 'lodash';
import { regOnlyNumber } from '../../../data';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps({
    data: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(['change']);
const loading = ref(false);
const formRef = ref<FormInstance>();

const formData = ref({
    accessModes: [],
    interval: undefined,
    features: [],
});

const checkLength = (_rule: Rule, value: string): Promise<any> =>
    new Promise(async (resolve, reject) => {
        if (value) {
            return String(value).length > 64
                ? reject(t('components.BatchUpdate.index.5rg7ss2s7d00'))
                : resolve('');
        }
    });

const handleOk = async () => {
    const data = cloneDeep(formData.value);
    const { accessModes, features, interval } = data;
    const ischange =
        accessModes.length !== 0 ||
        features.length !== 0 ||
        Number(interval) === 0 ||
        !!interval;
    if (ischange) {
        const params = cloneDeep(props.data);
        params.forEach((i: any) => {
            if (accessModes.length !== 0) {
                i.accessModes = data.accessModes;
            } else {
                if (isObject(i.accessModes)) {
                    i.accessModes = i.accessModes.map(
                        (item: any) => item.value,
                    );
                }
            }
            features.length !== 0 && (i.features = data.features);
            if (!!interval || Number(interval) === 0) {
                i.interval = data.interval;
                i.configuration = {
                    ...i.configuration,
                    interval: data.interval,
                };
            }
        });
        loading.value = true;
        const response = await savePointBatch(params).catch(() => {});
        emit('change', response?.status === 200);
        loading.value = false;
    } else {
        emit('change', true);
    }
};

const handleCancel = () => {
    emit('change', false);
};

const filterOption = (input: string, option: any) => {
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
</script>

<style lang="less" scoped>
.sizeText {
    margin-bottom: 20px;
}
</style>
