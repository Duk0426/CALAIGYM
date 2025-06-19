import { ShopCard } from "@/components/ShopCard";

const products = [
  {
    id: 1,
    name: "Protein Powder",
    price: 49.99,
    imageUrl: "/products/protein.jpg",
  },
  { id: 2, name: "Creatine", price: 29.99, imageUrl: "/products/creatine.jpg" },
  // add more sample products here
];

export default function ShopPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gym Shop</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ShopCard
            key={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
