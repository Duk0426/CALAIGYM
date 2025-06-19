export function ProfileCard({
  name,
  age,
  weight,
  goal,
}: {
  name: string;
  age?: number;
  weight?: number;
  goal?: string;
}) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <p>Age: {age ?? "N/A"}</p>
      <p>Weight: {weight ?? "N/A"} kg</p>
      <p>Goal: {goal ?? "N/A"}</p>
    </div>
  );
}
