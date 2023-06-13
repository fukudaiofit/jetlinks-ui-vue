export default {
    pages: {
        //物联网
        iot: {
            //首页
            home: {
                common: {
                    device: '创建产品'
                },
                iotGuidance: {
                    title: '物联网引导',
                    step2: '创建设备',
                    step3: '规矩引擎',
                },
                op: {
                    title: '运维引导',
                    step1: '设备接入配置',
                    step2: '日志排查',
                    step3: '实时监控'
                },
                device: {
                    title: '设备统计',
                    product: '产品数量',
                    amount: '设备数量'
                },
                basics: {
                    title: '基础统计',
                    cpu: 'CPU使用率',
                    jvm: 'JVM内存'
                },
                deviceTips: {
                    title: '设备接入推荐步骤',
                    tooltip: '不同的设备因为通信协议的不同，存在接入步骤的差异',
                    step2: '配置产品接入方式',
                    step3: '添加测试设备',
                    step4: '功能调试',
                    step5: '批量添加设备',
                    step1Content: '产品是设备的集合，通常指一组具有相同功能的设备。物联设备必须通过产品进行接入方式配置。',
                    step2Content: '通过产品对同一类型的设备进行统一的接入方式配置。请参照设备铭牌说明选择匹配的接入方式。',
                    step3Content: '添加单个设备，用于验证产品模型是否配置正确。',
                    step4Content: '对添加的测试设备进行功能调试，验证能否连接到平台，设备功能是否配置正确。',
                    step5Content: '批量添加同一产品下的设备',
                },
                opTips: {
                    title: '运维管理推荐步骤',
                    tooltip: '请根据业务需要对下述步骤进行选择性操作。',
                    step1: '协议管理',
                    step2: '证书管理',
                    step3: '网络组件',
                    step4: '设备接入网关',
                    step5: '日志管理',
                    step1Content: '根据业务需求自定义开发对应的产品（设备模型）接入协议，并上传到平台。',
                    step2Content: '统一维护平台内的证书，用于数据通信加密。',
                    step3Content: '根据不同的传输类型配置平台底层网络组件相关参数。',
                    step4Content: '根据不同的传输类型，关联消息协议，配置设备接入网关相关参数。',
                    step5Content: '监控系统日志，及时处理系统异常。',
                },
                architecture: '平面架构图'
            },
            //通知管理
            notice: {
                common: {
                    Records: '通知记录',
                    dingding: '钉钉消息',
                    robot: '群机器人消息'
                },
                config: {
                    disposition: '配置名称',
                    synchronization: '同步用户',
                    addresser: '发件人',
                    addresserContent: '用于发送邮件时“发件人“信息的显示',
                    userNameDes: '用该账号进行发送邮件。',
                    pwdDes: '用于账号身份认证，认证通过后可通过该账号进行发送邮件。',
                    addresserTip: '请输入发件人',
                    corpSecretTip: '请输入corpSecret',
                    serverAddress: '服务器地址',
                    serverTip: '请输入服务器地址',
                    serAddContent1: ' 下拉可选择国内常用的邮箱服务配置，也支持手动输入其他地址。',
                    serAddContent2: ' 系统使用POP协议。POP允许电子邮件客户端下载服务器上的邮件，但是您在电子邮件客户端的操作（如：移动邮件、标记已读等），这时不会反馈到服务器上。',
                    aliControls: '阿里云管理控制台:',
                    regionID: '阿里云服务地域与对应的RegionID。请根据购买的阿里云服务器地域进行选择。',
                    AccesskeyID: '用于程序通知方式调用云服务费API的用户标识和秘钥获取路径：“阿里云管理控制台”--“用户头像”--“”--“AccessKey管理”--“查看”'
                }
            }
        }
    }
}   