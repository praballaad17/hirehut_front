import { CANDIDATES, JOBPAGE } from "./routes";

export const PROFILENAV = {
  OVERVIEW: "overview",
  BRANCHES: "branches",
};

export const NAVITEM = {
  HOME: "dashboard",
  PARTY: "party",
  ITEM: "item",
  SALES: "sales",
  PURCHASE: "purchase",
  GSTDASH: "gst",
  SETTING: "setting",
  EXPENSES: "expenses",
  CASHBANK: "cashbank",
  IMPORTITEM: "import-item",
};

export const JOBSTATUSOBJ = {
  OPEN: "open",
  CLOSE: "close",
  PENDING: "pending",
};

export const JOBSTATUS = ["open", "close", "pending"];

export const EXPFORM = {
  company: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  title: "",
  description: "",
};

export const EDUFORM = {
  education: "",
  granduation: "",
  degree: "",
  gpa: "",
  max: "",
};

export const PRONOUN = [
  { data: "he/him", key: "he" },
  { data: "she/her", key: "sh" },
  { data: "they/them", key: "th" },
  { data: "ze/hir", key: "ze" },
  { data: "xe/xem", key: "xe" },
  { data: "prefer not to say", key: "nill" },
];

export const GENDER = [
  { data: "male", key: "ma" },
  { data: "female", key: "fe" },
  { data: "non-binary", key: "nb" },
  { data: "transgender", key: "tr" },
  { data: "prefer not to say", key: "nill" },
];

export const GENDEROBJ = {
  ma: "male",
  fe: "female",
  nb: "non-binary",
  tr: "transgender",
  nill: "prefer not to say",
};

export const RACE = [
  { data: "American Indian or Alaska Native", key: "ai" },
  { data: "Asian", key: "as" },
  { data: "Black or African American", key: "bl" },
  { data: "Hispanic or Latino", key: "hl" },
  { data: "Middle Eastern", key: "me" },
  { data: "Native Hawaiian or Other Pacific Islander", key: "pi" },

  { data: "South Asian (such as Indian, Bangladeshi, Pakistani)", key: "sa" },
  {
    data: "Southeast Asian (such as Cambodian, Filipino, Thai, Vietnamese)",
    key: "se",
  },
  { data: "White", key: "wh" },
  { data: "Prefer not to say", key: "ns" },
];

export const JOBSEEKERFORM = {
  name: "",
  city: "",
  state: "AB",
  profileUrl: "",
  twitter: "",
  github: "",
  linkedIn: "",
  portfolio: "",
  workexperiance: [],
  education: [],
  skills: [],
  achivements: "",
  pronoun: "he",
  gender: "ma",
  race: new Set(),
  bio: "",
  primaryRole: "",
  roles: [],
  experiance: "",
};

export const EMPLOYEERROLES = ["founder", "hiring manager", "team member"];

export const NOOFEMPLOYEE = [
  { key: "AA", data: "1-10" },
  { key: "BB", data: "11-50" },
  { key: "CC", data: "51-100" },
  { key: "DD", data: "101-500" },
  { key: "EE", data: "501-1000" },
  { key: "FF", data: "1001-5000" },
  { key: "GG", data: "5000+" },
];

export const COMPANYDETAILS = {
  name: "",
  role: "",
  website: "",
  location: "",
  employeecount: "",
  description: "",
  pitch: "",
};

export const SIDEBAR = [
  {
    data: "jobs",
    icon: <i className="fa-solid fa-briefcase"></i>,
    link: JOBPAGE,
  },
  { data: "campaign", icon: <i className="fa-solid fa-bullhorn"></i> },
  {
    data: "candidates",
    icon: <i className="fa-solid fa-users"></i>,
    link: CANDIDATES,
  },
  { data: "search resume", icon: <i className="fa-solid fa-file"></i> },
  { data: "Interviews", icon: <i className="fa-solid fa-calendar-days"></i> },
];

export const BRANCHFORM = {
  name: "",
  address: "",
  city: "",
  state: "BC",
  pincode: "",
};

export const STATE = [
  { data: "Alberta", code: "AB" },
  { data: "British Columbia", code: "BC" },
  { data: "Manitoba", code: "MB" },
  { data: "New Brunswick", code: "NB" },
  { data: "Newfoundland and Labrador", code: "NL" },
  { data: "Northwest Territories", code: "NT" },
  { data: "Nova Scotia", code: "NS" },
  { data: "Nunavut", code: "NU" },
  { data: "Ontario", code: "ON" },
  { data: "Prince Edward Island", code: "PE" },
  { data: "Quebec", code: "QC" },
  { data: "Saskatchewan", code: "SK" },
  { data: "Yukon Territory", code: "YT" },
];

export const CITIES = {
  AB: ["Calgary", "Edmonton"],
  BC: ["Vancouver", "Victoria"],
  MB: ["Winnipeg"],
  NB: ["Fredericton", "Saint John"],
  NL: ["St. John's"],
  NT: ["Yellowknife"],
  NS: ["Halifax"],
  NU: ["Iqaluit"],
  ON: ["Toronto", "Ottawa"],
  PE: ["Charlottetown"],
  QC: ["Montreal", "Quebec City"],
  SK: ["Saskatoon", "Regina"],
  YT: ["Whitehorse"],
};

