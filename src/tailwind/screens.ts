export const screens = {
  xxs: 320,
  xs: 375,
  sm: 640,
  md: 768,
  lg: 992,
  xl: 1024,
  "2xl": 1280,
};

export const screensPX = Object.keys(screens).reduce((res, key) => {
  const value = screens[key as keyof typeof screens];

  return {
    ...res,
    [key]: `${value}px`,
  };
}, {});
