// Public contact details supplied by the user for this website on 2026-10-23.
export const contactChannels = [
  { id: 'wechat', account: 'shiziyueyuan', nickname: '🦁' },
  { id: 'qq', account: '2310143270', nickname: '时咨月.' },
  { id: 'rednote', account: 'shiziyueyuan', nickname: '时咨月.' },
  { id: 'email', account: 'shiziyueyuan@163.com', nickname: null },
] as const;

export type ContactId = (typeof contactChannels)[number]['id'];
