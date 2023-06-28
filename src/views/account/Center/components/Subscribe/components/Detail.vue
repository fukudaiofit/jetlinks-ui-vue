<template>
    <div>
        <div><j-button type="link">{{t('Subscribe.components.Detail.5rmxuhs2ap40')}}</j-button></div>
        <template v-if="['dingTalk', 'weixin'].includes(type)">
            <div><j-button type="link">{{t('Subscribe.components.Detail.5rmxuhs2bpw0')}}</j-button></div>
            <p>{{t('Subscribe.components.Detail.5rmxuhs2bwg0')}}</p>
        </template>
        <template v-else>
            <div><j-button type="link">{{t('Subscribe.components.Detail.5rmxuhs2bpw0')}}</j-button></div>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
type Type = 'dingTalk' | 'weixin' | 'email' | 'voice' | 'sms';
const props = defineProps({
    type: {
        type: String as PropType<Type>,
        default: 'dingTalk',
    },
});
</script>