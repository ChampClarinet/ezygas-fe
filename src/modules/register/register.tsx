"use client";
import { FC, useCallback, useContext } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { Dropdown } from "primereact/dropdown";
import { Image } from "primereact/image";
import { Controller } from "react-hook-form";
import Button from "@/components/common/button";
import Input from "@/components/common/input";
import Password from "@/components/common/password";
import { useToastContext } from "@/hooks/toast";
import { RegisterDTO } from "@/types/user";
import { addressToDisplayAddress, wait } from "@/utils";
import { register } from "@/utils/auth";
import { resolveErrorResponse } from "@/utils/error";

import { Form, RegisterModuleContext } from ".";
import FormItem from "./formitem";
import SuccessDialog from "./success.dialog";
import {
  validateEmail,
  validateExist,
  validateName,
  validatePassword,
  validatePhone,
} from "./validator";

const RegisterContent: FC = () => {
  const router = useRouter();
  const toastContext = useToastContext();

  const {
    setRegistering,
    setResult,
    form,
    subdistricts,
    districts,
    provinces,
    formWillBreak,
    onLazyLoadProvinces,
    provincesLoading,
    districtsLoading,
    subdistrictsLoading,
    registering,
  } = useContext(RegisterModuleContext);
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setValue,
  } = form!;

  const onSubmit = useCallback(
    async (data: Form) => {
      setRegistering(true);
      await wait(3000);

      //? map
      const supporter = data.supporter || data.email;
      const [first_name, last_name] = data.name.split(" ");
      const service_charge = 20;
      const lat = "0.000";
      const long = "0.000";

      const payload: RegisterDTO = {
        email: data.email,
        district: data.district!,
        subdistrict: data.subdistrict!,
        province: data.province!,
        first_name,
        last_name,
        lat,
        long,
        password: data.password,
        service_charge,
        supporter,
        tel: data.tel,
        zipcode: data.zipcode,
      };
      try {
        const result = await register(payload);
        if (typeof result === "string") {
          let message = "";
          switch (result) {
            case "INVALID_TEL":
              message = "เบอร์โทรศัพท์ไม่ถูกต้อง";
              break;
            case "EMAIL_CONFLICT":
              message = "อีเมลนี้ถูกใช้ไปแล้ว";
              break;
            default:
              message = "มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้ง";
          }
          setRegistering(false);
          return toastContext.showToast({
            severity: "error",
            summary: message,
          });
        }
        if (result) {
          const address = addressToDisplayAddress({
            subdistrict:
              subdistricts.find((s) => s.id == data.subdistrict)?.name_th || "",
            district:
              districts.find((d) => d.id == data.district)?.name_th || "",
            isInBangkok: data.province == 10,
            province:
              provinces.find((p) => p.id == data.province)?.name_th || "",
            zipcode: data.zipcode,
          });
          setResult({ ...result.result, address, vendorCode: result.code });
          setRegistering(false);
        }
      } catch (error) {
        resolveErrorResponse(error);
      }
    },
    [
      districts,
      provinces,
      setRegistering,
      setResult,
      subdistricts,
      toastContext,
    ]
  );
  return (
    <>
      <SuccessDialog
        toggle={() => {
          setResult(null);
          router.push("/pending");
        }}
      />
      <div className="flex flex-col justify-center items-center max-w-[500px] gap-5 mx-auto">
        <Image
          src="/assets/img/ezygas-logo-w-text.svg"
          alt="ezygas"
          width="400"
          height="200"
          imageStyle={{
            transform: "scale(.5)",
          }}
        />
        <div className="flex justify-center">
          <h1 className="text-2xl font-medium text-center">
            ถ้าคุณพร้อมเปลี่ยน{" "}
            <strong className="font-semibold">{`"เราพร้อมจะช่วย"`}</strong>
          </h1>
        </div>

        <h5 className="w-full py-0 px-4 sm:px-0 text-center sm:text-start">
          สมัครสมาชิก
        </h5>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={clsx(
            "flex",
            "items-center",
            "flex-wrap",
            "pb-16",
            "w-full",
            "gap-x-4",
            "gap-y-1",
            formWillBreak ? "justify-center" : "justify-between"
          )}
        >
          <FormItem label="อีเมล" error={errors.email?.message}>
            <Controller
              control={control}
              name="email"
              rules={{
                validate: (email) => validateEmail(email),
              }}
              render={({ field: { ref, ...field } }) => (
                <Input
                  {...field}
                  id={field.name}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="email@ezygas.co"
                  type="email"
                  keyfilter="email"
                />
              )}
            />
          </FormItem>
          <FormItem
            label="อีเมลผู้แนะนำระบบ (ถ้ามี)"
            error={errors.supporter?.message}
          >
            <Controller
              control={control}
              name="supporter"
              rules={{
                validate: (email) => validateEmail(email, false),
              }}
              render={({ field: { ref, ...field } }) => (
                <Input
                  {...field}
                  id={field.name}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="email@ezygas.co"
                  type="email"
                  keyfilter="email"
                />
              )}
            />
          </FormItem>
          <FormItem label="รหัสผ่าน" error={errors.password?.message}>
            <Controller
              control={control}
              name="password"
              rules={{
                validate: (password) => validatePassword(password),
              }}
              render={({ field: { ref, ...field } }) => {
                return (
                  <Password
                    id={field.name}
                    {...field}
                    placeholder="password"
                    toggleMask
                  />
                );
              }}
            />
          </FormItem>
          <FormItem label="ยืนยันรหัสผ่าน" error={errors.password?.message}>
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                validate: (confirmPw) =>
                  validatePassword(confirmPw, watch("password")),
              }}
              render={({ field: { ref, ...field } }) => {
                return (
                  <Password
                    id={field.name}
                    {...field}
                    placeholder="confirm password"
                    toggleMask
                  />
                );
              }}
            />
          </FormItem>
          <FormItem label="ชื่อ-นามสกุล" error={errors.name?.message}>
            <Controller
              control={control}
              name="name"
              rules={{
                validate: (name) => validateName(name),
              }}
              render={({ field: { ref, ...field } }) => (
                <Input
                  id={field.name}
                  {...field}
                  placeholder="ชื่อ เว้นวรรค นามสกุล"
                />
              )}
            />
          </FormItem>
          <FormItem label="เบอร์โทรศัพท์" error={errors.tel?.message}>
            <Controller
              control={control}
              name="tel"
              rules={{
                validate: (phone) => validatePhone(phone),
              }}
              render={({ field: { ref, ...field } }) => (
                <Input
                  id={field.name}
                  {...field}
                  placeholder="เบอร์โทรศัพท์"
                  type="tel"
                />
              )}
            />
          </FormItem>
          <FormItem label="จังหวัด" error={errors.province?.message}>
            <Controller
              control={control}
              name="province"
              rules={{
                validate: (provinceId) => validateExist(provinceId, "จังหวัด"),
              }}
              render={({ field }) => (
                <Dropdown
                  id={field.name}
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  options={provinces}
                  placeholder="จังหวัด"
                  onClick={onLazyLoadProvinces}
                  loading={provincesLoading}
                  filter
                  optionValue="id"
                  optionLabel="name_th"
                  emptyFilterMessage="ไม่พบจังหวัดที่ค้นหา"
                  filterPlaceholder="ค้นหา"
                  showClear
                />
              )}
            />
          </FormItem>
          <FormItem label="อำเภอ/เขต" error={errors.district?.message}>
            <Controller
              control={control}
              name="district"
              rules={{
                validate: (districtId) =>
                  validateExist(districtId, "อำเภอ/เขต"),
              }}
              render={({ field }) => {
                const provinceId = watch("province");
                return (
                  <Dropdown
                    id={field.name}
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                    options={districts}
                    placeholder="อำเภอ/เขต"
                    loading={districtsLoading}
                    filter
                    disabled={provinceId == null}
                    optionValue="id"
                    optionLabel="name_th"
                    emptyFilterMessage="ไม่พบอำเภอ/เขตที่ค้นหา"
                    filterPlaceholder="ค้นหา"
                    showClear
                  />
                );
              }}
            />
          </FormItem>
          <FormItem label="ตำบล/แขวง" error={errors.subdistrict?.message}>
            <Controller
              control={control}
              name="subdistrict"
              rules={{
                validate: (subdistrictId) =>
                  validateExist(subdistrictId, "ตำบล/แขวง"),
              }}
              render={({ field }) => (
                <Dropdown
                  id={field.name}
                  value={field.value}
                  onChange={(e) => {
                    const id = e.value;
                    field.onChange(id);
                    const sub = subdistricts.find((s) => s.id == id);
                    if (sub) setValue("zipcode", sub.zipcode);
                  }}
                  disabled={watch("district") == null}
                  options={subdistricts}
                  placeholder="ตำบล/แขวง"
                  loading={subdistrictsLoading}
                  filter
                  optionValue="id"
                  optionLabel="name_th"
                  emptyFilterMessage="ไม่พบตำบล/แขวงที่ค้นหา"
                  filterPlaceholder="ค้นหา"
                  showClear
                />
              )}
            />
          </FormItem>
          <FormItem label="รหัสไปรษณีย์">
            <Input
              disabled
              className="cursor-not-allowed"
              placeholder="เลือกที่อยู่เพื่อค้นหารหัสไปรษณีย์"
              value={watch("zipcode")}
            />
          </FormItem>

          <div className="flex w-full justify-center">
            <Button
              baseProps={{
                type: "submit",
                className: "w-40",
                loading: registering,
              }}
              fill
            >
              สมัครสมาชิก
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterContent;
