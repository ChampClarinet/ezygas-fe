"use client";
import { FC, useEffect, useMemo, useRef } from "react";
import clsx from "clsx";
import { Divider } from "primereact/divider";
import { Image } from "primereact/image";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import Button from "@/components/common/button";
import Input from "@/components/common/input";
import Password from "@/components/common/password";
import { login } from "@/utils/auth";
import SweetAlert from "@/utils/sweetalert";

import { LP } from "@/constants/external.link";

export interface LoginForm {
  email: string;
  password: string;
}
const LoginPage: FC = () => {
  const router = useRouter();

  const emailRef = useRef<HTMLInputElement>(null);

  const {
    handleSubmit,
    register,
    control,
    formState: { isValid },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = useMemo(
    () =>
      handleSubmit(async (data: LoginForm) => {
        const payload = {
          username: data.email.trim(),
          password: data.password.trim(),
        };
        SweetAlert.showLoading();
        const result = await login(payload.username, payload.password);
        switch (result) {
          case "OK":
            // SwalToast({ title: "ล็อกอินสำเร็จ" }).fire();
            router.push("/");
            return SweetAlert.close();
          case "ACCOUNT_STILL_PENDING_OR_SUSPENDED":
            return router.push("/pending");
          case "INCORRECT_PASSWORD":
            return SweetAlert.showError({
              text: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
              icon: "warning",
              titleText: "ล็อกอินไม่สำเร็จ",
            });
          default:
            return SweetAlert.showError();
        }
      }),
    [handleSubmit, router]
  );

  useEffect(() => {
    emailRef.current?.focus();
  }, []);
  return (
    <>
      <div
        className={clsx(
          "logo",
          "w-[300px]",
          "flex",
          "justify-center",
          "items-center",
          "mb-[30px]",
          "flex-col",
          "max-w-full"
        )}
      >
        <Image
          src="/assets/img/ezygas-logo.png"
          alt="Ezygas"
          width="150"
          height="150"
          loading="lazy"
          className="cursor-pointer object-contain"
          onClick={() => window.open(LP, "_self")}
          pt={{ image: { className: "mx-auto" } }}
        />
        <span className="w-full text-lg text-gray-900 mb-2">เข้าสู่ระบบ</span>
        <form className="w-full flex flex-col gap-2" onSubmit={onSubmit}>
          <label className={clsx(labelClasses)} htmlFor="email">
            อีเมล
          </label>
          <Controller
            control={control}
            name="email"
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                id={field.name}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder="email@ezygas.co"
                type="email"
                keyfilter="email"
                focusOnStart
              />
            )}
          />
          <label className={clsx(labelClasses)} htmlFor="password">
            รหัสผ่าน
          </label>
          <Controller
            control={control}
            name="password"
            rules={{ required: true }}
            render={({ field }) => {
              return (
                <Password
                  id={field.name}
                  {...field}
                  inputRef={field.ref}
                  placeholder="password"
                  feedback={false}
                  toggleMask
                />
              );
            }}
          />
          <Button
            baseProps={{
              type: "submit",
              className: "mt-4 !w-full",
            }}
            disabled={!isValid}
            fill
          >
            เข้าสู่ระบบ
          </Button>
          <Divider />
          <Button
            link
            onClick={(e) => {
              e.preventDefault();
              window.open("/register", "_self");
            }}
            baseProps={{
              className: "mx-auto",
            }}
          >
            สมัครสมาชิก
          </Button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;

const labelClasses = ["text-sm", "text-gray-900"];
