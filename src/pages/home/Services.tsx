const items = [
  {
    title: "أحجز مقعدك",
    image: "/assets/images/passenger.svg",
  },
  {
    title: "شراء وزن إضافي",
    image: "/assets/images/tourist-bag.svg",
  },
  {
    title: "قاعة Pearl",
    image: "/assets/images/hall.svg",
  },
  {
    title: "السوق الحرّة ومتجر طيران الجزيرة",
    image: "/assets/images/tag.svg",
  },
];

const Services = () => {
  return (
    <section className="my-10 py-10 bg-main">
      <h2 className="text-main-foreground mb-10 text-3xl lg:text-5xl font-bold text-center">
        الخدمات الإضافية عند السفر
      </h2>

      <div className="grid grid-cols-2 gap-4 max-w-3xl mx-auto">
        {items.map((item) => (
          <div
            key={item.title}
            className="group bg-white text-main py-6 px-4 rounded-md transition-colors duration-300 hover:text-white hover:bg-main-light/50"
          >
            <img
              src={item.image}
              className="size-10 mx-auto mb-2 group-hover:invert"
            />
            <p className="font-bold text-center">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Services;
