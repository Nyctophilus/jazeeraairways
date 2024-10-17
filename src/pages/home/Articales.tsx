import Heading from "@/components/Heading/Heading";
import Parag from "@/components/Parag/Parag";

const articales = [
  {
    title: "VIV",
    text: "اذا كنت تبحث عن التميز والخصوصية أثناء سفرك، فبوابتك الخاصة VIVهي الحل الأمثل لتجربة سفر فريدة من نوعها سواء لرحلات الراحة والاستجمام أو لرحلات...",
    image: "/assets/images/arti-1.webp",
  },
  {
    title: "جولات وفعاليات سياحية",
    text: "اختر ما يناسبك من بين باقة مميزة من الأنشطة الممتعة المتاحة لتحظى برحلة لا تنسى",
    image: "/assets/images/arti-2.webp",
  },
  {
    title: "J Café",
    text: "يمكنك طلب وجبتك مُسبقاً من قائمة الطعام التي توفّر لك خيارات متنوعة من المأكولات والمرطبات بأسعار مناسبة وترضي جميع الأذواق.",
    image: "/assets/images/arti-3.webp",
  },
];

const Articales = () => {
  return (
    <section className="container grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
      {articales.map((item) => (
        <div
          key={item.title}
          className="size-full bg-white rounded-xl border shadow-sm overflow-hidden"
        >
          <img src={item.image} alt={item.title} className="w-full h-50" />
          <div className="p-4">
            <Heading className="text-main mb-2">{item.title}</Heading>
            <Parag className="text-black lg:pb-10">{item.text}</Parag>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Articales;
