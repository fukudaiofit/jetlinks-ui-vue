import { getImage } from '@/utils/comm';
import createI18n from "@/locales/index"
const t = createI18n.global.t
// 平台类型
export const platformTypeList = [
  {
    label: "移动OneLink",
    value: 'onelink',
    imgUrl: getImage('/iot-card/onelink.png'),
    imgSize: ['78px', '20px'],
  },
  {
    label: '电信Ctwing',
    value: 'ctwing',
    imgUrl: getImage('/iot-card/ctwingcmp.png'),
    imgSize: ['52px', '25px'],
  },
  {
    label: '联通Unicom',
    value: 'unicom',
    imgUrl: getImage('/iot-card/unicom.png'),
    imgSize: ['56px', '41px'],
  },
];

export const OperatorMap = {
  onelink: t('view.iot-card.data.onelink'),
  ctwing: t('view.iot-card.data.ctwing'),
  unicom: t('view.iot-card.data.unicom'),
}

//运营商
export const OperatorList = [
  {
    label: t('view.iot-card.data.onelink'),
    value: 'onelink',
  },
  {
    label: t('view.iot-card.data.ctwing'),
    value: 'ctwing',
  },
  {
    label: t('view.iot-card.data.unicom'),
    value: 'unicom',
  },
];

// 类型
export const TypeList = [
  {
    label: t('view.iot-card.data.year'),
    value: 'year',
  },
  {
    label: t('view.iot-card.data.season'),
    value: 'season',
  },
  {
    label: t('view.iot-card.data.yemonthar'),
    value: 'month',
  },
  {
    label: t('view.iot-card.data.other'),
    value: 'other',
  },
];

// 支付方式
export const PaymentMethod = [
  {
    label: t('view.iot-card.data.ALIPAY_WAP'),
    value: 'ALIPAY_WAP',
  },
  {
    label: t('view.iot-card.data.ALIPAY_WEB'),
    value: 'ALIPAY_WEB',
  },
  {
    label: t('view.iot-card.data.WEIXIN_JSAPI'),
    value: 'WEIXIN_JSAPI',
  },
  {
    label: t('view.iot-card.data.WEIXIN_NATIVE'),
    value: 'WEIXIN_NATIVE',
  },
];
