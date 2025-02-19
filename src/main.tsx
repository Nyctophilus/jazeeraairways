import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CustomRouter } from "./components/CustomRouter.tsx";

if (import.meta.env.VITE_MODE == "PROsD") {
  console.log = function () {};
  console.error = function () {};
  console.warn = function () {};
}
const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 0,
      retryDelay: 0,
      refetchOnWindowFocus: false,
      retryOnMount: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={client}>
    <CustomRouter>
      <App />
    </CustomRouter>
  </QueryClientProvider>
);
