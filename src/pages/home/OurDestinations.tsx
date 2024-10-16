import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const items = [
  {
    title: "المدينة المنورة",
    price: 179,
    image: "/assets/images/madena.png",
  },
  {
    title: "دبي",
    price: 189,
    image: "/assets/images/dubai.jpg",
  },
  {
    title: "القاهرة",
    price: 259,
    image: "/assets/images/cairo.jpg",
  },
  {
    title: "إسطنبول",
    price: 339,
    image: "/assets/images/istanbul.jpg",
  },
];

const OurDestinations = () => {
  return (
    <section className="container py-20">
      <h2 className="text-main pb-5 lg:text-3xl font-bold">أكتشف وجهاتنا</h2>

      <Carousel className="w-full xl:w-[95%] xl:mx-auto select-none" dir="ltr">
        <CarouselContent className="-ml-1 py-4 h-[50dvh]">
          {items.map(
            (item: { title: string; price: number; image: string }) => (
              <CarouselItem
                key={item.title}
                className="ml-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 relative [box-shadow:5px_6px_14px_0_rgba(0,0,0,0.5)] rounded-xl overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={`${item.title} image`}
                  className="inset-0 absolute object-fill w-full h-full"
                />
                <div
                  className="flex justify-between p-4 bg-main/70 absolute
                  bottom-10 left-1/2 -translate-x-1/2 w-[95%] rounded-full"
                >
                  <p className="text-main-foreground">{item.title}</p>
                  <p className="text-main-foreground">{item.price} SAR</p>
                </div>
              </CarouselItem>
            )
          )}
        </CarouselContent>
        <CarouselPrevious className="bg-main text-white border-main transition-colors duration-300" />
        <CarouselNext className="bg-main text-white border-main transition-colors duration-300" />
      </Carousel>
    </section>
  );
};
export default OurDestinations;
