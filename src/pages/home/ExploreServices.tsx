import Heading from "@/components/Heading/Heading";
import Parag from "@/components/Parag/Parag";

const servs = [
  {
    text: "24 كاونتر لتسجيل الدخول، 6 أجهزة للخدمة الذاتية",
    image: "/assets/images/suitcase.svg",
  },
  {
    text: "350 مواقف للسيارات",
    image: "/assets/images/parking.svg",
  },
  {
    text: "خدمة الإنترنت المجاني في جميع أنحاء المبنى",
    image: "/assets/images/wifi.svg",
  },
];

const ExploreServices = () => {
  return (
    <section className="mt-10 max-lg:pb-10 flex flex-col lg:flex-row-reverse lg:items-center bg-alt/10">
      <img
        src="/assets/images/explore-serv-lg.webp"
        alt="explore services image"
        className="min-h-[40dvh] lg:w-1/2 lg:h-full object-cover object-left"
        srcSet="/assets/images/explore-serv.webp 320w, /assets/images/explore-serv-lg.webp"
      />

      <div className="flex flex-col gap-4 max-lg:py-5">
        <div className="space-y-4 px-4">
          <Heading className="text-main">
            اكتشف خدمات مبنى ركاب الجزيرة T5
          </Heading>
          <Parag className="text-main lg:pe-10">
            يخدم مبنى ركاب الجزيرة T5 جميع ركاب طيران الجزيرة ليستمتعوا بتجربة
            السفر من نقطة وصولهم إلى المطار وحتى عودتهم.
          </Parag>
        </div>

        {servs.map((serv) => (
          <div key={serv.text} className="ps-4 flex gap-4 items-center">
            <div className="p-3 rounded-full bg-main-light">
              <img src={serv.image} alt={serv.text} />
            </div>
            <Parag className="text-black">{serv.text}</Parag>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreServices;
