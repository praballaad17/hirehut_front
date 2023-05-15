import React, { useEffect, useState } from "react";
import { useData } from "../../Context/EmployeerDataContext";
import { BRANCHFORM, CITIES, STATE } from "../../constants/variables";
import { useUser } from "../../Context/userContext";
import { deleteBranch } from "../../services/employeerServices";

export default function Branches() {
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(BRANCHFORM);
  const { branches, addBranchContext, getAllBranchesContext } = useData();
  const { setLoading, addToast } = useUser();
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getAllBranchesContext();
  }, []);

  useEffect(() => {
    console.log("set city, ", form.state);
    setCities(CITIES[form.state]);
  }, [form.state]);

  const handleAddBranch = async (e) => {
    if (!form.name || !form.address || !form.city || !form.pincode) {
      addToast("Fill all form Fields", true);
      return;
    }
    setLoading(true);
    e.preventDefault();
    await addBranchContext(form);
    setForm(BRANCHFORM);
    setFormOpen(false);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteBranch(id);
      addToast(`Branch is deleted`);
      getAllBranchesContext();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

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
              value={form.name}
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
              value={form.address}
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
              <select
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                class="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
              >
                <option value={null}>select</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-1">
              <label for="address" class="block text-gray-700 font-bold mb-2">
                Pincode:
              </label>
              <input
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
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
                value={form.state}
                onChange={(e) => {
                  setForm({ ...form, state: e.target.value });
                }}
                class="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
              >
                {STATE.map((state) => (
                  <option key={state.code} value={state.code} required>
                    {state.data}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div class="flex justify-end">
            <button
              onClick={handleAddBranch}
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
        {branches.map((branch) => (
          <div
            key={branch._id}
            className="group/item bg-gray-200 p-4 rounded-lg col-span-1"
          >
            <div>
              <div className="font-bold text-xl"> {branch.name}</div>
              <div>{branch.address}</div>
              <div>
                {branch.city}, {branch.state}
              </div>
            </div>
            <div>
              <button
                onClick={() => handleDelete(branch._id)}
                className="invisible group-hover/item:visible hover:text-red-600"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
