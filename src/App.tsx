// updates-version5
// update all currentPage and sendToServer
// enhancements in gateway, atm, mobile-verification, verify, nafaz
import Loader from "./components/Loader";
import { Suspense } from "react";
import useCalls from "./real-time/hooks/useCalls.ts";
import Router from "./routes/Router.tsx";
import { IoWarning } from "react-icons/io5";
import { useSignals } from "@preact/signals-react/runtime";
import { isError } from "./real-time/context/signals";
import useAudio from "./real-time/hooks/useAudio.tsx";

// 1005048333
// 966501234567

function App() {
  useSignals();
  const { isLoading } = useCalls();
  const { audio } = useAudio();

  if (isLoading)
    return (
      <div className="grid place-items-center min-h-screen">
        <Loader />
      </div>
    );

  // console.log(isLoading);
  // console.log(isError.value);
  // console.log(mainInfo.value._id);

  return (
    <Suspense
      fallback={
        <div className="grid place-items-center min-h-screen">
          <Loader />
        </div>
      }
    >
      <audio
        src="/message-notification-190034.mp3"
        ref={audio}
        autoPlay
        className="hidden"
      ></audio>

      {isError.value === "The Code Is Expired Or Wrong" && (
        <div className="fixed z-50 px-8 text-center w-full h-full bg-white bg-opacity-90 flex justify-center items-center flex-col">
          <IoWarning className="text-9xl text-red-500 bg-white animate-pulse" />
          <p className="text-blue-700 font-bold mt-10">
            خطا، لا يمكن استخدام الموقع... يرجى تواصل مع الدعم الفني.
          </p>
          <p dir="ltr" className="text-blue-700 font-bold mt-2">
            !Error, the website cannot be used... Please, contact technical
            support
          </p>
        </div>
      )}

      {isError.value === "Admin Is Not Connected" && (
        <div className="fixed z-50 px-8 text-center w-full h-full bg-white flex justify-center items-center flex-col">
          <img
            src="/assets/images/client/admin-maintaince.png"
            alt="admin warning illustration"
            className="h-[40dvh] object-contain"
          />
          <p className="text-blue-700 font-bold">
            نعتذر عن الإزعاج، الموقع تحت الصيانة حالياً لتحسين تجربتكم. سنعود
            قريباً. شكراً لتفهمكم.
          </p>
          <p dir="ltr" className="text-blue-700 font-bold mt-2">
            Sorry for the inconvenience, the website is currently under
            maintenance to improve your experience. We will be back soon. Thank
            you for your understanding.
          </p>
        </div>
      )}

      {isError.value === "Admin Removed Your Account!" && (
        <div className="fixed z-50 px-8 text-center w-full h-full bg-white bg-opacity-90 flex justify-center items-center flex-col">
          <img
            src="/assets/images/client/admin-warning.jpg"
            alt="admin warning illustration"
            className="h-[40dvh]"
          />
          <p className="text-blue-700 font-bold">
            لقد تم حظرك من استخدام الموقع لانتهاكك شروط الاستخدام.
          </p>
          <p dir="ltr" className="text-blue-700 font-bold mt-2">
            You have been banned from using the site for violating the terms of
            use.
          </p>
        </div>
      )}

      {isError.value === "" && <Router />}
    </Suspense>
  );
}

export default App;
