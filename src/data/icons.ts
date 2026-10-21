export const ICON_NAMES = [
  'icon-social-github',
  'icon-social-linkedin',
  'icon-social-mail',
  'icon-navigation-external-link',
  'icon-network',
  'icon-shield',
  'icon-terminal',
  'icon-cpu',
  'icon-copy',
  'icon-check',
  'icon-search',
  'icon-book-open',
  'icon-chevron-right',
  'icon-pulse',
] as const;

export type IconName = (typeof ICON_NAMES)[number];
