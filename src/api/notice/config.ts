import { patch, post, get, remove } from '@/utils/request'
import type { TemplateFormData } from '@/views/notice/Template/types'

export default {
    // 列表
    list: (data: any) => post(`/notifier/config/_query`, data),
    // 详情
    detail: (id: string): any => get(`/notifier/config/${id}`),
    // 新增
    save: (data: any) => post(`/notifier/config`, data),
    // 修改
    update: (data: any) => patch(`/notifier/config`, data),
    del: (id: string) => remove(`/notifier/config/${id}`),
    getTemplate: (data: any, id: string) => post<TemplateFormData[]>(`/notifier/template/${id}/_query`, data),
    getTemplateDetail: (id: string) => get<TemplateFormData>(`/notifier/template/${id}/detail`),
    debug: (data: any, configId: string, templateId: string) => post(`/notifier/${configId}/${templateId}/_send`, data),
    getHistory: (data: any, id: string) => post(`/notify/history/config/${id}/_query`, data),
    // 获取所有平台用户
    getPlatformUsers: (data: any) => post<any>(`/user/_query/no-paging`, data),
    // 获取所有关系
    getRelationUsers: (data: any) => post<any>(`/relation/_query/no-paging`, data),
    // 钉钉部门
    dingTalkDept: (id: string) => get<any>(`/notifier/dingtalk/corp/${id}/departments/tree`),
    // 钉钉部门人员
    getDingTalkUsers: (configId: string, deptId: string) => get<any>(`/notifier/dingtalk/corp/${configId}/${deptId}/users`),
    // 钉钉已经绑定的人员
    getDingTalkBindUsers: (id: string) => get<any>(`/user/third-party/dingTalk_dingTalkMessage/${id}`),
    // 钉钉绑定用户
    dingTalkBindUser: (data: { userId: string; providerName: string; thirdPartyUserId: string }[], id: string) => patch(`/user/third-party/dingTalk_dingTalkMessage/${id}`, data),
    // 微信部门
    weChatDept: (id: string) => get<any>(`/notifier/wechat/corp/${id}/departments`),
    // 微信部门人员
    getWeChatUsers: (configId: string, deptId: string) => get<any>(`/notifier/wechat/corp/${configId}/${deptId}/users`),
    // 微信已经绑定的人员
    getWeChatBindUsers: (id: string) => get<any>(`/user/third-party/weixin_corpMessage/${id}`),
    // 微信绑定用户
    weChatBindUser: (data: any, id: string) => patch(`/user/third-party/weixin_corpMessage/${id}`, data),
    // 解绑
    unBindUser: (data: any, id: string) => post(`/user/third-party/${id}/_unbind`, data),
    //通知类型
    queryMessageType: () => get(`/notifier/config/types`),
    // 不分页-列表
    queryListNoPaging: (data: any) => post(`/notifier/config/_query/no-paging?paging=false`, data),
    // 
    queryDingTalkUsers: (id: string) => get<any>(`/notifier/dingtalk/corp/${id}/users?sorts[0].name="name"&sorts[0].order=asc`),
    // 
    queryWechatUsers: (id: string) => get<any>(`/notifier/wechat/corp/${id}/users?sorts[0].name="name"&sorts[0].order=asc`),
}