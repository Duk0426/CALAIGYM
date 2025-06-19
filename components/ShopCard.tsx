export function ShopCard({
  name,
  price,
  imageUrl,
}: {
  name: string;
  price: number;
  imageUrl?: string;
}) {
  return (
    <div className="p-4 rounded-lg border shadow-sm bg-white">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-32 object-cover rounded mb-2"
        />
      )}
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-green-600 font-semibold">${price.toFixed(2)}</p>
    </div>
  );
}
