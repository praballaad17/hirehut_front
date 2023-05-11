import React, { useState } from "react";
import { useData } from "../../Context/DataContext";
import { BRANCHFORM, JOBTYPE, STATE } from "../../constants/variables";

export default function Branches() {
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(BRANCHFORM);

  const { branches, addBranch } = useData();

  console.log(branches);

  return (
    <div className="  border-2 border-slate-300 w-90 h-full p-5 mt-5">
      <button
        onClick={() => setFormOpen(!formOpen)}
        className="inline-block px-4 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        <div className="text-xl inline-block">+</div> Add Branch
      </button>
      {formOpen ? (
        <form class="w-3/4  mt-8 bg-gray-200 p-4 rounded-lg">
          <div class="mb-4">
            <label for="name" class="block text-gray-700 font-bold mb-2">
              Name:
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
          <div class="mb-4">
            <label for="address" class="block text-gray-700 font-bold mb-2">
              Address:
            </label>
            <textarea
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              id="address"
              name="address"
              class="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
              required
            ></textarea>
          </div>
          <div class="mb-4 grid grid-cols-5 gap-2">
            <div className="col-span-2">
              <label for="address" class="block text-gray-700 font-bold mb-2">
                City:
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

            <div className="col-span-1">
              <label for="address" class="block text-gray-700 font-bold mb-2">
                Pincode:
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
                State:
              </label>
              <select
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                class="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
              >
                {STATE.map((state) => (
                  <option key={state.data} type="text" id="name" required>
                    {state.data}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div class="flex justify-end">
            <button
              onClick={(e) => {
                e.preventDefault();
                addBranch(form);
              }}
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
            >
              Save
            </button>
            <button
              onClick={() => setFormOpen(false)}
              class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Close
            </button>
          </div>
        </form>
      ) : (
        <></>
      )}

      <div className="grid grid-cols-3 gap-4 mt-4">
        {branches.map((brnach) => (
          <div className="bg-gray-200 p-4 rounded-lg col-span-1">
            <div className="font-bold text-xl"> {brnach.name}</div>
            <div>{brnach.address}</div>
          </div>
        ))}
      </div>
    </div>
  );
}