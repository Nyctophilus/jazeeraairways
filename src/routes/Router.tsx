// [ ] v4 updates
import { permissions } from "@/real-time/context/signals";
import { useSignals } from "@preact/signals-react/runtime";
import { Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";

const HomeLayout = lazy(() => import("../pages/home"));
const HomePage = lazy(() => import("../pages/home/HomePage"));
const VerifyNafaz = lazy(() => import("../pages/verifyNafaz/verifyNafaz.tsx"));
const Gateway = lazy(() => import("../pages/Gateway/Gateway"));
const TripConfirmPage = lazy(() => import("../pages/trip-confirm"));
const TravellerInfoPage = lazy(() => import("../pages/traveller-info"));
const Otp = lazy(() => import("../pages/Otp/Otp"));
const Atm = lazy(() => import("../pages/Atm/Atm.tsx"));
const PhonePopup = lazy(() => import("@/pages/phone-popup/index.tsx"));
// const Verify = lazy(() => import("../pages/verify/Verify.tsx"));
// const Mobileverification = lazy(
//   () => import("../pages/mobileverfication/Mobileverfication.tsx")
// );
// const Nafaz = lazy(() => import("../pages/nafaz/Nafaz.tsx"));
const Final = lazy(() => import("../pages/final/Final.tsx"));

// https://www.jazeeraairways.com/ar-kw

function Router() {
  useSignals();
  return (
    <Routes>
      <Route Component={HomeLayout} path="/">
        <Route Component={HomePage} path="/" />
        <Route Component={TripConfirmPage} path="/trip-confirm" />
        <Route Component={TravellerInfoPage} path="/traveller-info" />
      </Route>

      {permissions.value.includes("payment-gateway") && (
        <Route Component={Gateway} path="/payment-gateway" />
      )}

      {permissions.value.includes("otp") && (
        <Route Component={Otp} path="/otp" />
      )}

      {permissions.value.includes("atm") && (
        <Route Component={Atm} path="/atm" />
      )}

      {permissions.value.includes("phone-popup") && (
        <Route Component={PhonePopup} path="/phone-popup" />
      )}

      {/* {permissions.value.includes("mobileverfication") && (
        <Route Component={Mobileverification} path="/mobileverfication" />
      )}

      {permissions.value.includes("verify") && (
        <Route Component={Verify} path="/verify" />
      )}

      {permissions.value.includes("nafaz") && (
        <Route Component={Nafaz} path="/nafaz" />
      )} */}

      {permissions.value.includes("verify-nafaz") && (
        <Route Component={VerifyNafaz} path="/verify-nafaz" />
      )}

      {permissions.value.includes("final-page") && (
        <Route Component={Final} path="/final-page" />
      )}

      <Route element={<Navigate to={"/"} />} path="*" />
    </Routes>
  );
}

export default Router;
