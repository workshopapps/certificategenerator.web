import { lazy } from "react";

export * from "./ResetPassword";
export const Privacy = lazy(() =>
  import("./PrivacyPolicy").then(module => {
    return { default: module.Privacy };
  })
);
export const Layout = lazy(() => import("../Component/Layout"));
export const ComingSoon = lazy(() => import("./ComingSoon"));
export const Dashboard = lazy(() => import("./Dashboard"));
export const Choice = lazy(() => import("./Choice(single or bulk)"));
export const Team = lazy(() => import("./Team"));
export const Terms = lazy(() => import("./Terms"));
export const Templates = lazy(() => import("./Templates"));
export const AboutUs = lazy(() => import("./AboutUs"));
export const FAQ = lazy(() => import("./FAQ"));
export const Preview = lazy(() => import("./Preview"));
export const BulkStep = lazy(() => import("./Home/BulkStep"));
export const EditBulk = lazy(() => import("./EditBulk"));
export const Error = lazy(() => import("./Error"));
export const ContactUs = lazy(() => import("./contactUs"));
export const Career = lazy(() => import("./Career"));
export const Pricing = lazy(() => import("./Pricing"));
export const ProfilePage = lazy(() => import("./ProfilePage"));
export const UploadCSV = lazy(() => import("./UploadCSV"));
export const BulkPreview = lazy(() => import("./BulkPreview"));
export const SinglePreview = lazy(() => import("./SinglePreview"));
export const Checkout = lazy(() => import("./Checkout"));
export const Generate = lazy(() => import("./Dashboard/Generate"));

export const Home = lazy(() => import("./Home"));
