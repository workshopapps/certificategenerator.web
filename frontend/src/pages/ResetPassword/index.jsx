import { lazy } from "react";

export const ChangePassword = lazy(() => import("./ChangePassword"));
export const ForgotPassword = lazy(() => import("./ForgotPassword"));
export const PasswordLinkSent = lazy(() => import("./PasswordLinkSent"));
export const ResetPassword = lazy(() => import("./ResetPassword"));
export const PasswordChangeSuccessfully = lazy(() =>
  import("./PasswordChangeSucessfully")
);
