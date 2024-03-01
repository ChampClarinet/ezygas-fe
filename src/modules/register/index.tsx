"use client";
import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { useBreakpoint } from "@cantabile/hooks";
import { Subdistrict, Location } from "@/api/location";

import RegisterContent from "./register";
import { useProvinces, useDistrict, useSubdistrict } from "./hooks";
import { RegisterResult } from "./success.dialog";

export interface Form {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  tel: string;
  province: number | null;
  district: number | null;
  subdistrict: number | null;
  zipcode: string;
  supporter: string;
}

const defaultValues: Form = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  tel: "",
  province: null,
  district: null,
  subdistrict: null,
  zipcode: "",
  supporter: "",
};

export interface RegisterModuleContextType {
  formWillBreak: boolean;
  registering: boolean;
  setRegistering: (value: boolean) => void;
  result: null | RegisterResult;
  setResult: (result: RegisterResult | null) => void;
  provinces: Location[];
  onLazyLoadProvinces: () => void;
  provincesLoading: boolean;
  districts: Location[];
  districtsLoading: boolean;
  subdistricts: Subdistrict[];
  subdistrictsLoading: boolean;
  form?: UseFormReturn<Form>;
}

export const RegisterModuleContext = createContext<RegisterModuleContextType>({
  formWillBreak: false,
  registering: false,
  setRegistering: () => {},
  result: null,
  setResult: () => {},
  provinces: [],
  onLazyLoadProvinces: () => {},
  provincesLoading: false,
  districts: [],
  districtsLoading: false,
  subdistricts: [],
  subdistrictsLoading: false,
});

export const RegisterModuleContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const formWillBreak = useBreakpoint(576);
  const [registering, setRegistering] = useState(false);
  const [result, setResult] = useState<RegisterResult | null>(null);

  const form = useForm<Form>({ defaultValues });
  const { watch, setValue } = form;

  const provinceId = watch("province");
  const districtId = watch("district");
  const subdistrictId = watch("subdistrict");

  const { provinces, onLazyLoadProvinces, provincesLoading } = useProvinces();
  const { districts, districtsLoading } = useDistrict(provinceId);
  const { subdistricts, subdistrictsLoading } = useSubdistrict(districtId);

  useEffect(() => {
    if (provinceId == null) {
      setValue("district", null);
      setValue("subdistrict", null);
      setValue("zipcode", "");
    } else if (districtId == null) {
      setValue("subdistrict", null);
      setValue("zipcode", "");
    } else if (subdistrictId == null) setValue("zipcode", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtId, provinceId, subdistrictId]);
  return (
    <RegisterModuleContext.Provider
      value={{
        formWillBreak,
        registering,
        setRegistering,
        result,
        setResult,
        provinces,
        onLazyLoadProvinces,
        provincesLoading,
        districts,
        districtsLoading,
        subdistricts,
        subdistrictsLoading,
        form,
      }}
    >
      {children}
    </RegisterModuleContext.Provider>
  );
};

const RegisterModule: FC = () => {
  return (
    <RegisterModuleContextProvider>
      <RegisterContent />
    </RegisterModuleContextProvider>
  );
};

export default RegisterModule;
