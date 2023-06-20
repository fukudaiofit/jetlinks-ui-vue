<template>
    <div class="doc">
      <div class="url">
        {{t('DuerOS.Detail.doc.5rg4fahrxhk0')}}
        <a
          href="https://dueros.baidu.com/dbp/bot/index#/iotopenplatform"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://dueros.baidu.com/dbp/bot/index#/iotopenplatform
        </a>
      </div>
      <h1>1. {{t('DuerOS.Detail.doc.5rg4fahryk00')}}</h1>
      <div>
        DuerOS支持家居场景下的云端控制，该页面主要将平台的产品与DuerOS支持语音控制的产品进行映射，以到达小度平台控制本平台设备的目的。
      </div>
      <h1>2. {{t('DuerOS.Detail.doc.5rg4fahrywg0')}}</h1>
      <div>
        <h2>1、在百度小度技能平台创建技能，并授权。完成物联网平台与DuerOS的关联。</h2>
        <div class="image">
          <j-image width="100%" :src="getImage('/cloud/dueros-doc.jpg')" />
        </div>
        <h1>{{t('DuerOS.Detail.doc.5rg4fahrz2k0')}}</h1>
        <div>{{t('DuerOS.Detail.doc.5rg4fahrz940')}}</div>
        <div>请复制并填写: https://{location.host}/#/user/login</div>
        <h1>Client_Id</h1>
        <div>{{t('DuerOS.Detail.doc.5rg4fahrzfw0')}}</div>
        <div class="image">
          <j-image width="100%" :src="getImage('/cloud/dueros-doc1.png')" />
        </div>
        <h1>{{t('DuerOS.Detail.doc.5rg4fahrzl80')}}</h1>
        <div>{{t('DuerOS.Detail.doc.5rg4fahrzrk0')}}</div>
        <div class="image">
          <j-image width="100%" :src="getImage('/cloud/dueros-doc2.png')" />
        </div>
        <h1>Token地址</h1>
        <div>请复制并填写：HTTPS://{location.host}/api/v1/token</div>
        <h1>ClientSecret</h1>
        <div>{{t('DuerOS.Detail.doc.5rg4fahrzy00')}}</div>
        <div class="image">
          <j-image width="100%" :src="getImage('/cloud/dueros-doc3.png')" />
        </div>
        <div></div>
        <h1>WebService</h1>
        <div>{{t('DuerOS.Detail.doc.5rg4fahs06c0')}}</div>
        <h2>2、登录物联网平台，进行平台内产品与DuerOS产品的数据映射。</h2>
        <h2>
          3、智能家居用户通过物联网平台中的用户，登录小度APP，获取平台内当前用户的所属设备。获取后即可进行语音控制。
        </h2>
      </div>
      <h1>3. {{t('DuerOS.Detail.doc.5rg4fahs0bo0')}}</h1>
      <div>
        <h2>
          1、“设备类型”为DuerOS平台拟定的标准规范，设备类型将决定【动作映射】中“动作”的下拉选项，以及【属性映射】中“Dueros属性”的下拉选项
        </h2>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { getImage } from '@/utils/comm';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style lang="less" scoped>
.doc {
    height: 100%;
    padding: 24px;
    overflow-y: auto;
    color: rgba(#000, 0.8);
    font-size: 14px;
    background-color: #fafafa;

    .url {
      padding: 8px 16px;
      color: #2f54eb;
      background-color: rgba(#a7bdf7, 0.2);
    }

    h1 {
      margin: 16px 0;
      color: rgba(#000, 0.85);
      font-weight: bold;
      font-size: 14px;

      &:first-child {
        margin-top: 0;
      }
    }

    h2 {
      margin: 6px 0;
      color: rgba(0, 0, 0, 0.8);
      font-size: 14px;
    }

    .image {
      margin: 16px 0;
    }
  }
</style>