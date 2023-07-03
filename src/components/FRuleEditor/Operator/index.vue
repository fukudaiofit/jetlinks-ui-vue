<template>
  <div class="operator-box">
    <j-input-search @search="search" allow-clear :placeholder="t('FRuleEditor.Operator.index.5rlca4rnhls0')" />
    <div class="tree">
      <j-tree @select="selectTree" :field-names="{ title: 'name', key: 'id', }" auto-expand-parent :tree-data="data">
        <template #title="node">
          <div class="node">
            <div style="max-width: 180px">
              <Ellipsis>{{ node.name }}</Ellipsis>
            </div>
            <div :class="node.children?.length > 0 ? 'parent' : 'add'">
              <j-popover v-if="node.type === 'property'" placement="right"
                :title="t('FRuleEditor.Operator.index.5rlca4rnj3s0')">
                <template #content>
                  <j-space direction="vertical">
                    <j-tooltip placement="right" :title="t('FRuleEditor.Operator.index.5rlca4rnjfc0')">
                      <j-button type="text" @click="recentClick(node)">
                        {{ t('FRuleEditor.Operator.index.realTime') }}
                      </j-button>
                    </j-tooltip>
                    <j-tooltip placement="right" :title="t('FRuleEditor.Operator.index.5rlca4rnji40')">
                      <j-button @click="lastClick(node)" type="text">
                        {{ t('FRuleEditor.Operator.index.5rlca4rnjls0') }}
                      </j-button>
                    </j-tooltip>
                  </j-space>
                </template>
                <a>{{ t('FRuleEditor.Operator.index.5rlca4rnjw00') }}</a>
              </j-popover>

              <a v-else @click="addClick(node)">
                {{ t('FRuleEditor.Operator.index.5rlca4rnjw00') }}
              </a>
            </div>
          </div>
        </template>
      </j-tree>
    </div>
    <div class="explain">
      <Markdown :source="item?.description || ''"></Markdown>
    </div>
  </div>
</template>
<script setup lang="ts" name="Operator">
import { useProductStore } from '@/store/product';
import type { OperatorItem } from './typings';
import { treeFilter } from '@/utils/tree'
import { PropertyMetadata } from '@/views/device/Product/typings';
import { getOperator } from '@/api/device/product'
import Markdown from 'vue3-markdown-it'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps({
  id: String
})

interface Emits {
  (e: 'addOperatorValue', data: string): void;
}
const emit = defineEmits<Emits>();

const item = ref<Partial<OperatorItem>>()
const data = ref<OperatorItem[]>([])
const dataRef = ref<OperatorItem[]>([])

const search = (value: string) => {
  if (value) {
    const nodes = treeFilter(dataRef.value, value, 'name') as OperatorItem[];
    data.value = nodes;
  } else {
    data.value = dataRef.value;
  }
};

const selectTree = (k: any, info: any) => {
  item.value = info.node as unknown as OperatorItem;
}

const recentClick = (node: OperatorItem) => {
  emit('addOperatorValue', `$recent("${node.id}")`)
}
const lastClick = (node: OperatorItem) => {
  emit('addOperatorValue', `$lastState("${node.id}")`)
}
const addClick = (node: OperatorItem) => {
  emit('addOperatorValue', node.code)
}

const productStore = useProductStore()

const getData = async (id?: string) => {
  const metadata = productStore.current.metadata || '{}';
  const _properties = JSON.parse(metadata).properties || [] as PropertyMetadata[]
  const properties = {
    id: 'property',
    name: t('FRuleEditor.Operator.index.5rlca4rnk2c0'),
    description: '',
    code: '',
    children: _properties
      .filter((p: PropertyMetadata) => p.id !== id)
      .map((p: PropertyMetadata) => ({
        id: p.id,
        name: p.name,
        description: `### ${p.name}
        \n 数据类型: ${p.valueType?.type}
        \n 是否只读: ${p.expands?.readOnly || 'false'}
        \n 可写数值范围: `,
        type: 'property',
      })),
  };
  const response = await getOperator();
  if (response.status === 200) {
    data.value = [properties as OperatorItem, ...response.result];
    dataRef.value = [properties as OperatorItem, ...response.result];
  }
};

watch(() => props.id,
  (val) => {
    getData(val)
  },
  { immediate: true }
)
</script>
<style lang="less" scoped>
.border {
  margin-top: 10px;
  padding: 10px;
  border-top: 1px solid lightgray;
}

.operator-box {
  width: 100%;

  .explain {
    .border;
  }

  .tree {
    .border;

    height: 350px;
    overflow-y: auto;

    .node {
      display: flex;
      justify-content: space-between;
      width: 220px;

      //.add {
      //  display: none;
      //}
      //
      //&:hover .add {
      //  display: block;
      //}

      .parent {
        display: none;
      }
    }
  }
}
</style>