export async function translator(fromText,lang1,lang2){
    // const countries = {
    //     "am-ET": "Amharic",
    //     "ar-SA": "Arabic",
    //     "be-BY": "Bielarus",
    //     "bem-ZM": "Bemba",
    //     "bi-VU": "Bislama",
    //     "bjs-BB": "Bajan",
    //     "bn-IN": "Bengali",
    //     "bo-CN": "Tibetan",
    //     "br-FR": "Breton",
    //     "bs-BA": "Bosnian",
    //     "ca-ES": "Catalan",
    //     "cop-EG": "Coptic",
    //     "cs-CZ": "Czech",
    //     "cy-GB": "Welsh",
    //     "da-DK": "Danish",
    //     "dz-BT": "Dzongkha",
    //     "de-DE": "German",
    //     "dv-MV": "Maldivian",
    //     "el-GR": "Greek",
    //     "en-GB": "English",
    //     "es-ES": "Spanish",
    //     "et-EE": "Estonian",
    //     "eu-ES": "Basque",
    //     "fa-IR": "Persian",
    //     "fi-FI": "Finnish",
    //     "fn-FNG": "Fanagalo",
    //     "fo-FO": "Faroese",
    //     "fr-FR": "French",
    //     "gl-ES": "Galician",
    //     "gu-IN": "Gujarati",
    //     "ha-NE": "Hausa",
    //     "he-IL": "Hebrew",
    //     "hi-IN": "Hindi",
    //     "hr-HR": "Croatian",
    //     "hu-HU": "Hungarian",
    //     "id-ID": "Indonesian",
    //     "is-IS": "Icelandic",
    //     "it-IT": "Italian",
    //     "ja-JP": "Japanese",
    //     "kk-KZ": "Kazakh",
    //     "km-KM": "Khmer",
    //     "kn-IN": "Kannada",
    //     "ko-KR": "Korean",
    //     "ku-TR": "Kurdish",
    //     "ky-KG": "Kyrgyz",
    //     "la-VA": "Latin",
    //     "lo-LA": "Lao",
    //     "lv-LV": "Latvian",
    //     "men-SL": "Mende",
    //     "mg-MG": "Malagasy",
    //     "mi-NZ": "Maori",
    //     "ms-MY": "Malay",
    //     "mt-MT": "Maltese",
    //     "my-MM": "Burmese",
    //     "ne-NP": "Nepali",
    //     "niu-NU": "Niuean",
    //     "nl-NL": "Dutch",
    //     "no-NO": "Norwegian",
    //     "ny-MW": "Nyanja",
    //     "ur-PK": "Pakistani",
    //     "pau-PW": "Palauan",
    //     "pa-IN": "Panjabi",
    //     "ps-PK": "Pashto",
    //     "pis-SB": "Pijin",
    //     "pl-PL": "Polish",
    //     "pt-PT": "Portuguese",
    //     "rn-BI": "Kirundi",
    //     "ro-RO": "Romanian",
    //     "ru-RU": "Russian",
    //     "sg-CF": "Sango",
    //     "si-LK": "Sinhala",
    //     "sk-SK": "Slovak",
    //     "sm-WS": "Samoan",
    //     "sn-ZW": "Shona",
    //     "so-SO": "Somali",
    //     "sq-AL": "Albanian",
    //     "sr-RS": "Serbian",
    //     "sv-SE": "Swedish",
    //     "sw-SZ": "Swahili",
    //     "ta-LK": "Tamil",
    //     "te-IN": "Telugu",
    //     "tet-TL": "Tetum",
    //     "tg-TJ": "Tajik",
    //     "th-TH": "Thai",
    //     "ti-TI": "Tigrinya",
    //     "tk-TM": "Turkmen",
    //     "tl-PH": "Tagalog",
    //     "tn-BW": "Tswana",
    //     "to-TO": "Tongan",
    //     "tr-TR": "Turkish",
    //     "uk-UA": "Ukrainian",
    //     "uz-UZ": "Uzbek",
    //     "vi-VN": "Vietnamese",
    //     "wo-SN": "Wolof",
    //     "xh-ZA": "Xhosa",
    //     "yi-YD": "Yiddish",
    //     "zu-ZA": "Zulu"
    // }

// const fromText = document.querySelector(".from-text"),
// toText = document.querySelector(".to-text"),
// exchageIcon = document.querySelector(".exchange"),
// selectTag = document.querySelectorAll("select"),
// icons = document.querySelectorAll(".row i");
// translateBtn = document.querySelector("button"),

// selectTag.forEach((tag, id) => {
//     for (let country_code in countries) {
//         let selected = id == 0 ? country_code == "en-GB" ? "selected" : "" : country_code == "hi-IN" ? "selected" : "";
//         let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
//         tag.insertAdjacentHTML("beforeend", option);
//     }
// });

// exchageIcon.addEventListener("click", () => {
//     let tempText = fromText;
//     tempLang = selectTag[0].value;
//     fromText.value = toText.value;
//     toText.value = tempText;
//     selectTag[0].value = selectTag[1].value;
//     selectTag[1].value = tempLang;
// });

// fromText.addEventListener("keyup", () => {
//     if(!fromText.value) {
//         toText.value = "";
//     }
// });


// const translateBtn=document.getElementById("translateBtn");
// translateBtn.addEventListener("click", () => {
    let text = fromText;
    // console.log(text);
    // let translateFrom = "hi-IN";
    let translateFrom = lang1;
    // let translateTo = "en-GB";
    let translateTo = lang2;
    if(!text) return;
    // toText.setAttribute("placeholder", "Translating...");
    let t1="abc";
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    // await fetch(apiUrl).then(res => res.json()).then(data => {
    //     t1 = data.responseData.translatedText;
    // return t1;
    // });
    const fetchData = async (apiUrl) => {
        try {
          const res = await fetch(apiUrl);
          const data = await res.json();
          const t1 = data.responseData.translatedText;
        return t1;
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    const translatedText = await fetchData(apiUrl);
// console.log(translatedText);
return translatedText;
// async function getTranslation() {
//     const translatedText = await fetchData(apiUrl);
//     // console.log(translatedText);
//     return translatedText;
//   }
  
  getTranslation();
  
      
    
// });

// icons.forEach(icon => {
    // icon.addEventListener("click", ({target}) => {
        // if(!fromText || !text) return;
        // if(target.classList.contains("fa-copy")) {
        //     if(target.id == "from") {
        //         navigator.clipboard.writeText(fromText.value);
        //     } else {
        //         navigator.clipboard.writeText(toText.value);
        //     }
        // } else {
        //     let utterance;
        //     if(target.id == "from") {
        //         utterance = new SpeechSynthesisUtterance(fromText);
        //         utterance.lang = "hi-IN";
        //     } else {
        //         utterance = new SpeechSynthesisUtterance(text);
        //         utterance.lang = "en-GB";
        //     }
        //     speechSynthesis.speak(utterance);
        // }
//     });
// });
}
