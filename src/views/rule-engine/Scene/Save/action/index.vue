<template>
    <div class="actions">
        <div class="actions-title">
            <span>执行</span>
            <ShakeLimit
                v-if="props.openShakeLimit"
                v-model:value="shakeLimit"
            />
        </div>
        <div class="actions-warp">
            <a-collapse v-model:activeKey="activeKeys">
                <a-collapse-panel key="1">
                    <template #header>
                        <span>
                            串行
                            <span class="panel-tip">
                                按顺序依次执行动作，适用于基于动作输出参数，判断是否执行后续动作的场景
                            </span>
                        </span>
                    </template>
                    <div class="actions-list">
                        <List
                            type="serial"
                            :branchesName="props.name"
                            :parallel="false"
                            :actions="serialArray.length ? serialArray[0].actions : []"
                        />
                    </div>
                </a-collapse-panel>
                <a-collapse-panel key="2">
                    <template #header>
                        <span>
                            并行
                            <span class="panel-tip">
                                同时执行所有动作，适用于不需要关注执行动作先后顺序和结果的场景
                            </span>
                        </span>
                    </template>
                    <div class="actions-list">
                        <List
                            type="parallel"
                            :branchesName="props.name"
                            :parallel="true"
                            :actions="parallelArray.length ? parallelArray[0].actions : []"
                        />
                    </div>
                </a-collapse-panel>
            </a-collapse>
        </div>
    </div>
</template>

<script lang="ts" setup>
import ShakeLimit from '../components/ShakeLimit/index.vue';
import { List } from './ListItem';
import { storeToRefs } from 'pinia';
import { useSceneStore } from '@/store/scene';
import { BranchesThen } from '../../typings';
import { PropType } from 'vue';

interface ActionsProps {
    name: number;
    openShakeLimit?: boolean;
    thenOptions: BranchesThen[];
}

const props = defineProps({
    name: Number,
    thenOptions: {
        type: Array as PropType<ActionsProps['thenOptions']>,
        default: () => [],
    },
    openShakeLimit: Boolean,
});

const shakeLimit = ref({});
const activeKeys = ref<string[]>(['1']);
const parallelArray = ref<BranchesThen[]>([]);
const serialArray = ref<BranchesThen[]>([]);
const lock = ref<boolean>(false)

watch(
    () => props.thenOptions,
    (newVal) => {
        parallelArray.value = newVal.filter((item) => item.parallel);
        serialArray.value = newVal.filter((item) => !item.parallel);

        const isSerialActions = serialArray.value.some((item) => {
            return !!item.actions.length;
        });

        if (
            !lock.value &&
            parallelArray.value.length &&
            (!serialArray.value.length || !isSerialActions)
        ) {
            activeKeys.value = ['2']
            lock.value = true
        }

        //TODO 回传数据
    },
    {
        deep: true,
        immediate: true,
    },
);
</script>

<style lang="less" scoped>
.actions {
    .actions-title {
        display: flex;
        gap: 16px;
        align-items: center;
        margin-bottom: 16px;
        font-weight: 800;
        font-size: 14px;
        line-height: 32px;
    }

    .actions-warp {
        .actions-list {
            width: 100%;
        }
    }

    .panel-tip {
        padding-left: 8px;
        color: rgba(#000, 0.45);
    }
}
</style>