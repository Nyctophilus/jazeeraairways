import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ShinyButton from "@/components/ui/shiny-button";

const items = [
  {
    title: "مومباي",
    price: 68,
    image: "/assets/images/mumbai.webp",
  },
  {
    title: "بيروت",
    price: 97,
    image: "/assets/images/beirut.webp",
  },
  {
    title: "دبي",
    price: 59,
    image: "/assets/images/dubai.webp",
  },
  {
    title: "القاهرة",
    price: 60,
    image: "/assets/images/cairo.webp",
  },
];

const OurDestinations = () => {
  return (
    <section className="py-10">
      <h2 className="text-main pb-5 text-xl lg:text-3xl font-bold text-center">
        عروض السفر المميزة والحصرية
      </h2>

      <Carousel
        className="w-full xl:w-[95%] xl:mx-auto select-none lg:max-w-7xl"
        dir="ltr"
      >
        <CarouselContent className="-ml-1 py-4">
          {items.map(
            (item: { title: string; price: number; image: string }) => (
              <CarouselItem
                key={item.title}
                className="bg-white pl-0 ml-4 basis-1/2 lg:basis-1/3 xl:basis-1/4 relative [box-shadow:5px_6px_14px_0_rgba(0,0,0,0.5)] rounded-xl overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={`${item.title} image`}
                  className="h-48 object-cover w-full"
                />
                <div className="text-center p-4">
                  <p className="font-bold text-main-light">{item.title}</p>
                  <p className="font-bold text-main">من {item.price} KWD</p>

                  <ShinyButton
                    text="أحجز الآن"
                    className="mt-2.5 whitespace-nowrap w-fit bg-main-light hover:bg-main duration-300 transition-colors text-white rounded-3xl font-semibold px-8 mx-auto block py-1"
                    type={"submit"}
                  />
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
