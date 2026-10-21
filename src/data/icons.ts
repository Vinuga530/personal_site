export const ICON_NAMES = [
  'icon-social-github',
  'icon-social-linkedin',
  'icon-social-mail',
  'icon-navigation-external-link',
] as const;
export type IconName = (typeof ICON_NAMES)[number];
