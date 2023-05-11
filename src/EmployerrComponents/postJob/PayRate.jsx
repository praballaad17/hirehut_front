import React, { useState } from "react";

export default function PayRate() {
  const [range, setRange] = useState(false);
  const [startingAmount, setStartingAmount] = useState("");
  const [maximumAmount, setMaximumAmount] = useState("");
  const [exactAmount, setExactAmount] = useState("");

  return (
    <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow-lg rounded-3xl sm:p-10">
      <div className="max-w-md mx-auto">
        <div className="flex items-center space-x-7"></div>
        <form className="mt-10" action="#" method="POST">
          <div>
            <label
              htmlFor="range"
              className="block text-xs font-semibold text-gray-600 uppercase"
            >
              Range
            </label>
            <select
              id="range"
              name="range"
              onChange={(e) => setRange(e.target.value)}
              value={range}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              <option value="">--Select--</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          {range === "false" && (
            <>
              <div className="mt-7">
                <label
                  htmlFor="startingAmount"
                  className="block text-xs font-semibold text-gray-600 uppercase"
                >
                  Starting Amount
                </label>
                <input
                  type="number"
                  name="startingAmount"
                  id="startingAmount"
                  value={startingAmount}
                  onChange={(e) => setStartingAmount(e.target.value)}
                  placeholder="$0.00"
                  autoComplete="given-name"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>

              <div className="mt-7">
                <label
                  htmlFor="maximumAmount"
                  className="block text-xs font-semibold text-gray-600 uppercase"
                >
                  Maximum Amount
                </label>
                <input
                  type="number"
                  name="maximumAmount"
                  id="maximumAmount"
                  value={maximumAmount}
                  onChange={(e) => setMaximumAmount(e.target.value)}
                  placeholder="$0.00"
                  autoComplete="family-name"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
            </>
          )}

          {range === "true" && (
            <>
              <div className="mt-7">
                <label
                  htmlFor="exactAmount"
                  className="block text-xs font-semibold text-gray-600 uppercase"
                >
                  Exact Amount
                </label>
                <input
                  type="number"
                  name="exactAmount"
                  id="exactAmount"
                  value={exactAmount}
                  onChange={(e) => setExactAmount(e.target.value)}
                  placeholder="$0.00"
                  autoComplete=""
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
            </>
          )}

          {range === "" && (
            <>
              <div className="">{/* empty div */}</div>

              <div className="">{/* empty div */}</div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
