import React, { useEffect, useState } from "react";
import {
  CITIES,
  EDUFORM,
  EXPFORM,
  GENDER,
  JOBSEEKERFORM,
  PRONOUN,
  RACE,
  STATE,
  YEARSOFEXPERIANCE,
} from "../../constants/variables";
import { updateProfile } from "../../services/profileServices";
import { useUser } from "../../Context/userContext";
import { useJobSeeker } from "../../Context/JobseekerDataContext";
import { postJobseekerProfile } from "../../services/jobseekerServices";
import { processWebsiteInput } from "../../constants/utils";

export default function ProfileBox() {
  const { user, loading, setLoading, addToast } = useUser();
  const { fetchJobseekerProfileContext } = useJobSeeker();

  const [image, setImage] = useState("");
  const [isexpForm, setIsExpFrom] = useState(false);
  const [expForm, setExpFrom] = useState(EXPFORM);
  const [iseduForm, setIsEduFrom] = useState(false);
  const [eduForm, setEduFrom] = useState(EDUFORM);
  const [form, setForm] = useState(JOBSEEKERFORM);
  const [isEdit, setIsEdit] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await fetchJobseekerProfileContext();

        res.race = new Set(res.race);
        for (let key in JOBSEEKERFORM) {
          if (!res.hasOwnProperty(key)) {
            res[key] = JOBSEEKERFORM[key];
          }
        }
        setForm(res);
        setLoading(false);
      } catch (error) {
        console.log(error);
        addToast("error fetching profile", true);
        setLoading(false);
      }
    };
    fetch();
  }, []);

  // set cities according to state
  useEffect(() => {
    setCities(CITIES[form.state]);
  }, [form.state]);

  const handleImageChange = async (e) => {
    setLoading(true);
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];

      let formdata = new FormData();
      formdata.append("img", img);

      try {
        const res = await updateProfile(formdata, user.id);
        setForm({ ...form, img: img });
        setImage(URL.createObjectURL(img));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
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

  const submitForm = async () => {
    setLoading(true);
    let formData = { ...form };

    formData.race = [...form.race];

    try {
      const res = await postJobseekerProfile(user.id, formData);
      setIsEdit(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      addToast("error", true);
    }
  };

  const handleCancel = async () => {
    setIsEdit(false);
    try {
      await fetchJobseekerProfileContext();
    } catch (error) {
      addToast("Error");
    }
  };

  const handleCheck = (property, type) => {
    let newproperty = form[property];
    if (form[property].has(type)) {
      newproperty.delete(type);
    } else {
      newproperty.add(type);
    }
    setForm({
      ...form,
      [property]: newproperty,
    });
  };

  const handleAddData = (field, data, clearFun) => {
    let newField = form[field];

    setForm({
      ...form,
      [field]: [...newField, data],
    });

    clearFun();
  };

  const removeData = (property, idx) => {
    let newField = form[property];

    newField.splice(idx, 1);

    setForm({
      ...form,
      [property]: newField,
    });
  };

  const handleWebsite = (e, field) => {
    e.preventDefault();
    const res = processWebsiteInput(e.target.value);
    setForm({
      ...form,
      [field]: res,
    });
  };

  // if (loading) return;

  return (
    <div className="border-2 border-slate-300 w-90 h-full p-5 mt-5">
      <div className="border-b-2 border-slate-300 flex pb-5 ">
        {!isEdit ? (
          <button
            onClick={() => setIsEdit(true)}
            className="bg-slate-400 px-4 py-2 rounded-lg hover:bg-slate-500"
          >
            Edit
          </button>
        ) : (
          <>
            <button
              onClick={submitForm}
              className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-slate-400 px-4 py-2 rounded-lg hover:bg-slate-500"
            >
              Cancel
            </button>
          </>
        )}
      </div>
      <div className="border-b-2 border-slate-300 flex pb-5">
        <div className="w-1/3">
          <h2 className="text-xl font-semibold">About</h2>
          <p>Tell us about yourself so startups know who you are.</p>
        </div>
        <div className="w-2/3">
          <div className="mb-5">
            <label for="email" className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              readOnly={!isEdit}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center m-4">
            {form.img && image ? (
              <img
                className="w-20 h-20 rounded-full mr-5 object-cover"
                src={image}
              />
            ) : (
              <div className="inline-block w-20 h-20 rounded-full border-2 border-slate-500 mr-5"></div>
            )}
            <label
              htmlFor="image-upload"
              className="relative cursor-pointer bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow outline-none focus:outline-none"
            >
              {loading ? "Uploading" : "Upload Image"}
              <input
                readOnly={!isEdit}
                id="image-upload"
                type="file"
                accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp"
                className="sr-only"
                onChange={handleImageChange}
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Where are you based?
            </label>
            <select
              value={form.city}
              disabled={!isEdit}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="border border-gray-400 p-2  rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value={""}>select city</option>
              {cities.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              value={form.state}
              disabled={!isEdit}
              className="border border-gray-400 p-2  rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value={""}>select state</option>
              {STATE.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.data}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="block text-gray-700 font-bold mb-2">
                Select Your primary Role?
              </label>
              <select
                disabled={!isEdit}
                className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option></option>
              </select>
            </div>
            <div className="col-span-1">
              <label>Years Of Experiance</label>
              <select
                value={form.experiance}
                disabled={!isEdit}
                onChange={(e) =>
                  setForm({ ...form, experiance: e.target.value })
                }
                className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
              >
                {YEARSOFEXPERIANCE.map((item) => (
                  <option key={item.data} value={item.data}>
                    {item.data}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Open to following Role
            </label>
            <select
              disabled={!isEdit}
              className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option></option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Your Bio
            </label>
            <textarea
              value={form.bio}
              readOnly={!isEdit}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="border border-gray-400 w-full h-40"
            />
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
            <label className="block text-gray-700 font-bold mb-2">
              Website
            </label>
            <input
              readOnly={!isEdit}
              value={form.portfolio}
              onChange={(e) => handleWebsite(e, "portfolio")}
              placeholder="https://domain.com/"
              className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              LinkedIn
            </label>
            <input
              readOnly={!isEdit}
              value={form.linkedIn}
              onChange={(e) => handleWebsite(e, "linkedIn")}
              placeholder="https://linkedin/username"
              className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Github</label>
            <input
              readOnly={!isEdit}
              value={form.github}
              onChange={(e) => handleWebsite(e, "github")}
              placeholder="https://github.com/username"
              className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Twitter
            </label>
            <input
              readOnly={!isEdit}
              value={form.twitter}
              onChange={(e) => handleWebsite(e, "twitter")}
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
              <div className="mb-5">
                <label
                  for="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Company
                </label>
                <input
                  onChange={(e) =>
                    setExpFrom({ ...expForm, company: e.target.value })
                  }
                  readOnly={!isEdit}
                  className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-5">
                <label
                  for="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Title
                </label>
                <input
                  onChange={(e) =>
                    setExpFrom({ ...expForm, title: e.target.value })
                  }
                  readOnly={!isEdit}
                  className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-5">
                <label
                  for="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Start Date
                </label>
                <input
                  onChange={(e) =>
                    setExpFrom({ ...expForm, startDate: e.target.value })
                  }
                  readOnly={!isEdit}
                  type="date"
                  className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-5">
                <label
                  for="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  End Date
                </label>
                <input
                  onChange={(e) =>
                    setExpFrom({ ...expForm, endDate: e.target.value })
                  }
                  value={expForm.endDate}
                  disabled={expForm.isCurrent}
                  readOnly={!isEdit}
                  type="date"
                  className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
                />
                <input
                  onChange={(e) =>
                    setExpFrom({
                      ...expForm,
                      endDate: "",
                      isCurrent: !expForm.isCurrent,
                    })
                  }
                  readOnly={!isEdit}
                  className="mx-3"
                  type="checkbox"
                />
                <label>Currently Working here</label>
              </div>
              <div className="mb-5">
                <label
                  for="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Description
                </label>
                <textarea
                  onChange={(e) =>
                    setExpFrom({ ...expForm, description: e.target.value })
                  }
                  readOnly={!isEdit}
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
              <button
                onClick={() =>
                  handleAddData("workexperiance", expForm, clearExpForm)
                }
                className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
            </form>
          ) : (
            <button
              disabled={!isEdit}
              className="text-blue-600"
              onClick={() => setIsExpFrom(true)}
            >
              + Add work experiance
            </button>
          )}

          {form.workexperiance.map((exp, idx) => (
            <div className="bg-slate-200 rounded-lg my-2 p-2">
              <div className="text-xl font-bold flex justify-between">
                {exp.company}
                <i
                  onClick={() => removeData("workexperiance", idx)}
                  className="fa-solid fa-circle-xmark text-red-500 hover:text-red-700 cursor-pointer"
                ></i>
              </div>
              <div className="text-lg">{exp.title}</div>
              <div className="">
                {exp.startDate} - {exp?.isCurrent ? "Current" : exp.endDate}
              </div>
              <div className="font-bold text-lg">Description</div>
              <p className="whitespace-pre-wrap">{exp.description}</p>
            </div>
          ))}
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
              <div className="mb-5">
                <label
                  for="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Education
                </label>
                <input
                  value={eduForm.education}
                  onChange={(e) =>
                    setEduFrom({ ...eduForm, education: e.target.value })
                  }
                  readOnly={!isEdit}
                  className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-5">
                <label
                  for="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Graduation
                </label>
                <input
                  value={eduForm.granduation}
                  onChange={(e) =>
                    setEduFrom({ ...eduForm, granduation: e.target.value })
                  }
                  readOnly={!isEdit}
                  className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-5">
                <label
                  for="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Degree / Major
                </label>
                <input
                  value={eduForm.degree}
                  onChange={(e) =>
                    setEduFrom({ ...eduForm, degree: e.target.value })
                  }
                  readOnly={!isEdit}
                  className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-5 grid grid-cols-2 gap-4">
                <div className="">
                  <label
                    for="email"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    GPA
                  </label>
                  <input
                    value={eduForm.gpa}
                    onChange={(e) =>
                      setEduFrom({ ...eduForm, gpa: e.target.value })
                    }
                    readOnly={!isEdit}
                    placeholder="gpa"
                    className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="">
                  <label
                    for="email"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    {" "}
                    Max
                  </label>
                  <input
                    value={eduForm.max}
                    onChange={(e) =>
                      setEduFrom({ ...eduForm, max: e.target.value })
                    }
                    readOnly={!isEdit}
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
              <button
                onClick={() =>
                  handleAddData("education", eduForm, clearEduForm)
                }
                className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
            </form>
          ) : (
            <button
              disabled={!isEdit}
              className="text-blue-600"
              onClick={() => setIsEduFrom(true)}
            >
              + Add Education
            </button>
          )}

          {form.education.map((exp, idx) => (
            <div className="bg-slate-200 rounded-lg my-2 p-2">
              <div className="text-xl font-bold flex justify-between">
                {exp.education}
                <i
                  onClick={() => removeData("education", idx)}
                  className="fa-solid fa-circle-xmark text-red-500 hover:text-red-700 cursor-pointer"
                ></i>
              </div>
              <div className="text-lg">{exp.granduation}</div>
              <div className="">{exp.degree}</div>
              <div>
                {exp?.gpa} / {exp.max} GPA
              </div>
            </div>
          ))}
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
              disabled={!isEdit}
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
          <textarea
            readOnly={!isEdit}
            value={form.achivements}
            onChange={(e) => setForm({ ...form, achivements: e.target.value })}
            className="h-40 w-full border border-gray-400 rounded-lg p-2 focus:outline-none focus:border-blue-500"
          />
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
          <div className="mb-5">
            <label for="email" className="block text-gray-700 font-bold mb-2">
              Pronoun
            </label>
            <select
              disabled={!isEdit}
              value={form.pronoun}
              onChange={(e) => setForm({ ...form, pronoun: e.target.value })}
              className="capitalize border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
            >
              {PRONOUN.map((item) => (
                <option className="capitalize" key={item.key} value={item.key}>
                  {item.data}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-5">
            <label for="email" className="block text-gray-700 font-bold mb-2">
              Gender
            </label>
            <select
              disabled={!isEdit}
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              className="capitalize border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
            >
              {GENDER.map((item) => (
                <option className="capitalize" key={item.key} value={item.key}>
                  {item.data}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-5">
            <label for="email" className="block text-gray-700 font-bold mb-2">
              Race / Ethenicity
            </label>
            <>
              {RACE.map((item) => (
                <div key={item.key} className="block">
                  <input
                    disabled={!isEdit}
                    checked={form.race.has(item.key)}
                    onChange={(e) => handleCheck("race", item.key)}
                    className="mr-3"
                    type="checkbox"
                  />
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
