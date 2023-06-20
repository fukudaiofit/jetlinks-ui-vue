<template>
    <j-form :layout="'vertical'" ref="formRef" :model="modelRef">
        <j-row :gutter="24">
            <j-col :span="24" v-if="actionType === 'command'">
                <j-form-item
                    name="messageType"
                    :label="t('Detail.command.index.5rg4ez76jy80')"
                    :rules="{
                        required: true,
                        message: t('Detail.command.index.5rg4ez76l3w0'),
                    }"
                >
                    <j-select
                        :placeholder="t('Detail.command.index.5rg4ez76l3w0')"
                        v-model:value="modelRef.messageType"
                        show-search
                        @change="onTypeChange"
                    >
                        <j-select-option value="READ_PROPERTY"
                            >{{t('Detail.command.index.5rg4ez76ln00')}}</j-select-option
                        >
                        <j-select-option value="WRITE_PROPERTY"
                            >{{t('Detail.command.index.5rg4ez76m440')}}</j-select-option
                        >
                        <j-select-option value="INVOKE_FUNCTION"
                            >{{t('Detail.command.index.5rg4ez76mcw0')}}</j-select-option
                        >
                    </j-select>
                </j-form-item>
            </j-col>
            <j-col
                class="inputs"
                :span="
                    modelRef.messageType === 'READ_PROPERTY' ||
                    actionType === 'latestData'
                        ? 24
                        : 12
                "
                v-if="
                    (actionType === 'command' &&
                        ['READ_PROPERTY', 'WRITE_PROPERTY'].includes(
                            modelRef.messageType,
                        )) ||
                    actionType === 'latestData'
                "
            >
                <j-form-item
                    :name="['message', 'properties']"
                    :label="t('Detail.command.index.5rg4ez76mkc0')"
                    :rules="{
                        required: true,
                        message: t('Detail.command.index.5rg4ez76mqc0'),
                    }"
                >
                    <j-select
                        :placeholder="t('Detail.command.index.5rg4ez76mqc0')"
                        v-model:value="modelRef.message.properties"
                        show-search
                        @change="onPropertyChange"
                    >
                        <j-select-option
                            v-for="i in metadata?.properties || []"
                            :key="i.id"
                            :value="i.id"
                            :label="i.name"
                            >{{ i.name }}</j-select-option
                        >
                    </j-select>
                </j-form-item>
            </j-col>
            <j-col
                :span="12"
                class="inputs"
                v-if="
                    modelRef.messageType === 'WRITE_PROPERTY' &&
                    actionType === 'command'
                "
            >
                <j-form-item
                    :name="['message', 'value']"
                    :label="t('Detail.command.index.5rg4ez76n080')"
                    :rules="{
                        required: true,
                        message: t('Detail.command.index.5rg4ez76n6o0'),
                    }"
                >
                    <ValueItem
                        v-model:modelValue="modelRef.message.value"
                        :itemType="
                            property.valueType?.type || property.type || 'int'
                        "
                        :options="
                            property.valueType?.type === 'enum'
                                ? (property?.valueType?.elements || []).map(
                                      (item) => {
                                          return {
                                              label: item?.text,
                                              value: item?.value,
                                          };
                                      },
                                  )
                                : property.valueType?.type === 'boolean'
                                ? [
                                      { label: t('Detail.command.index.5rg4ez76nc80'), value: true },
                                      { label: t('Detail.command.index.5rg4ez76nhs0'), value: false },
                                  ]
                                : undefined
                        "
                    />
                </j-form-item>
            </j-col>
            <j-col :span="24" v-if="modelRef.messageType === 'INVOKE_FUNCTION'" class="inputs">
                <j-form-item
                    :name="['message', 'functionId']"
                    :label="t('Detail.command.index.5rg4ez76nps0')"
                    :rules="{
                        required: true,
                        message: t('Detail.command.index.5rg4ez76nv80'),
                    }"
                >
                    <j-select
                        :placeholder="t('Detail.command.index.5rg4ez76nv80')"
                        v-model:value="modelRef.message.functionId"
                        show-search
                        @change="funcChange"
                    >
                        <j-select-option
                            v-for="i in metadata?.functions || []"
                            :key="i.id"
                            :value="i.id"
                            :label="i.name"
                            >{{ i.name }}</j-select-option
                        >
                    </j-select>
                </j-form-item>
            </j-col>
            <j-col
                :span="24"
                v-if="
                    modelRef.messageType === 'INVOKE_FUNCTION' &&
                    modelRef.message?.functionId &&
                    modelRef.message?.inputs?.length
                "
                class="inputs"
            >
                <j-form-item
                    :name="['message', 'inputs']"
                    :label="t('Detail.command.index.5rg4ez76o0w0')"
                    :rules="{
                        required: true,
                        message: t('Detail.command.index.5rg4ez76o6w0'),
                    }"
                >
                    <EditTable
                        ref="editRef"
                        v-model="modelRef.message.inputs"
                    />
                </j-form-item>
            </j-col>
        </j-row>
    </j-form>
</template>

<script lang="ts" setup>
import EditTable from './EditTable.vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const formRef = ref();

const props = defineProps({
    actionType: {
        type: String,
        default: '',
    },
    modelValue: {
        type: Object,
        default: () => {},
    },
    metadata: {
        type: Object,
        default: () => {
            return {
                properties: [],
                functions: [],
            };
        },
    },
});

const emit = defineEmits(['update:modelValue'])

const editRef = ref();

const modelRef = reactive({
    messageType: 'READ_PROPERTY',
    message: {
        properties: undefined,
        functionId: undefined,
        inputs: [],
        value: undefined,
    },
});

const property = ref<any>({});

const onPropertyChange = (val: string) => {
    if (val) {
        const _item = props.metadata?.properties.find(
            (item: any) => item.id === val,
        );
        property.value = _item || {};
        modelRef.message.value = undefined
    }
};

const onTypeChange = () => {
    modelRef.message = {
        properties: undefined,
        functionId: undefined,
        inputs: [],
        value: undefined,
    };
};

watch(
    () => props.modelValue,
    (newVal) => {
        if (newVal) {
            Object.assign(modelRef, newVal);
            if (newVal?.message?.properties) {
                onPropertyChange(newVal?.message?.properties);
            }
        }
    },
    {
        immediate: true,
    },
);

const funcChange = (val: string) => {
    if (val) {
        const arr =
            props.metadata?.functions.find((item: any) => item.id === val)
                ?.inputs || [];
        const list = arr.map((item: any) => {
            return {
                id: item.id,
                name: item.name,
                value: undefined,
                valueType: item?.valueType?.type,
            };
        });
        modelRef.message.inputs = list;
    }
};

const saveBtn = () =>
    new Promise((resolve) => {
        formRef.value
            .validate()
            .then(async (_data: any) => {
                if (modelRef.message.inputs?.length) {
                    await editRef.value?.onSave().catch(() => {
                        resolve(false);
                    });
                }
                emit('update:modelValue', _data)
                resolve(_data);
            })
            .catch((err: any) => {
                resolve(err);
            });
    });

defineExpose({ saveBtn });
</script>

<style lang="less" scoped>
.inputs {
    .ant-form-item:last-child {
        margin-bottom: 0;
    }
}
</style>