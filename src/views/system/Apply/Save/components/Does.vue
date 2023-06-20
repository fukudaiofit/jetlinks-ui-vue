<template>
    <div class="does-container">
        <div v-show="props.type === 'internal-standalone'">
            <h1>1.概述</h1>
            <div>
                {{t('Save.components.Does.5rgb1lt1h000')}}<span>{{t('Save.components.Does.5rgb1lt1ibk0')}}</span>{{t('Save.components.Does.5rgb1lt1ijs0')}}<span
                    >{{t('Save.components.Does.5rgb1lt1ip80')}}</span
                >
                ，例如将可视化平台集成至物联网平台，或者将物联网平台集成至可视化平台。以实现多处访问、集中管控的业务场景。
            </div>
            <div>
                {{t('Save.components.Does.5rgb1lt1itc0')}}<span>{{t('Save.components.Does.5rgb1lt1ixw0')}}</span>{{t('Save.components.Does.5rgb1lt1j1s0')}}<span>{{t('Save.components.Does.5rgb1lt1j5k0')}}</span>，互不影响。
            </div>
            <div class="image">
                <j-image width="100%" :src="img1" />
            </div>

            <h1>2.接入方式说明</h1>
            <div>1、页面集成</div>
            <div>
                {{t('Save.components.Does.5rgb1lt1j9s0')}}<span>{{t('Save.components.Does.5rgb1lt1jdk0')}}</span>至物联网平台中。为实现应用与物联网平台数据互联互通，
                <span>{{t('Save.components.Does.5rgb1lt1jh00')}}</span>。
            </div>
            <div>2、API客户端</div>
            <div>
                <span>{{t('Save.components.Does.5rgb1lt1jl40')}}</span>{{t('Save.components.Does.5rgb1lt1jow0')}}<span>{{t('Save.components.Does.5rgb1lt1jsk0')}}</span>
                {{t('Save.components.Does.5rgb1lt1jw40')}}<span
                    >{{t('Save.components.Does.5rgb1lt1jsk0')}}</span
                >
                {{t('Save.components.Does.5rgb1lt1jzk0')}}<span>{{t('Save.components.Does.5rgb1lt1jl40')}}</span>{{t('Save.components.Does.5rgb1lt1k3g0')}}<span>{{t('Save.components.Does.5rgb1lt1k740')}}</span>。
            </div>
            <div>3、API服务</div>
            <div>
                <span>{{t('Save.components.Does.5rgb1lt1kas0')}}</span
                >{{t('Save.components.Does.5rgb1lt1jow0')}}<span>{{t('Save.components.Does.5rgb1lt1jl40')}}</span>的接口，实现物联网平台的服务调用能力，
                <span>{{t('Save.components.Does.5rgb1lt1kec0')}}</span>。
            </div>
            <div>
                {{t('Save.components.Does.5rgb1lt1kjs0')}}<span>{{t('Save.components.Does.5rgb1lt1kmo0')}}</span>{{t('Save.components.Does.5rgb1lt1kq80')}}<span>“第三方应用”用户</span>。用户的
                <span>{{t('Save.components.Does.5rgb1lt1ksw0')}}</span>分别对应appid/secureKey。
            </div>
            <div>
                {{t('Save.components.Does.5rgb1lt1kwc0')}}<span>{{t('Save.components.Does.5rgb1lt1kz40')}}</span>{{t('Save.components.Does.5rgb1lt1l1w0')}}<span
                    >其他-{'>'}赋权</span
                >
                {{t('Save.components.Does.5rgb1lt1l4o0')}}<span>{{t('Save.components.Does.5rgb1lt1l7k0')}}</span>。
            </div>
            <div>4、单点登录</div>
            <div>{{t('Save.components.Does.5rgb1lt1lac0')}}<span>{{t('Save.components.Does.5rgb1lt1ldc0')}}</span>{{t('Save.components.Does.5rgb1lt1lg40')}}</div>
        </div>
        <div v-show="props.type === 'internal-integrated'">
            <h1>1.概述</h1>
            <div>
                {{t('Save.components.Does.5rgb1lt1lis0')}}<span>{{t('Save.components.Does.5rgb1lt1ibk0')}}</span>{{t('Save.components.Does.5rgb1lt1ijs0')}}<span
                    >{{t('Save.components.Does.5rgb1lt1ip80')}}</span
                >
                ，例如将可视化平台集成至物联网平台，或者将物联网平台集成至可视化平台。以实现多处访问、集中管控的业务场景。
            </div>
            <div>{{t('Save.components.Does.5rgb1lt1itc0')}}<span>{{t('Save.components.Does.5rgb1lt1llk0')}}</span>。</div>
            <div class="image">
                <j-image width="100%" :src="img2" />
            </div>
            <h1>2.接入方式说明</h1>
            <div>1、页面集成</div>
            <div>
                {{t('Save.components.Does.5rgb1lt1j9s0')}}<span>{{t('Save.components.Does.5rgb1lt1jdk0')}}</span>
                {{t('Save.components.Does.5rgb1lt1lo80')}}
            </div>
            <div>2、API客户端</div>
            <div>
                <span>{{t('Save.components.Does.5rgb1lt1jl40')}}</span
                >去请求其他应用的接口，以实现将物联网平台集成至其他应用
            </div>
        </div>
        <div v-show="props.type === 'dingtalk-ent-app'">
            <div class="url">
                {{t('Save.components.Does.5rgb1lt1lr80')}}
                <a
                    href="https://open-dev.dingtalk.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    https://open-dev.dingtalk.com
                </a>
            </div>
            <h1>1.概述</h1>
            <div>{{t('Save.components.Does.5rgb1lt1luc0')}}<span>{{t('Save.components.Does.5rgb1lt1jl40')}}</span></div>
            <div class="image">
                <j-image width="100%" :src="img4" />
            </div>
            <h1>2.接入方式说明</h1>
            <div>1、单点登录</div>
            <div>{{t('Save.components.Does.5rgb1lt1lx40')}}</div>
        </div>
        <div v-show="props.type === 'wechat-webapp'">
            <div class="url">
                {{t('Save.components.Does.5rgb1lt1lzw0')}}
                <a
                    href="https://open.weixin.qq.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    https://open.weixin.qq.com
                </a>
            </div>
            <h1>1.概述</h1>
            <div>{{t('Save.components.Does.5rgb1lt1m300')}}<span>{{t('Save.components.Does.5rgb1lt1jl40')}}</span></div>
            <div class="image">
                <j-image width="100%" :src="img3" />
            </div>
            <h1>2.接入方式说明</h1>
            <div>1、单点登录</div>
            <div>{{t('Save.components.Does.5rgb1lt1m5s0')}}</div>
        </div>
        <div v-show="props.type === 'third-party'">
            <h1>1. {{t('Save.components.Does.5rgb1lt1m900')}}</h1>
            <div>
                {{t('Save.components.Does.5rgb1lt1mbs0')}}<span>{{t('Save.components.Does.5rgb1lt1meo0')}}</span>{{t('Save.components.Does.5rgb1lt1mj80')}}<span
                    >{{t('Save.components.Does.5rgb1lt1ip80')}}</span
                >
                。例如将公司业务管理系统集成至物联网平台，或者将物联网平台集成至业务管理系统。以实现多处访问、集中管控的业务场景。
            </div>
            <div class="image">
                <j-image width="100%" :src="img5" />
            </div>
            <h1>2.接入方式说明</h1>
            <div>1、页面集成</div>
            <div>
                {{t('Save.components.Does.5rgb1lt1j9s0')}}<span>{{t('Save.components.Does.5rgb1lt1jdk0')}}</span>至物联网平台中。为实现应用与物联网平台数据互联互通，
                <span>{{t('Save.components.Does.5rgb1lt1mm80')}}</span>。
            </div>
            <div>2、API客户端</div>
            <div>
                <span>{{t('Save.components.Does.5rgb1lt1jl40')}}</span>{{t('Save.components.Does.5rgb1lt1jow0')}}<span>{{t('Save.components.Does.5rgb1lt1meo0')}}</span>
                {{t('Save.components.Does.5rgb1lt1mp00')}}<span>{{t('Save.components.Does.5rgb1lt1meo0')}}</span>登录后可以访问
                <span>{{t('Save.components.Does.5rgb1lt1jl40')}}</span>{{t('Save.components.Does.5rgb1lt1k3g0')}}<span>{{t('Save.components.Does.5rgb1lt1k740')}}</span>。
            </div>
            <div>3、API服务</div>
            <div>
                <span>{{t('Save.components.Does.5rgb1lt1meo0')}}</span
                >{{t('Save.components.Does.5rgb1lt1mrs0')}}<span
                    >{{t('Save.components.Does.5rgb1lt1jl40')}}</span
                >
                {{t('Save.components.Does.5rgb1lt1mug0')}}<span>{{t('Save.components.Does.5rgb1lt1kec0')}}</span>。
            </div>
            <div>
                {{t('Save.components.Does.5rgb1lt1kjs0')}}<span>{{t('Save.components.Does.5rgb1lt1kmo0')}}</span>{{t('Save.components.Does.5rgb1lt1kq80')}}<span>“第三方应用”用户</span>。用户的
                <span>{{t('Save.components.Does.5rgb1lt1ksw0')}}</span>分别对应appid/secureKey。
            </div>
            <div>
                {{t('Save.components.Does.5rgb1lt1kwc0')}}<span>{{t('Save.components.Does.5rgb1lt1kz40')}}</span>{{t('Save.components.Does.5rgb1lt1l1w0')}}<span
                    >其他-{'>'}赋权</span
                >
                {{t('Save.components.Does.5rgb1lt1l4o0')}}<span>{{t('Save.components.Does.5rgb1lt1l7k0')}}</span>。
            </div>
            <div>4、单点登录</div>
            <div>{{t('Save.components.Does.5rgb1lt1lac0')}}<span>{{t('Save.components.Does.5rgb1lt1ldc0')}}</span>{{t('Save.components.Does.5rgb1lt1lg40')}}</div>
        </div>
        <div v-show="props.type === 'wechat-miniapp'">
            {{t('Save.components.Does.5rgb1lt1mx00')}}
        </div>
    </div>
</template>

<script setup lang="ts">
import { getImage } from '@/utils/comm';
import type { applyType } from '../typing';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps<{
    type: applyType;
}>();

const img1 = getImage('/apply/1.png');
const img2 = getImage('/apply/2.png');
const img3 = getImage('/apply/3.png');
const img4 = getImage('/apply/4.png');
const img5 = getImage('/apply/5.png');
</script>

<style lang="less" scoped>
.does-container {
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
