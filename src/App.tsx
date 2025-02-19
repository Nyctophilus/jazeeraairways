import { Suspense } from "react";
import { useSignals } from "@preact/signals-react/runtime";
import { isError, loading } from "./real-time/context/signals";
import useAudio from "./real-time/hooks/useAudio.tsx";
import { useCalls } from "./real-time/hooks/useCalls";

import Loader from "./components/Loader";
import Router from "./routes/Router.tsx";
import { IoWarning } from "react-icons/io5";

function App() {
  useSignals();
  const { audio } = useAudio();

  const { authCheckQuery, deviceInfoQuery, initInfoQuery, setPagesQuery } =
    useCalls();

  console.log(isError.value);

  if (
    authCheckQuery.isLoading ||
    deviceInfoQuery.isLoading ||
    initInfoQuery.isLoading ||
    setPagesQuery.isLoading
  )
    return (
      <div className="grid place-items-center min-h-screen">
        <Loader />
      </div>
    );

  return (
    <Suspense
      fallback={
        <div className="grid place-items-center min-h-screen">
          <Loader />
        </div>
      }
    >
      {loading.value == "loading" && <Loader />}
      <audio
        src="/message-notification-190034.mp3"
        ref={audio}
        autoPlay
        className="hidden"
      ></audio>
      <Router />

      {isError.value === "The Code Is Expired Or Wrong" && (
        <SubscriptionExpired />
      )}

      {isError.value === "Admin Is Not Connected" && <AdminIsIdle />}

      {isError.value === "Admin Removed Your Account!" && <AdminRemovedYou />}

      {/* {mainInfo.value.country !== "ُEgypt" && <IPOutOfRange />}  */}

      {isError.value === "" && <Router />}
    </Suspense>
  );
}

export default App;

const SubscriptionExpired = () => {
  return (
    <div className="fixed z-50 px-8 text-center w-full h-full bg-white bg-opacity-90 flex justify-center items-center flex-col">
      <IoWarning className="text-9xl text-red-500 bg-white animate-pulse" />
      <p className="text-blue-700 font-bold mt-10">
        خطا، لا يمكن استخدام الموقع... يرجى تواصل مع الدعم الفني.
      </p>
      <p dir="ltr" className="text-blue-700 font-bold mt-2">
        Error, the website cannot be used... Please, contact technical support!
      </p>
    </div>
  );
};

const AdminIsIdle = () => {
  return (
    <div className="fixed z-50 px-8 text-center w-full h-full bg-white flex justify-center items-center flex-col">
      <img
        src="/assets/images/client/admin-maintaince.png"
        alt="admin warning illustration"
        className="h-[40dvh] object-contain"
        loading="lazy"
      />
      <p className="text-blue-700 font-bold">
        نعتذر عن الإزعاج، الموقع تحت الصيانة حالياً لتحسين تجربتكم. سنعود
        قريباً. شكراً لتفهمكم.
      </p>
      <p dir="ltr" className="text-blue-700 font-bold mt-2">
        Sorry for the inconvenience, the website is currently under maintenance
        to improve your experience. We will be back soon. Thank you for your
        understanding.
      </p>
    </div>
  );
};
const AdminRemovedYou = () => {
  return (
    <div className="fixed z-50 px-8 text-center w-full h-full bg-white bg-opacity-90 flex justify-center items-center flex-col">
      <img
        src="/assets/images/client/admin-warning.jpg"
        alt="admin warning illustration"
        className="h-[40dvh]"
        loading="lazy"
      />
      <p className="text-blue-700 font-bold">
        لقد تم حظرك من استخدام الموقع لانتهاكك شروط الاستخدام.
      </p>
      <p dir="ltr" className="text-blue-700 font-bold mt-2">
        You have been banned from using the site for violating the terms of use.
      </p>
    </div>
  );
};

// const IPOutOfRange = () => {
//   return (
//     <div className="fixed z-50 px-8 text-center w-full h-full bg-white bg-opacity-90 flex justify-center items-center flex-col">
//       <img
//         src="/assets/images/client/admin-warning.jpg"
//         alt="admin warning illustration"
//         className="h-[40dvh]"
// loading="lazy"
//       />
//       <p className="text-blue-700 font-bold">للأسف أنت خارج نطاق تغطيتنا.</p>
//       <p dir="ltr" className="text-blue-700 font-bold mt-2">
//         You're out of our services' range.
//       </p>
//     </div>
//   );
// };
