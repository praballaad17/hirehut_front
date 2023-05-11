import React, { useState } from "react";
import { PAYTYPE } from "../../constants/variables";

export default function PayRate() {
  const [type, setType] = useState(PAYTYPE[0]);
  const [range, setRange] = useState({
    start: "",
    end: "",
  });
  const [maximumAmount, setMaximumAmount] = useState("");
  const [amount, setAmount] = useState("");

  console.log(type);
  return (
    <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow-lg rounded-3xl sm:p-10">
      <form className="mt-10" action="#" method="POST">
        <div>
          <label
            htmlFor="range"
            className="block text-xs font-semibold text-gray-600 uppercase"
          >
            Range
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            id="range"
            name="range"
            className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">--Select--</option>
            {PAYTYPE.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </div>

        {type === "range" ? (
          <div class="mb-4 grid grid-cols-5 gap-2">
            <div className="col-span-2">
              <label for="address" class="block text-gray-700 font-bold mb-2">
                Starting
              </label>
              <input
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                type="text"
                id="name"
                name="name"
                class="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="col-span-2">
              <label for="address" class="block text-gray-700 font-bold mb-2">
                Maximum:
              </label>
              <input
                // onChange={(e) => setForm({ ...form, name: e.target.value })}
                class="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        ) : (
          <div className="col-span-2">
            <label for="address" class="block text-gray-700 font-bold mb-2">
              {type === "strting amount"
                ? "strting amount"
                : type === "maximum amount"
                ? "maximum amount"
                : "exact amount"}
            </label>
            <input
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              type="text"
              placeholder="$"
              id="name"
              name="name"
              class="w-96 px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        )}
      </form>
    </div>
  );
}
