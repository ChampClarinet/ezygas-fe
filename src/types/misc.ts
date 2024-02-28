export interface Misc {
  misc_code: string;
  text: string | null;
  value: number | null;
  seq_no: number | null;
  language_code: string;
}

export interface WeekdayDTO {
  slug: string;
  short_name: string;
  long_name: string;
  language_code: string;
  seq_no: number;
}

export interface MonthDTO {
  slug: string;
  short_name: string;
  long_name: string;
  language_code: string;
  month_number: number;
}

export interface Menu {
  code: string;
  display_text: string;
  url: string;
  icon_src: string | null;
  icon_class: string | null;
  screen_code: null;
  seq_no: number;
  is_staff_only: boolean;
}

export interface SubMenu {
  parent_code: string;
  items: Menu[];
}