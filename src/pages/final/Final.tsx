// updates-version5
// fixing updates
import Main from "@/components/MainWrapper";
import { lastMessage } from "@/real-time/context/signals";
import { setCurrentPage } from "@/real-time/utils/utils";
import { useSignals } from "@preact/signals-react/runtime";
import { motion } from "framer-motion";
import { useEffect } from "react";

function Final() {
  useSignals();

  useEffect(() => {
    setCurrentPage("final");
  }, []);

  return (
    <Main>
      <div className="bg-gray-100 min-h-screen py-20 grid place-items-center">
        <div className="text-center">
          <p className="text-main text-2xl font-bold mx-auto animate-pulse mb-4">
            نشكركم على اختياركم المنصتنا
          </p>

          {lastMessage.value ? (
            <motion.p
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="text-main text-2xl mx-auto"
            >
              {lastMessage.value}
            </motion.p>
          ) : (
            <motion.p
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="text-main text-2xl font-bold mx-auto animate-pulse mb-4"
            >
              سيتم التواصل مع فى أقرب وقت ممكن.
            </motion.p>
          )}
        </div>
      </div>
    </Main>
  );
}

export default Final;
