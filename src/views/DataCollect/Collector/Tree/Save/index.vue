<template lang="">
    <j-modal
        :title="data.id ? t('Tree.Save.index.5rg7wkstors0') : t('Tree.Save.index.5rg7wkstshg0')"
        :visible="true"
        width="700px"
        @cancel="handleCancel"
    >
        <j-form
            class="form"
            layout="vertical"
            :model="formData"
            name="basic"
            autocomplete="off"
            ref="formRef"
        >
            <j-form-item
                :label="t('Tree.Save.index.5rg7wkstswg0')"
                name="channelId"
                :rules="LeftTreeRules.channelId"
            >
                <j-select
                    style="width: 100%"
                    v-model:value="formData.channelId"
                    :options="channelList"
                    :placeholder="t('Tree.Save.index.5rg7wkstt2k0')"
                    allowClear
                    show-search
                    :filter-option="filterOption"
                    :disabled="!!id"
                />
            </j-form-item>
            <j-form-item
                :label="t('Tree.Save.index.5rg7wkstt6w0')"
                name="name"
                :rules="LeftTreeRules.name"
            >
                <j-input
                    :placeholder="t('Tree.Save.index.5rg7wksttd40')"
                    v-model:value="formData.name"
                />
            </j-form-item>
            <j-form-item
                :label="t('Tree.Save.index.5rg7wksttmw0')"
                :name="['configuration', 'unitId']"
                v-if="visibleUnitId"
                :rules="LeftTreeRules.unitId"
            >
                <j-input-number
                    style="width: 100%"
                    :placeholder="t('Tree.Save.index.5rg7wksttrc0')"
                    v-model:value="formData.configuration.unitId"
                    :min="0"
                    :max="255"
                />
            </j-form-item>
            <j-form-item
                :name="['circuitBreaker', 'type']"
                :rules="LeftTreeRules.type"
                :label="t('Tree.Save.index.5rg7wksttwk0')"
            >
                <j-card-select
                    :showImage="false"
                    v-model:value="formData.circuitBreaker.type"
                    :options="[
                        { label: t('Tree.Save.index.5rg7wkstu3c0'), value: 'LowerFrequency' },
                        { label: t('Tree.Save.index.5rg7wkstu740'), value: 'Break' },
                        { label: t('Tree.Save.index.5rg7wkstub80'), value: 'Ignore' },
                    ]"
                    @change="changeCardSelectType"
                />
            </j-form-item>
            <p style="color: #616161">
                {{ getTypeTooltip(formData.circuitBreaker.type) }}
            </p>
            <j-form-item
                :label="t('Tree.Save.index.5rg7wkstuew0')"
                :name="['configuration', 'endian']"
                v-if="visibleEndian"
                :rules="LeftTreeRules.endian"
            >
                <j-card-select
                    :showImage="false"
                    v-model:value="formData.configuration.endian"
                    :options="[
                        { label: 'AB', value: 'BIG' },
                        { label: 'BA', value: 'LITTLE' },
                    ]"
                    @change="changeCardSelectEndian"
                    :column="2"
                />
            </j-form-item>
            <j-form-item
                :label="t('Tree.Save.index.5rg7wkstuio0')"
                :name="['configuration', 'endianIn']"
                v-if="visibleEndian"
                :rules="LeftTreeRules.endianIn"
            >
                <j-card-select
                    :showImage="false"
                    v-model:value="formData.configuration.endianIn"
                    :options="[
                        { label: 'AB', value: 'BIG' },
                        { label: 'BA', value: 'LITTLE' },
                    ]"
                    @change="changeCardSelectEndianIn"
                    :column="2"
                />
            </j-form-item>
            <div style="color: #616161" v-if="visibleEndian">
                <p>当前内存布局: {{ endianData }}</p>
                <p>
                    {{t('Tree.Save.index.5rg7wkstums0')}} float)
                    {{t('Tree.Save.index.5rg7wksturk0')}}
                </p>
            </div>
            <j-form-item
                :label="t('Tree.Save.index.5rg7wkstuxg0')"
                :name="['configuration', 'requsetTimeout']"
            >
                <j-input-number
                    style="width: 100%"
                    :placeholder="t('Tree.Save.index.5rg7wkstv2o0')"
                    v-model:value="formData.configuration.requsetTimeout"
                    addon-after="ms"
                    :max="9999999999999998"
                    :min="1"
                />
            </j-form-item>

            <j-form-item :label="t('Tree.Save.index.5rg7wkstv600')" name="description">
                <j-textarea
                    :placeholder="t('Tree.Save.index.5rg7wkstvbk0')"
                    v-model:value="formData.description"
                    :maxlength="200"
                    :rows="3"
                    showCount
                />
            </j-form-item>
        </j-form>
        <template #footer>
            <j-button key="back" @click="handleCancel">{{t('Tree.Save.index.5rg7wkstvm80')}}</j-button>
            <PermissionButton
                key="submit"
                type="primary"
                :loading="loading"
                @click="handleOk"
                style="margin-left: 8px"
                :hasPermission="`DataCollect/Collector:${
                    id ? 'update' : 'add'
                }`"
            >
                {{t('Tree.Save.index.5rg7wkstvps0')}}
            </PermissionButton>
        </template>
    </j-modal>
</template>
<script lang="ts" setup>
import { save, update } from '@/api/data-collect/collector';
import { Store } from 'jetlinks-store';
import { LeftTreeRules } from '../../data';
import type { FormInstance } from 'ant-design-vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const loading = ref(false);
const channelListAll = ref();
const channelList = ref();
const visibleEndian = ref(false);
const visibleUnitId = ref(false);

const props = defineProps({
    data: {
        type: Object,
        default: () => {},
    },
});

const emit = defineEmits(['change']);

const id = props.data.id;
const formRef = ref<FormInstance>();


const endianData = computed(() => {
    const { endian, endianIn } = formData.value.configuration;
    if (endian) {
        if (endianIn) {
            if (endian === 'BIG') {
                return endianIn === 'BIG' ? 'ABCD' : 'BADC';
            } else {
                return endianIn === 'BIG' ? 'CDAB' : 'DCBA';
            }
        } else {
            return endian === 'BIG' ? 'ABCD' : 'DCBA';
        }
    }
});

const formData = ref({
    channelId: undefined,
    name: '',
    configuration: {
        unitId: '',
        type: 'LowerFrequency',
        endian: 'BIG',
        endianIn: 'BIG',
        requsetTimeout: 2000,
    },
    circuitBreaker: {
        type: 'LowerFrequency',
    },
    description: '',
});

const handleOk = async () => {
    const data = await formRef.value?.validate();

    const { provider, name } = channelListAll.value.find(
        (item: any) => item.id === formData.value.channelId,
    );
    const params = {
        ...data,
        provider,
        channelName: name,
    };

    loading.value = true;
    const response = !id
        ? await save(params).catch(() => { success: false })
        : await update(id, { ...props.data, ...params }).catch(() => { success: false });
    loading.value = false;
    if (response.success) {
        emit('change', true);
    }
};

const getTypeTooltip = (value: string) =>
    value === 'LowerFrequency'
        ? t('Tree.Save.index.5rg7wkstvto0')
        : value === 'Break'
        ? t('Tree.Save.index.5rg7wkstw0s0')
        : t('Tree.Save.index.5rg7wkstw3k0');

const handleCancel = () => {
    emit('change', false);
};

const changeCardSelectType = (value: Array<string>) => {
    formData.value.circuitBreaker.type = value[0];
};
const changeCardSelectEndian = (value: Array<string>) => {
    formData.value.configuration.endian = value[0];
};
const changeCardSelectEndianIn = (value: Array<string>) => {
    formData.value.configuration.endianIn = value[0];
};
const getChannelNoPaging = async () => {
    channelListAll.value = Store.get('channelListAll');
    channelList.value = channelListAll.value.map((item) => ({
        value: item.id,
        label: item.name,
    }));
};
getChannelNoPaging();

const filterOption = (input: string, option: any) => {
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

watch(
    () => formData.value.channelId,
    (value) => {
        const dt = channelListAll.value.find((item) => item.id === value);
        visibleUnitId.value = visibleEndian.value =
            dt?.provider && dt?.provider === 'MODBUS_TCP';
    },
    { deep: true },
);

watch(
    () => props.data,
    (value) => {
        if (value.id) formData.value = value;
    },
    { immediate: true, deep: true },
);
</script>

<style lang="less" scoped>
.form {
    .form-radio-button {
        width: 148px;
        height: 80px;
        padding: 0;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .form-upload-button {
        margin-top: 10px;
    }
    .form-submit {
        background-color: @primary-color !important;
    }
}
</style>
