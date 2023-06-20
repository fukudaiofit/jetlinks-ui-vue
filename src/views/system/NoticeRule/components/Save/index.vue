<template>
    <j-modal
        :width="900"
        visible
        :title="t('components.Save.index.5rgaa7r7y2k0')"
        @cancel="emit('close')"
        @ok="onSave"
    >
        <j-steps :current="current" size="small" @change="onChange">
            <j-step v-for="item in stepList" :title="item" :key="item" />
        </j-steps>
        <div style="margin: 20px">
            <template v-if="current === 0">
                <NotifyWay v-model:value="formModel.notifyType" />
            </template>
            <template v-if="current === 1">
                <NotifyConfig
                    v-model:value="formModel.notifierId"
                    :notifyType="formModel.notifyType"
                />
            </template>
            <template v-if="current === 2">
                <NotifyTemplate
                    v-model:value="formModel.templateId"
                    :notifierId="formModel.notifierId"
                />
            </template>
            <template v-if="current === 3">
                <VariableDefinitions
                    :variableDefinitions="_variableDefinitions"
                    :value="formModel.variables"
                    :notify="formModel"
                    ref="variableRef"
                />
            </template>
            <template v-if="current === 4">
                <Role v-model="formModel.role" />
            </template>
        </div>
        <template #footer>
            <j-space>
                <j-button v-if="current === 0" @click="emit('close')"
                    >{{t('components.Save.index.5rgaa7r7zck0')}}</j-button
                >
                <j-button v-else @click="onPrev">{{t('components.Save.index.5rgaa7r7zkg0')}}</j-button>
                <j-button
                    type="primary"
                    @click="onNext"
                    v-if="current !== stepList.length - 1"
                    >{{t('components.Save.index.5rgaa7r7zqk0')}}</j-button
                >
                <j-button type="primary" @click="onSave" v-else>{{t('components.Save.index.5rgaa7r7zvo0')}}</j-button>
            </j-space>
        </template>
    </j-modal>
</template>

<script lang="ts" setup>
import NotifyWay from './components/NotifyWay.vue';
import NotifyConfig from './components/NotifyConfig.vue';
import NotifyTemplate from './components/NotifyTemplate.vue';
import VariableDefinitions from './components/VariableDefinitions.vue';
import Role from '../Role/index.vue';
import { onlyMessage } from '@/utils/comm';
import Template from '@/api/notice/template';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const emit = defineEmits(['close', 'save']);

const stepList = [
    t('components.Save.index.5rgaa7r80140'),
    t('components.Save.index.5rgaa7r806k0'),
    t('components.Save.index.5rgaa7r80bk0'),
    t('components.Save.index.5rgaa7r80go0'),
    t('components.Save.index.5rgaa7r80l80'),
];
const current = ref<number>(0);
const variable = ref([]);
const formModel = reactive({
    notifyType: '',
    notifierId: '',
    templateId: '',
    variables: undefined,
    role: [],
});
const variableRef = ref();

const _variableDefinitions = computed(() => {
    const arr = ['user', 'org']
    return variable.value.filter((item: any) => {
        const _type = item.expands?.businessType || item.type || ''
        return !arr.includes(_type)
    })
})

const jumpStep = async (val: number) => {
    if (val === 1) {
        if (formModel.notifyType) {
            current.value = val;
        } else {
            onlyMessage(t('components.Save.index.5rgaa7r80qw0'), 'error');
        }
    } else if (val === 2) {
        if (formModel.notifierId) {
            current.value = val;
        } else {
            onlyMessage(t('components.Save.index.5rgaa7r80wo0'), 'error');
        }
    } else if (val === 3) {
        if (formModel.templateId) {
            const resp = await Template.getTemplateDetail(formModel.templateId);
            if (resp.status === 200) {
                variable.value = resp.result?.variableDefinitions || [];
                current.value = val;
            }
        } else {
            onlyMessage(t('components.Save.index.5rgaa7r812k0'), 'error');
        }
    } else if (val === 4) {
        if (_variableDefinitions.value.length) {
            formModel.variables = await variableRef.value.onSave();
            if (formModel.variables) {
                current.value = val;
            } else {
                onlyMessage(t('components.Save.index.5rgaa7r81740'), 'error');
            }
        } else {
            current.value = val;
        }
    }
};

const onPrev = () => {
    current.value -= 1;
};

const onNext = () => {
    jumpStep(current.value + 1);
};

const onChange = (cur: number) => {
    jumpStep(cur);
};

const onSave = () => {
    if (formModel.role.length) {
        emit('save');
    } else {
        onlyMessage(t('components.Save.index.5rgaa7r81is0'), 'error');
    }
};
</script>