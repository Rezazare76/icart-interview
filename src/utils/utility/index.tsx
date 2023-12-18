import { ChangeEvent } from "react";
import { domain } from "utils/const";
import { toast } from "react-toastify";
import PN from "persian-number";
export const formatPersianNumber = (value: number | string | undefined) => {
  if (value == undefined) return;
  const number = Number(value);
  return (
    typeof number === "number" &&
    number.toLocaleString("fa-IR", { useGrouping: true })
  );
};
export const formatEnglandNumber = (persianNumber: string) => {
  // Replace Persian thousands separators with an empty string
  const cleanedNumber = persianNumber.replace(/٬/gi, "");

  // Convert Persian digits to English digits
  const englishNumber = Array.from(cleanedNumber, (char) => {
    const persianDigit = char.charCodeAt(0) - "۰".charCodeAt(0);
    return persianDigit >= 0 && persianDigit <= 9
      ? persianDigit.toString()
      : char;
  }).join("");

  // Parse the number and format it using toLocaleString
  const parsedNumber = parseFloat(englishNumber);
  if (!isNaN(parsedNumber)) {
    return parsedNumber.toLocaleString("en-US");
  } else {
    return "Invalid number";
  }
};

// export const formatEnglandNumber = (number: string) => {
//   const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
//   const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

//   const numberString = number.replace(/[۰-۹]/g, (match) => {
//     const index = persianNumbers.indexOf(match);
//     return index !== -1 ? englishNumbers[index] : match;
//   });