export const JOBTYPE = [
  { code: "FT", name: "Full-time" },
  { code: "RP", name: "Regular / Permanent" },
  { code: "FR", name: "Fresher" },
  { code: "PT", name: "Part-time" },
  { code: "IN", name: "Internship" },
  { code: "CT", name: "Contractual / Temporary" },
  { code: "FL", name: "Freelance" },
  { code: "VL", name: "Volunteer" },
];

export const JOBTYPEOBJ = {
  CT: "Contractual / Temporary",
  FL: "Freelance",
  FR: "Fresher",
  FT: "Full-time",
  IN: "Internship",
  PT: "Part-time",
  RP: "Regular / Permanent",
  VL: "Volunteer",
};

export const SHIFT = [
  { code: "DS", name: "Day shift" },
  { code: "MS", name: "Morning shift" },
  { code: "FS", name: "Flexible shift" },
  { code: "RS", name: "Rotational shift" },
  { code: "NS", name: "Night shift" },
  { code: "MF", name: "Monday to Friday" },
  { code: "ES", name: "Evening shift" },
  { code: "WA", name: "Weekend availability" },
  { code: "FX", name: "Fixed shift" },
  { code: "US", name: "US shift" },
];

export const SHIFTOBJ = {
  DS: "Day shift",
  MS: "Morning shift",
  FS: "Flexible shift",
  RS: "Rotational shift",
  NS: "Night shift",
  MF: "Monday to Friday",
  ES: "Evening shift",
  WA: "Weekend availability",
  FX: "Fixed shift",
  US: "US shift",
};

export const SUPPLEMENTPAY = [
  { code: "PB", name: "Performance bonus" },
  { code: "YB", name: "Yearly bonus" },
  { code: "CP", name: "Commission pay" },
  { code: "OP", name: "Overtime pay" },
  { code: "QB", name: "Quarterly bonus" },
  { code: "SA", name: "Shift allowance" },
  { code: "JB", name: "Joining bonus" },
  { code: "OT", name: "Other" },
];

export const SUPPLEMENTPAYOBJ = {
  PB: "Performance bonus",
  YB: "Yearly bonus",
  CP: "Commission pay",
  OP: "Overtime pay",
  QB: "Quarterly bonus",
  SA: "Shift allowance",
  JB: "Joining bonus",
  OT: "Other",
};

export const PAYTYPE = [
  "range",
  "strting amount",
  "maximum amount",
  "exact amount",
];

export const BENEFITS = [
  { code: "HI", name: "Health insurance" },
  { code: "PF", name: "Provident Fund" },
  { code: "CR", name: "Cell phone reimbursement" },
  { code: "PS", name: "Paid sick time" },
  { code: "WFH", name: "Work from home" },
  { code: "PTO", name: "Paid time off" },
  { code: "FP", name: "Food provided" },
  { code: "LI", name: "Life insurance" },
  { code: "IR", name: "Internet reimbursement" },
  { code: "CA", name: "Commuter assistance" },
  { code: "LE", name: "Leave encashment" },
  { code: "FS", name: "Flexible schedule" },
  { code: "OT", name: "Other" },
];

export const BENEFITSOBJ = {
  HI: "Health insurance",
  PF: "Provident Fund",
  CR: "Cell phone reimbursement",
  PS: "Paid sick time",
  WFH: "Work from home",
  PTO: "Paid time off",
  FP: "Food provided",
  LI: "Life insurance",
  IR: "Internet reimbursement",
  CA: "Commuter assistance",
  LE: "Leave encashment",
  FS: "Flexible schedule",
  OT: "Other",
};

export const HIRETIME = [
  { code: "01", name: "1 - 2 days" },
  { code: "02", name: "2 - 7 days" },
  { code: "03", name: "1 - 2 weeks" },
  { code: "04", name: "2 - 4 weeks" },
  { code: "05", name: "more than 4 weeks" },
];

export const HIRETIMEOBJ = {
  "01": "1 - 2 days",
  "02": "2 - 7 days",
  "03": "1 - 2 weeks",
  "04": "2 - 4 weeks",
  "05": "more than 4 weeks",
};

export const JOBDETAILS = {
  title: "",
  location: "",
  jobType: new Set(),
  shift: new Set(),
  benefits: new Set(),
  supplementPay: new Set(),
  opening: 0,
  detailPDF: "",
  hireTime: "01",
  description: "",
  payRate: {
    start: 0,
    end: 0,
  },
};

export const YEARSOFEXPERIANCE = [
  { data: "0" },
  { data: "1" },
  { data: "2" },
  { data: "3" },
  { data: "4" },
  { data: "5" },
  { data: "6" },
  { data: "7" },
  { data: "8" },
  { data: "9" },
  { data: "10+" },
];
