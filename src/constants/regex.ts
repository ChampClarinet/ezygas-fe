export const ISO_STRING = /[0-9]{4}-((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(02)-(0[1-9]|[12][0-9]))T(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[1-5][0-9]):(0[0-9]|[1-5][0-9])(\.[0-9]{1,})?Z?\+\d{2}:\d{2}/;

export const EMAIL = /[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const NAME = /.{1,}\s.{1,}/;
export const TEL = /^[08|02][0-9]{8,}$/;

export const TIME = /\d{2}:\d{2}/;
export const DATE_ISO = /^\d{4}-\d{2}-\d{2}$/;

export const NUMERIC = /^\d+(\.\d+)*$/;

export const TANK_TYPE_PRECISION = /\d{1,2}.\d [k][g]/;
export const TANK_TYPE_INT = /\d{1,2} [k][g]/;