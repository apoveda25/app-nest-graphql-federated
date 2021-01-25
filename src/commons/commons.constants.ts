export const CREATED_REGEX = /^Users\/[\w-]+$/;
export const UPDATED_REGEX = /^Users\/[\w-]+$/;
export const DELETED_REGEX = /^Users\/[\w-]+$/;
export const KEY_REGEX = /^[\w-]+$/;
export const NAME_REGEX = /^[\w]+([\s][\w]+)*$/;
export const WORD_REGEX = /^[\w]+$/;
export const PASSWORD_REGEX = /^[\w.!@#$%^&*_+='",:;|<>]{8,20}$/;
export const CODE_SIX_DIGITS_REGEX = /^[\d]{6}$/;

export const FILTER_DEFAULT = [
  { key: 'deleted', value: false, operator: '==', separator: 'AND' },
];
export const SORT_DEFAULT = [];
export const PAGINATION_DEFAULT = { offset: 0, count: 300 };
