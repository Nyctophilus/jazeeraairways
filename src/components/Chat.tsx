import { mainInfo, messages } from "@/real-time/context/signals";
import { cn, formatDate } from "@/lib/utils";
import { useSignals } from "@preact/signals-react/runtime";
import { FieldValues, useForm } from "react-hook-form";
import { IoIosSend } from "react-icons/io";
import { Button } from "./ui/button";
import { sendMessage } from "@/real-time/utils/utils";
import Input from "./Input";
import { MAIN_BTN } from "@/data/classes";
import { useEffect, useRef } from "react";

function Chat() {
  useSignals();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "all" });

  function send(data: FieldValues) {
    sendMessage(data.message);

    reset();
  }

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, 0);
  }, [messages.value]);

  return (
    <div className="pt-10 flex flex-col justify-start flex-1 gap-2 h-full overflow-y-auto">
      <div
        ref={containerRef}
        className="relative p-4 mt-4 border rounded-xl shadow-sm bg-primary-foreground flex overflow-y-auto w-full flex-col items-start h-[300px] gap-2 flex-1"
      >
        <img
          src="/assets/images/client/chat-illsutration.svg"
          alt="chatting illustration"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 opacity-70 w-[65%] select-none pointer-events-none"
        />
        {messages.value?.map((message, index) => (
          <span
            key={index}
            className={cn(
              "z-10 font-semibold text-white p-2 rounded-lg shadow-lg flex flex-col gap-2",
              message.id == mainInfo.value.socketId
                ? "ml-auto bg-main"
                : "mr-auto bg-primary-foreground text-primary"
            )}
          >
            <span>{message.content}</span>
            <span className="text-[10px] ms-auto uppercase">
              {formatDate(new Date(message.createdAt))}
            </span>
          </span>
        ))}
      </div>

      <form
        onSubmit={handleSubmit(send)}
        className="flex flex-row-reverse items-center gap-2"
      >
        <Input
          id="message"
          errors={errors}
          register={register}
          placeholder="كيف يمكننا مساعدتك؟"
          isAr
          options={{
            required: true,
          }}
        />

        <Button
          className={cn(
            MAIN_BTN,
            "rounded-full aspect-square relative w-fit duration-300"
          )}
        >
          <IoIosSend className="text-xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        </Button>
      </form>
    </div>
  );
}

export default Chat;
