"use client";
import { useState } from "react";

export function CalorieCalculator() {
  const [weight, setWeight] = useState(0);
  const [calories, setCalories] = useState(0);

  const calculate = () => setCalories(weight * 30);

  return (
    <div className="space-y-4">
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(+e.target.value)}
        placeholder="Enter your weight"
        className="p-2 border rounded w-full"
      />
      <button
        onClick={calculate}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Calculate
      </button>
      <p>Estimated Calories: {calories}</p>
    </div>
  );
}
