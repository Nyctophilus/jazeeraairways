// with-last-update
// [ ] new updates
import { isNewMessage } from "@/real-time/context/signals";
import { useSignals } from "@preact/signals-react/runtime";
import { deleteCookie, getCookie } from "cookies-next";
import { useEffect, useRef, useState } from "react";
import { getInitInfo } from "../utils/utils";

function useCalls() {
  useSignals();
  const audio = useRef<HTMLAudioElement>(null);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (getCookie("ID")) {
      setLoading(true);
      getInitInfo()
        .then(() => setLoading(false))
        .catch(() => {
          deleteCookie("ID");
        });
    }
  }, []);

  useEffect(() => {
    if (isNewMessage.value > 0) {
      audio.current?.play();
    }
  }, [isNewMessage.value]);
  return { isLoading, audio, getInitInfo };
}
export default useCalls;
