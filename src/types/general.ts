import { PropsWithChildren } from "react";
import { UseFormReturn } from "react-hook-form";
import { User } from "./user";
import { Menu, SubMenu } from "./misc";

export interface HasBrands<T> {
  details: T[];
}

export type TimeString = string;

export type ActionFunction = (...args: any) => { payload: any; type: string };

export interface CreatedUpdatedAt {
  createdAt: TimeString;
  updatedAt: TimeString;
}

export interface ErrorResponse {
  message: string;
  code?: string;
  status?: string;
}

export interface PaginableParams {}

/**
 * Props for any modules
 */
export type ModuleProps<T = {}> = PropsWithChildren<T> & {
  authenticated: boolean;
  token?: string;
  menu?: Menu[];
  submenu?: SubMenu[];
};

/**
 * Common query options for useQuery hooks.
 */
export interface QueryOptions {
  autoFetch?: boolean;
  /**
   * Interval in ms
   */
  refetchInterval?: number;
}

export interface SimpleMutationParams<T = void> {
  onSuccess?: (data: T) => unknown;
  autoRefetch?: boolean;
}

export interface GenericFormProps {
  form: UseFormReturn<any, any>;
  formType?: "EDIT" | "CREATE";
  /**
   * Id to fetch clean data for edit form
   */
  id?: string | number;
}

export interface ApiResponse<T = any> {
  data: T;
  count?: number;
}

export interface Timestamp {
  created_at: string;
  updated_at: string;
}

export interface RouterComponent {
  exact?: boolean;
  path: string;
  Component: React.ComponentType<any>;
  isPublic?: boolean;
  requireAdminPermission?: boolean;
}
