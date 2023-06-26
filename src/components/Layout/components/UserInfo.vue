<template>
    <div>
        <j-dropdown placement="bottomRight">
            <div style="cursor: pointer;height: 100%;">
                <img
                    :src="userInfo.avatar"
                    alt=""
                    style="width: 24px; margin-right: 12px"
                />
                <span>{{ userInfo.name }}</span>
            </div>
            <template #overlay>
                <j-menu>
                    <j-menu-item @click="push('/account/center')" style="width: 160px;">
                        <AIcon type="UserOutlined" style="margin-right: 8px;" />
                        <span>{{t('Layout.components.UserInfo.5rlcdj5d56o0')}}</span>
                    </j-menu-item>
                    <j-menu-item @click="logOut">
                        <AIcon type="LogoutOutlined" style="margin-right: 8px;" />
                        <span>{{t('Layout.components.UserInfo.5rlcdj5d6tc0')}}</span>
                    </j-menu-item>
                </j-menu>
            </template>
        </j-dropdown>
    </div>
</template>

<script setup lang="ts">
import { loginout_api } from '@/api/login';
import { useUserInfo } from '@/store/userInfo';
import { LoginPath } from '@/router/menu'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const {push} = useRouter();

const userInfo = useUserInfo().$state.userInfos as any;


const logOut = () => {
    loginout_api().then(() => {
        localStorage.clear();
        push(LoginPath);
    });
};
</script>

<style scoped></style>
