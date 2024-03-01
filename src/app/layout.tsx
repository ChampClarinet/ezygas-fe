"use client";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primeicons/primeicons.css";
import "./global.css";
import Global from "@/components/globals";

const env = process.env.NODE_ENV;

const appName = "Ezygas";
let title = appName;
if (env === "development") {
  title += " - DEV MODE";
} else if (env === "test") {
  title += " - UAT";
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        <title>{title}</title>
        <base href="/" />
        <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
        <meta httpEquiv="content-language" content="th, en" />
        <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
        <meta
          name="description"
          content="ระบบจัดการธุรกิจแก๊สออนไลน์ ที่จะเปลี่ยนวิถีชีวิตของเจ้าของร้านให้ออกจากธุรกิจแบบเดิมเป็นธุรกิจออนไลน์
        ปัญหาที่เจ้าของร้านแก๊สพบเจอมาตลอด เราเปลี่ยนมันเป็นเครื่องมือที่จัดการทุกปัญหาและช่วยให้การทำธุรกิจแก๊สง่ายขึ้นแบบครบวงจร"
        ></meta>
        <meta
          name="keywords"
          content="Ezygroup,อีซี่กรุ๊ป,Easygas,อีซี่แก๊ส,Ezygas,ฟินแก๊ส,fingas,ปตท,Ptt,Worldgas,เวิล์ดแก๊ส,WPgas,สยามแก๊ส,Siamgas,
        ยูนิคแก๊ส,Uniquegas,Unicgas,Grabgas,แก๊สหมด,เติมแก๊ส,ร้านแก๊ส,ร้านแก๊สแถวบ้าน,ร้านแก๊สที่เปิดอยู่,ร้านแก๊สเปิดดึก,คนส่งแก๊ส,ถังแก๊ส,
        Pos gas,ระบบจัดการแก๊ส,Gasplatform,Startup,เกี่ยวกับร้านแก๊ส,สตาร์ทอัพเกี่ยวกับร้านแก๊ส,Startup เกี่ยวกับแก๊ส,สตาร์ทอัพเกี่ยวกับแก๊ส,
        Startup thailand league,Startup thailand u league,Startup silpakorn,Su startup,สตาร์ทอัพศิลปากร,สตาร์ทอัพนักศึกษา"
        />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Global>{children}</Global>
      </body>
    </html>
  );
}
