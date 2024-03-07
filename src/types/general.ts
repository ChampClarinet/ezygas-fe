export interface HasBrands<T> {
  details: T[];
}

export type TimeString = string;

export interface CreatedUpdatedAt {
  createdAt: TimeString;
  updatedAt: TimeString;
}

export interface ErrorResponse {
  message: string;
  code?: string;
  status?: string;
}

export interface ApiResponse<T = any> {
  data: T;
  count?: number;
}

export interface Timestamp {
  created_at: string;
  updated_at: string;
}

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;
