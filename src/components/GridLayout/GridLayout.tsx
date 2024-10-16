import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

type itemsProps = {
  items: { title: string; price: number; image: string }[];
};

export const GridLayout = ({ items }: itemsProps) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      transition={{
        staggerChildren: 0.05,
      }}
      className="min-h-[50dvh] mx-auto grid grid-flow-dense grid-cols-12 gap-x-[3dvw] gap-y-4 select-none"
    >
      {/* <DoubleBlock /> */}
      {items.map((item: { title: string; price: number; image: string }) => (
        <SingleBlock key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

const SingleBlock = ({
  className,
  title,
  price,
  image,
}: {
  className?: string;
  title: string;
  price: number;
  image: string;
}) => (
  <Block
    whileHover={{
      rotate: "2deg",
      scale: 1.1,
    }}
    className={cn("col-span-12 md:col-span-4 relative", className)}
  >
    <img
      src={image}
      alt={`${title} image`}
      className="inset-0 absolute object-fill w-full h-full"
    />

    <div
      className="flex justify-between p-4 bg-main/70 absolute
    bottom-10 left-1/2 -translate-x-1/2 w-[95%] rounded-full"
    >
      <p className="text-main-foreground">{title}</p>
      <p className="text-main-foreground">{price} SAR</p>
    </div>
  </Block>
);

export const Block = ({ className, ...rest }: any) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={twMerge(
        "col-span-4 [box-shadow:5px_6px_14px_0_rgba(0,0,0,0.5)] rounded-xl overflow-hidden min-h-72",
        className
      )}
      {...rest}
    />
  );
};
