import React, { useState } from "react";
import { EXPFORM, GENDER, PRONOUN, RACE } from "../../constants/variables";

export default function ProfileBox() {
  const [image, setImage] = React.useState(null);
  const [isexpForm, setIsExpFrom] = useState(false);
  const [expForm, setExpFrom] = useState(EXPFORM);
  const [iseduForm, setIsEduFrom] = useState(false);
  const [eduForm, setEduFrom] = useState(EXPFORM);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const clearExpForm = () => {
    setIsExpFrom(false);
    setExpFrom(EXPFORM);
  };

  const clearEduForm = () => {
    setIsEduFrom(false);
    setEduFrom(EXPFORM);
  };

  return (
    <div className="border-2 border-slate-400 w-90 h-full p-5 mt-5">
      <div className="border-b-2 border-slate-300 flex pb-5">
        <div className="w-1/3">
          <h2 className="text-xl font-semibold">About</h2>
          <p>Tell us about yourself so startups know who you are.</p>
        </div>
        <div className="w-2/3">
          <div class="mb-5">
            <label for="email" class="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
          <div className="flex items-center m-4">
            <div className="inline-block w-20 h-20 rounded-full border-2 border-slate-500 mr-5"></div>
            <label htmlFor="image-upload" className="relative cursor-pointer">
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow outline-none focus:outline-none">
                Upload Image
              </button>
              <input
                id="image-upload"
                type="file"
                className="sr-only"
                onChange={handleImageChange}
              />
            </label>
          </div>
          <div>
            <label class="block text-gray-700 font-bold mb-2">
              Where are you based?
            </label>
            <select className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500">
              <option></option>
            </select>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label class="block text-gray-700 font-bold mb-2">
                Select Your primary Role?
              </label>
              <select className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500">
                <option></option>
              </select>
            </div>
            <div className="col-span-1">
              <label>Years Of Experiance</label>
              <select className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500">
                <option></option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-gray-700 font-bold mb-2">
              Open to following Role
            </label>
            <select className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500">
              <option></option>
            </select>
          </div>
          <div>
            <label class="block text-gray-700 font-bold mb-2">Your Bio</label>
            <textarea className="border border-gray-400 w-full h-40" />
          </div>
        </div>
      </div>

      <div className="border-b-2 border-slate-300 grid grid-cols-3 gap-4 pb-5">
        <div className="col-span-1">
          <h2 className="text-xl font-semibold">Social Profiles</h2>
          <p>Where can people find you online?</p>
        </div>
        <div className="col-span-2">
          <div>
            <label class="block text-gray-700 font-bold mb-2">Website</label>
            <input
              placeholder="https://domain.com/"
              className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-bold mb-2">LinkedIn</label>
            <input
              placeholder="https://linkedin/username"
              className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-bold mb-2">Github</label>
            <input
              placeholder="https://github.com/username"
              className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-bold mb-2">Twitter</label>
            <input
              placeholder="https://twitter.com/username"
              className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="border-b-2 border-slate-300 grid grid-cols-3 gap-4 pb-5">
        <div className="col-span-1">
          <h2 className="text-xl font-semibold">Work Experiance</h2>
          <p>What other position have you held</p>
        </div>
        <div className="col-span-2">
          {isexpForm ? (
            <form className="bg-slate-100 p-5">
              <div class="mb-5">
                <label for="email" class="block text-gray-700 font-bold mb-2">
                  Company
                </label>
                <input className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500" />
              </div>
              <div class="mb-5">
                <label for="email" class="block text-gray-700 font-bold mb-2">
                  Title
                </label>
                <input className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500" />
              </div>
              <div class="mb-5">
                <label for="email" class="block text-gray-700 font-bold mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div class="mb-5">
                <label for="email" class="block text-gray-700 font-bold mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
                />
                <input className="mx-3" type="checkbox" />
                <label>Currently Working here</label>
              </div>
              <div class="mb-5">
                <label for="email" class="block text-gray-700 font-bold mb-2">
                  Description
                </label>
                <textarea
                  placeholder="description"
                  className="border h-40 w-full border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                onClick={clearExpForm}
                className="  bg-slate-400 text-white font-bold py-2 px-4 rounded mr-4"
              >
                Cancel
              </button>
              <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Save
              </button>
            </form>
          ) : (
            <button
              className="text-blue-600"
              onClick={() => setIsExpFrom(true)}
            >
              + Add work experiance
            </button>
          )}
        </div>
      </div>

      <div className="border-b-2 border-slate-300 grid grid-cols-3 gap-4 pb-5">
        <div className="col-span-1">
          <h2 className="text-xl font-semibold">Education</h2>
          <p>What other position have you held</p>
        </div>
        <div className="col-span-2">
          {iseduForm ? (
            <form className="bg-slate-100 p-5">
              <div class="mb-5">
                <label for="email" class="block text-gray-700 font-bold mb-2">
                  Education
                </label>
                <input className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500" />
              </div>
              <div class="mb-5">
                <label for="email" class="block text-gray-700 font-bold mb-2">
                  Graduation
                </label>
                <input className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500" />
              </div>
              <div class="mb-5">
                <label for="email" class="block text-gray-700 font-bold mb-2">
                  Degree / Major
                </label>
                <input className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500" />
              </div>
              <div class="mb-5 grid grid-cols-2 gap-4">
                <div className="">
                  <label for="email" class="block text-gray-700 font-bold mb-2">
                    GPA
                  </label>
                  <input
                    placeholder="gpa"
                    className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="">
                  <label for="email" class="block text-gray-700 font-bold mb-2">
                    {" "}
                    Max
                  </label>
                  <input
                    placeholder="max"
                    className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                onClick={clearEduForm}
                className="  bg-slate-400 text-white font-bold py-2 px-4 rounded mr-4"
              >
                Cancel
              </button>
              <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Save
              </button>
            </form>
          ) : (
            <button
              className="text-blue-600"
              onClick={() => setIsEduFrom(true)}
            >
              + Add Education
            </button>
          )}
        </div>
      </div>

      <div className="border-b-2 border-slate-300 grid grid-cols-3 gap-4 pb-5">
        <div className="col-span-1">
          <h2 className="text-xl font-semibold">Skills</h2>
          <p>What other position have you held</p>
        </div>
        <div className="col-span-2">
          <div></div>
          <div>
            <select
              placeholder="python, React, etc..."
              className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option></option>
            </select>
          </div>
        </div>
      </div>

      <div className="border-b-2 border-slate-300 grid grid-cols-3 gap-4 pb-5">
        <div className="col-span-1">
          <h2 className="text-xl font-semibold">Achivements</h2>
          <p>What other position have you held</p>
        </div>
        <div className="col-span-2">
          <textarea className="h-40 w-full border border-gray-400 rounded-lg p-2 focus:outline-none focus:border-blue-500" />
        </div>
      </div>

      <div className="border-b-2 border-slate-300 grid grid-cols-3 gap-4 pb-5">
        <div className="col-span-1">
          <h2 className="text-xl font-semibold">Identity</h2>
          <p>
            At Hire Hut, we’re committed to helping companies hire in a more
            inclusive way. Part of that includes asking candidates to share
            demographic information so we can help recruiters understand and
            build their pipeline. Self identifying is completely optional, and
            we'll handle your information with care. Your responses to gender
            and ethnicity will not be displayed on your profile, and displaying
            your pronouns is optional.
          </p>
        </div>
        <div className="col-span-2">
          <div class="mb-5">
            <label for="email" class="block text-gray-700 font-bold mb-2">
              Pronoun
            </label>
            <select className="capitalize border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500">
              {PRONOUN.map((item) => (
                <option className="capitalize" key={item.key} value={item.key}>
                  {item.data}
                </option>
              ))}
            </select>
          </div>
          <div class="mb-5">
            <label for="email" class="block text-gray-700 font-bold mb-2">
              Gender
            </label>
            <select className="capitalize border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500">
              {GENDER.map((item) => (
                <option className="capitalize" key={item.key} value={item.key}>
                  {item.data}
                </option>
              ))}
            </select>
          </div>
          <div class="mb-5">
            <label for="email" class="block text-gray-700 font-bold mb-2">
              Race / Ethenicity
            </label>
            <>
              {RACE.map((item) => (
                <div className="block">
                  <input className="mr-3" type="checkbox" />
                  <label>{item.data}</label>
                </div>
              ))}
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
