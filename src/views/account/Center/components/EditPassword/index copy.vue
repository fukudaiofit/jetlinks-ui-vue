<template>
    <j-modal
        visible
        :title="t('components.EditPassword.index copy.5rmxmivhyqg0')"
        @ok="handleOk"
        width="520px"
        :confirmLoading="loading"
        @cancel="emits('close')"
    >
        <j-form :model="form" layout="vertical" ref="formRef">
            <j-form-item
                :label="t('components.EditPassword.index copy.5rmxmivhzzg0')"
                name="oldPassword"
                :rules="[
                    { required: true, message: t('components.EditPassword.index copy.5rmxmivi0880') },
                    { validator: checkMethods.old, trigger: 'blur' },
                ]"
            >
                <j-input
                    v-model:value="form.oldPassword"
                    :placeholder="t('components.EditPassword.index copy.5rmxmivi0d40')"
                />
            </j-form-item>
            <j-form-item
                :label="t('components.EditPassword.index copy.5rmxmivi0go0')"
                name="newPassword"
                :rules="[
                    { required: true, message: t('components.EditPassword.index copy.5rmxmivi0880') },
                    { validator: checkMethods.new, trigger: 'blur' },
                ]"
            >
                <j-input-password
                    v-model:value="form.newPassword"
                    :placeholder="t('components.EditPassword.index copy.5rmxmivi0880')"
                />
            </j-form-item>
            <j-form-item
                :label="t('components.EditPassword.index copy.5rmxmivi0n00')"
                name="confirmPassword"
                :rules="[
                    { required: true, message: t('components.EditPassword.index copy.5rmxmivi0rg0') },
                    { validator: checkMethods.confirm, trigger: 'blur' },
                ]"
            >
                <j-input-password
                    v-model:value="form.confirmPassword"
                    :placeholder="t('components.EditPassword.index copy.5rmxmivi0vg0')"
                />
            </j-form-item>
        </j-form>
    </j-modal>
</template>

<script setup lang="ts">
import {
    updateMepsd_api,
    checkOldPassword_api,
    validateField_api,
} from '@/api/account/center';
import { onlyMessage } from '@/utils/comm';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
type formType = {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
};

const emits = defineEmits(['save', 'close']);

const loading = ref(false);
const formRef = ref<any>();
const form = ref<formType>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
});

const checkMethods = {
    old: async (_rule: any, value: string) => {
        if (!value) return Promise.reject(t('components.EditPassword.index copy.5rmxmivi0880'));
        try {
            const resp: any = await checkOldPassword_api(value);
            if (resp.status === 200 && !resp.result.passed)
                return Promise.reject(resp.result.reason);
            else return Promise.resolve();
        } catch (error) {
            return Promise.reject(t('components.EditPassword.index copy.5rmxmivi0yw0'));
        }
    },
    new: async (_rule: any, value: string) => {
        if (!value) return Promise.reject(t('components.EditPassword.index copy.5rmxmivi0880'));
        else if (
            form.value.confirmPassword &&
            value !== form.value.confirmPassword
        )
            return Promise.reject(t('components.EditPassword.index copy.5rmxmivi11k0'));
        try {
            const resp: any = await validateField_api('password', value);
            if (resp.status === 200 && !resp.result.passed)
                return Promise.reject(resp.result.reason);
            else return Promise.resolve();
        } catch (error) {
            return Promise.reject(t('components.EditPassword.index copy.5rmxmivi0yw0'));
        }
    },
    confirm: async (_rule: any, value: string) => {
        if (!value) return Promise.reject();
        else if (form.value.newPassword && value !== form.value.newPassword) {
            formRef.value?.validate('newPassword');
        }
        try {
            const resp: any = await validateField_api('password', value);
            if (resp.status === 200 && !resp.result.passed)
                return Promise.reject(resp.result.reason);
            else return Promise.resolve();
        } catch (error) {
            return Promise.reject(t('components.EditPassword.index copy.5rmxmivi0yw0'));
        }
    },
};

const handleOk = () => {
    formRef.value?.validate().then(() => {
        loading.value = true;
        const params = {
            oldPassword: form.value.oldPassword,
            newPassword: form.value.newPassword,
        };
        updateMepsd_api(params)
            .then((resp) => {
                if (resp.status === 200) {
                    onlyMessage(t('components.EditPassword.index copy.5rmxmivi14g0'), 'success');
                    emits('save');
                }
            })
            .finally(() => (loading.value = false));
    });
};
</script>

<style scoped></style>
