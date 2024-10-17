import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef } from "react";

const imgs = [
  {
    sm: "assets/images/banner-1.webp",
    lg: "assets/images/banner-1-lg.webp",
  },
  {
    sm: "assets/images/banner-2.webp",
    lg: "assets/images/banner-2-lg.webp",
  },
];

const SlidingBanners = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div className="container pt-10">
      <Carousel
        // @ts-ignore
        plugins={[plugin.current]}
        className="w-full "
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{ direction: "rtl" }}
      >
        <CarouselContent>
          {imgs.map((img) => (
            <CarouselItem key={img.sm}>
              <img
                src={img.sm}
                srcSet={`${img.sm} 320w, ${img.lg}`}
                alt={`image: ${img.sm}`}
                className="max-h-[50dvh] w-full"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bottom-4 top-auto left-[calc(50%-1.2rem)] -translate-x-1/2 xl:left-[calc(50%-2.5rem)] xl:translate-x-0" />
        <CarouselNext className="bottom-4 top-auto right-[calc(50%-1.2rem)] translate-x-1/2 xl:right-[calc(50%-2.5rem)] xl:translate-x-0" />
      </Carousel>
    </div>
  );
};
export default SlidingBanners;
