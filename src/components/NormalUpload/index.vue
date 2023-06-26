<template>
    <j-space align="end">
        <j-upload
            v-model:fileList="modelValue.upload"
            name="file"
            :action="FILE_UPLOAD"
            :headers="{
                'X-Access-Token': LocalStore.get(TOKEN_KEY),
            }"
            :maxCount="1"
            :showUploadList="false"
            @change="uploadChange"
            :accept="
                props?.file?.fileType ? `.${props?.file?.fileType}` : '.xlsx'
            "
            :before-upload="beforeUpload"
        >
            <j-button>
                <template #icon><AIcon type="UploadOutlined" /></template>
                {{t('components.NormalUpload.index.5rlcirxqb500')}}
            </j-button>
        </j-upload>
        <div style="margin-left: 20px">
            <j-space>
                {{t('components.NormalUpload.index.5rlcirxqcmo0')}}
                <a @click="downFile('xlsx')">.xlsx</a>
                <a @click="downFile('csv')">.csv</a>
            </j-space>
        </div>
    </j-space>
    <div style="margin-top: 20px" v-if="importLoading">
        <j-badge v-if="flag" status="processing" :text="t('components.NormalUpload.index.5rlcirxqcts0')" />
        <j-badge v-else status="success" :text="t('components.NormalUpload.index.5rlcirxqcys0')" />
        <span>{{t('components.NormalUpload.index.total') + count }}</span>
        <p style="color: red">{{ errMessage }}</p>
    </div>
</template>

<script lang="ts" setup>
import { FILE_UPLOAD } from '@/api/comm';
import { TOKEN_KEY } from '@/utils/variable';
import { LocalStore, onlyMessage } from '@/utils/comm';
import { downloadFileByUrl } from '@/utils/utils';
import {
    deviceImport,
    templateDownload,
} from '@/api/device/instance';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { message } from 'jetlinks-ui-components';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
type Emits = {
    (e: 'update:modelValue', data: string[]): void;
};
const emit = defineEmits<Emits>();

const props = defineProps({
    // 组件双向绑定的值
    modelValue: {
        type: Array,
        default: () => [],
    },
    product: {
        type: String,
        default: '',
    },
    file: {
        type: Object,
        default: () => {
            return {
                fileType: 'xlsx',
                autoDeploy: false,
            };
        },
    },
    url: {
        type: Object,
        default: () => {
            return {
                fileType: 'xlsx',
                autoDeploy: false,
            };
        },
    },
});

const importLoading = ref<boolean>(false);
const flag = ref<boolean>(false);
const count = ref<number>(0);
const errMessage = ref<string>('');

const downFile = async (type: string) => {
    const res: any = await templateDownload(props.product, type);
    if (res) {
        const blob = new Blob([res], { type: type });
        const url = URL.createObjectURL(blob);
        downloadFileByUrl(url, `设备导入模板`, type);
    }
};

const beforeUpload = (_file: any) => {
    const fileType = props?.file?.fileType === 'csv' ? 'csv' : 'xlsx';
    const isCsv = _file.type === 'text/csv';
    const isXlsx = _file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    if (!isCsv && fileType !== 'xlsx') {
        onlyMessage(t('components.NormalUpload.index.5rlcirxqd400'), 'warning');
    }
    if (!isXlsx && fileType !== 'csv') {
        onlyMessage(t('components.NormalUpload.index.5rlcirxqd9k0'), 'warning');
    }
    return (isCsv && fileType !== 'xlsx') || (isXlsx && fileType !== 'csv');
};

const submitData = async (fileUrl: string) => {
    if (!!fileUrl) {
        count.value = 0;
        errMessage.value = '';
        flag.value = true;
        const autoDeploy = !!props?.file?.autoDeploy || false;
        importLoading.value = true;
        let dt = 0;
        const source = new EventSourcePolyfill(
            deviceImport(props.product, fileUrl, autoDeploy),
        );
        source.onmessage = (e: any) => {
            const res = JSON.parse(e.data);
            if (res.success) {
                const temp = res.result.total;
                dt += temp;
                count.value = dt;
            } else {
                errMessage.value = res.message || t('components.NormalUpload.index.5rlcirxqdf40');
            }
        };
        source.onerror = (e: { status: number }) => {
            if (e.status === 403) errMessage.value = t('components.NormalUpload.index.5rlcirxqdkg0');
            flag.value = false;
            source.close();
        };
        source.onopen = () => {};
    } else {
        message.error(t('components.NormalUpload.index.5rlcirxqdpg0'));
    }
};

const uploadChange = async (info: Record<string, any>) => {
    if (info.file.status === 'done') {
        const resp: any = info.file.response || { result: '' };
        await submitData(resp?.result || '');
    }
};
</script>