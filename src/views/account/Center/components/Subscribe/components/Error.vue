<template>
    <j-modal visible @cancel="emit('close')">
        <template v-if="type === 'dingTalk'">
            <p>{{t('Subscribe.components.Error.5rmxuoavajc0')}}</p>
        </template>
        <template v-else-if="type === 'weixin'">
            <p>{{t('Subscribe.components.Error.5rmxuoavbtg0')}}</p>
        </template>
        <template v-else-if="type === 'email'">
            <p>{{t('Subscribe.components.Error.5rmxuoavc0g0')}}</p>
        </template>
        <template v-else>
            <p>{{t('Subscribe.components.Error.5rmxuoavc5k0')}}</p>
        </template>
        <template #footer>
            <j-button @click="emit('close')">{{t('Subscribe.components.Error.5rmxuoavcb40')}}</j-button>
            <j-button @click="onBind" type="primary" v-if="['voice', 'sms'].includes(type)">{{t('Subscribe.components.Error.5rmxuoavch40')}}</j-button>
        </template>
    </j-modal>
</template>

<script lang="ts" setup>
import { onlyMessage } from '@/utils/comm';
import { PropType } from 'vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
type Type = 'dingTalk' | 'weixin' | 'email' | 'voice' | 'sms';

const emit = defineEmits(['close']);
const props = defineProps({
    type: {
        type: String as PropType<Type>,
        default: 'dingTalk',
    },
});

const onBind = () => {
    onlyMessage(t('Subscribe.components.Error.5rmxuoavcmg0'))
}
</script>