import type { Locale } from './index';
import type { ContactId } from '~/data/contact-channels';

interface ContactCopy {
  channels: string;
  platforms: Record<ContactId, string>;
  nickname: string;
  emailHint: string;
  copy: string;
  copyLabel: string;
  copied: string;
  success: string;
  manual: string;
}

export const contactCopy = {
  zh: {
    channels: '联系渠道',
    platforms: { email: '邮箱', wechat: '微信 / WeChat', qq: 'QQ', rednote: '小红书 / REDnote' },
    nickname: '昵称',
    emailHint: '复制邮箱后，粘贴到常用邮件应用中。',
    copy: '复制',
    copyLabel: '复制{channel}账号',
    copied: '已复制',
    success: '{channel}已复制。',
    manual: '请选中账号后复制；手机上可以长按账号。',
  },
  en: {
    channels: 'Contact channels',
    platforms: { email: 'Email', wechat: 'WeChat', qq: 'QQ', rednote: 'REDnote' },
    nickname: 'Display name',
    emailHint: 'Copy the address into your preferred email app.',
    copy: 'Copy',
    copyLabel: 'Copy {channel} account',
    copied: 'Copied',
    success: '{channel} copied.',
    manual: 'Select the account and copy it, or press and hold it on your phone.',
  },
  ja: {
    channels: '連絡先',
    platforms: { email: 'メール', wechat: 'WeChat（微信）', qq: 'QQ', rednote: 'REDnote（小紅書）' },
    nickname: '表示名',
    emailHint: 'アドレスをコピーして、お使いのメールアプリに貼り付けてください。',
    copy: 'コピー',
    copyLabel: '{channel}のアカウントをコピー',
    copied: 'コピー済み',
    success: '{channel}をコピーしました。',
    manual: 'アカウントを選択してコピーしてください。スマートフォンでは長押しできます。',
  },
} satisfies Record<Locale, ContactCopy>;