//   return parseFloat(numberString).toLocaleString("en-US", {
//     useGrouping: false,
//   });
// };
export const checkToken = async (token: string | null) => {
  const response = await fetch(`${domain}role/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};
export const checkWalletCard = async () => {
  const userToken = sessionStorage.getItem("userToken");
  const response = await fetch(`${domain}wallet/verify`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  });
  const data = await response.json();
  return data;
};
// useage
/**
 
  useEffect(() => {
    const userToken = sessionStorage.getItem("userToken");
    const fetchData = async () => {
      try {
        await checkToken(userToken);
      } catch (error) {
        navigate("/authentication/login");
      }
    };
    if (userToken) fetchData();
  });
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const regexObj: any = {
  "no-space": {
    reg: /\s/,
    errMessage: "(لطفا فقط از اعداد و حروف انگلیسی استفاده کنید)",
  },
  "number-en": {
    reg: /^[a-zA-Z0-9]+$/,
    errMessage: "(لطفا فقط از اعداد و حروف انگلیسی استفاده کنید)",
  },
  number: {
    reg: /^[0-9]+$/,
    errMessage: "(لطفا فقط از اعداد و حروف انگلیسی استفاده کنید)",
  },
};
export const validationHandler = (
  e: ChangeEvent<HTMLInputElement>,
  regex: string,
  setValidateValue: (value: string) => void,
  setErrorMessage: (error: string) => void,
  minLen: number | undefined
) => {
  const value = e.target.value;
  const a = new RegExp(regexObj[regex].reg);
  if (a.test(value) || value === "") {
    setValidateValue(value);
    if (minLen && value.length < minLen)
      setErrorMessage(`(لطفا اطلاعات خود را به صورت کامل و صحیح وارد کنید)`);
    else setErrorMessage("");
  } else setErrorMessage(regexObj[regex].errMessage);
};
export const handleBookmarkClick = (id: string) => {
  const bookmarkElement = document.getElementById(id);
  if (bookmarkElement) {
    bookmarkElement.scrollIntoView({ behavior: "smooth" });
  }
};
const notifyError = (e: string) => toast.error(e);
export const regularFetch = async (
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  done: (a: any) => void,
  method: "GET" | "PUT" | "DELETE" | "POST",
  loading?: (value: boolean) => void,
  error?: () => void
) => {
  const userToken = sessionStorage.getItem("userToken");
  loading?.(true);
  await fetch(`${domain}${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify(body),
  })
    .then(async (rep) => {
      if (rep.ok) {
        const jsonData = await rep.json();
        loading?.(false);
        done(jsonData);
      } else {
        const errorData = await rep.json();
        loading?.(false);
        error?.();
        notifyError(errorData?.detail?.persian_message);
      }
    })
    .catch((e) => {
      console.log(e);

      loading?.(false);
      error?.();
      notifyError("خطا در سرور");
    });
};
export const formFetch = async (
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: Record<string, any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  done: (a: Promise<any>) => void,
  method: "GET" | "PUT" | "DELETE" | "POST",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: (rep: any) => void,
  loading?: (value: boolean) => void
) => {
  const userToken = sessionStorage.getItem("userToken");
  loading?.(true);
  const formData = new FormData();
  Object.keys(body).map((e: string) => formData.append(e, body?.[e]));
  console.log(Object.keys(body).map((e: string) => ({ e: body?.[e] })));

  await fetch(`${domain}${url}`, {
    method: method,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: formData,
  })
    .then(async (rep) => {
      if (rep.ok) {
        const jsonData = await rep.json();
        loading?.(false);
        done(jsonData);
      } else {
        const errorData = await rep.json();
        loading?.(false);

        error?.(errorData?.detail?.persian_message);
      }
    })
    .catch((rep) => {
      loading?.(false);
      error?.(rep);
    });
};
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Optional: animated scrolling
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const banks: any = {
  "585983": {
    bankName: "بانک تجارت",
    logo: "tejarat.svg",
    background: "tejaratCard.svg",
  },
  "627353": {
    bankName: "بانک تجارت",
    logo: "tejarat.svg",
    background: "tejaratCard.svg",
  },
  "603799": {
    bankName: "بانک ملی ایران",
    logo: "melli.svg",
    background: "melliCard.svg",
  },
  "589210": {
    bankName: "بانک سپه",
    logo: "sepah.svg",
    background: "sepahCard.svg",
  },
  "610433": {
    bankName: "بانک ملت",
    logo: "mellat.svg",
    background: "mellatCard.svg",
  },
  "991975": {
    bankName: "بانک ملت",
    logo: "mellat.svg",
    background: "mellatCard.svg",
  },
  "502806": {
    bankName: "بانک شهر",
    logo: "shahr.svg",
    background: "shahrCard.svg",
  },
  "504706": {
    bankName: "بانک شهر",
    logo: "shahr.svg",
    background: "shahrCard.svg",
  },
  "603769": {
    bankName: "بانک صادرات",
    logo: "saderat.svg",
    background: "saderatCard.svg",
  },
  "502908": {
    bankName: "بانک توسعه تعاون",
    logo: "toseetaavon.svg",
    background: "toseetaavonCard.svg",
  },
  "502938": {
    bankName: "بانک دی",
    logo: "dey.svg",
    background: "deyCard.svg",
  },
  "589463": {
    bankName: "بانک رفاه کارگران",
    logo: "refah.svg",
    background: "refahCard.svg",
  },
  "627961": {
    bankName: "بانک صنعت و معدن",
    logo: "sanatVaMadan.svg",
    background: "sanatVaMadanCard.svg",
  },
  "603770": {
    bankName: "بانک کشاورزی",
    logo: "keshavarzi.svg",
    background: "keshavarziCard.svg",
  },
  "639217": {
    bankName: "بانک کشاورزی",
    logo: "keshavarzi.svg",
    background: "keshavarziCard.svg",
  },
  "628023": {
    bankName: "بانک مسکن",
    logo: "maskan.svg",
    background: "maskanCard.svg",
  },
  "627412": {
    bankName: "بانک اقتصاد نوین",
    logo: "eghtesadeNovin.svg",
    background: "eghtesadeNovinCard.svg",
  },
  "622106": {
    bankName: "بانک پارسیان",
    logo: "parsian.svg",
    background: "parsianCard.svg",
  },
  "639194": {
    bankName: "بانک پارسیان",
    logo: "parsian.svg",
    background: "parsianCard.svg",
  },
  "627884": {
    bankName: "بانک پارسیان",
    logo: "parsian.svg",
    background: "parsianCard.svg",
  },
  "627488": {
    bankName: "بانک کارآفرین",
    logo: "karafarin.svg",
    background: "karafarinCard.svg",
  },
  "502910": {
    bankName: "بانک کارآفرین",
    logo: "karafarin.svg",
    background: "karafarinCard.svg",
  },
  "627760": {
    bankName: "پست بانک ایران",
    logo: "postbank.svg",
    background: "postbankCard.svg",
  },
  "639347": {
    bankName: "بانک پاسارگاد",
    logo: "pasargad.svg",
    background: "pasargadCard.svg",
  },
  "502229": {
    bankName: "بانک پاسارگاد",
    logo: "pasargad.svg",
    background: "pasargadCard.svg",
  },
  "621986": {
    bankName: "بانک سامان",
    logo: "saman.svg",
    background: "samanCard.svg",
  },
  "639346": {
    bankName: "بانک سینا",
    logo: "sina.svg",
    background: "sinaCard.svg",
  },
  "639607": {
    bankName: "بانک سرمایه",
    logo: "sarmayeh.svg",
    background: "sarmayehCard.svg",
  },
  "636214": {
    bankName: "بانک آینده",
    logo: "ayandeh.svg",
    background: "ayandehCard.svg",
  },
  "627381": {
    bankName: "بانک انصار",
    logo: "ansar.svg",
    background: "ansarCard.svg",
  },
  "504172": {
    bankName: "بانک قرض الحسنه رسالت",
    logo: "resalat.svg",
    background: "resalatCard.svg",
  },
  "": {
    bankName: "",
    logo: "",
    background: "",
  },
};
// assets/bankImages/

export const bankFinder = (bankNumber: string) => {
  let bank: Record<string, string> = {};

  if (banks[bankNumber]) {
    bank = banks[bankNumber];
  } else {
    bank = {
      bankName: "سایر",
      logo: "",
      background: "",
    };
  }

  return bank;
};
export const toClipBoard = (text: string, pop: (val: string) => void) => {
  navigator.clipboard.writeText(text).then(
    () => {
      pop("کپی شد");
    },
    () => {
      pop("خطا!");
    }
  );
};
export const numberToWords = (num: number) => {
  return PN.convert(num);
};
export const isNumeric = (value: string): boolean => {
  return /^\d+$/.test(value);
};
