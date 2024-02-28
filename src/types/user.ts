export interface AuthPayload {
  username: string;
  password: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  groups: string[];
  username: string;
}

export interface RegisterDTO {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  tel: string;
  province: number;
  district: number;
  subdistrict: number;
  zipcode: string;
  service_charge: number;
  lat: string;
  long: string;
  supporter: string;
}

export interface RegisterResponse {
  data: {
      data: string;
      vendor_code: string;
  };
}

export interface UserDTO {
  data: User;
}

export interface User {
  username: string;
  first_name?: string;
  last_name?: string;
  is_staff: boolean;
}