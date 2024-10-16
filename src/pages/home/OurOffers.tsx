import { GridLayout } from "@/components/GridLayout/GridLayout";

const items = [
  {
    title: "جدة",
    price: 169,
    image: "/assets/images/jeda.jpg",
  },
  {
    title: "الدمام",
    price: 169,
    image: "/assets/images/dammam.jpg",
  },
  {
    title: "الرياض",
    price: 179,
    image: "/assets/images/riyad.jpg",
  },
];

const OurOffers = () => {
  return (
    <section className="container my-10">
      <h2 className="text-main pb-5 lg:text-3xl font-bold">عروض الرحلات</h2>
      <GridLayout items={items} />
    </section>
  );
};
export default OurOffers;
