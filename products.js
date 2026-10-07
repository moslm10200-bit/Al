const svgImage = (drink) => {
  const { name, flavor, color, shadow, fruit } = drink;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 410">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f4f1eb"/><stop offset="1" stop-color="#e5e1ee"/></linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${color}" stop-opacity=".72"/><stop offset=".55" stop-color="${color}"/><stop offset="1" stop-color="${shadow}"/></linearGradient>
    <linearGradient id="shine" x1="0" x2="1"><stop stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <filter id="blur"><feGaussianBlur stdDeviation="24"/></filter>
  </defs>
  <rect width="520" height="410" fill="url(#bg)"/>
  <ellipse cx="278" cy="348" rx="120" ry="18" fill="${shadow}" opacity=".18"/>
  <circle cx="381" cy="86" r="86" fill="${color}" opacity=".17" filter="url(#blur)"/>
  <path d="M164 121h190l-24 213c-2 16-15 27-31 27h-84c-16 0-29-11-31-27z" fill="#fff" opacity=".58" stroke="#fff" stroke-width="7"/>
  <path d="M172 199h174l-12 126c-2 17-15 29-32 29h-80c-16 0-29-12-31-28z" fill="url(#glass)"/>
  <path d="M187 206h19l-13 108c-1 9-4 12-10 13z" fill="url(#shine)" opacity=".75"/>
  <path d="M159 120q99-18 200 0v16q-101 20-200 0z" fill="#fcfbf8" stroke="#fff" stroke-width="5"/>
  <path d="m256 115 55-82" stroke="#e6ebee" stroke-width="11" stroke-linecap="round"/><path d="m256 115 55-82" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
  <circle cx="354" cy="100" r="29" fill="${color}" stroke="#fff" stroke-width="6"/>
  <path d="M354 72q7 14 0 27m0 0q-13-10-25-8m25 8q9-11 23-10" fill="none" stroke="#e9f1d4" stroke-width="3" stroke-linecap="round"/>
  <circle cx="131" cy="290" r="26" fill="${color}" opacity=".94"/><circle cx="131" cy="290" r="18" fill="none" stroke="#fff" stroke-width="2" opacity=".6"/>
  <circle cx="397" cy="286" r="12" fill="#fff" opacity=".72"/><circle cx="113" cy="161" r="7" fill="#fff" opacity=".7"/>
  <rect x="206" y="244" width="105" height="50" rx="10" fill="#17204c" opacity=".9"/>
  <text x="258" y="264" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif" font-size="13" font-weight="700" direction="rtl">${name}</text>
  <text x="258" y="282" text-anchor="middle" fill="#d2ff72" font-family="Arial,sans-serif" font-size="9" letter-spacing="2">${flavor}</text>
  <text x="258" y="387" text-anchor="middle" fill="#36364e" font-family="Arial,sans-serif" font-size="10" letter-spacing="3">SUKAB  /  ${fruit}</text>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const bannerSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 720"><defs><linearGradient id="a" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#11183f"/><stop offset=".51" stop-color="#30265e"/><stop offset="1" stop-color="#68345f"/></linearGradient><radialGradient id="b"><stop stop-color="#a35277" stop-opacity=".72"/><stop offset="1" stop-color="#482952" stop-opacity="0"/></radialGradient><filter id="g"><feGaussianBlur stdDeviation="50"/></filter></defs><rect width="1600" height="720" fill="url(#a)"/><ellipse cx="1200" cy="310" rx="360" ry="320" fill="url(#b)"/><ellipse cx="1250" cy="400" rx="250" ry="230" fill="#e0ff90" opacity=".13" filter="url(#g)"/><path d="M927 189c96 22 178 2 247-58 57 128 132 174 266 167-53 115-49 209 35 324-142-12-240 24-325 132-57-128-133-174-265-167 53-114 50-211-35-325 28 3 53 10 77 17z" fill="#d4f397" opacity=".13"/><circle cx="1267" cy="348" r="186" fill="none" stroke="#f2e8dc" stroke-opacity=".2" stroke-width="2"/><circle cx="1267" cy="348" r="152" fill="none" stroke="#f2e8dc" stroke-opacity=".18" stroke-width="1"/><path d="M1173 250h189l-23 227c-2 19-17 33-36 33h-71c-19 0-34-14-36-33z" fill="#f3ece4" fill-opacity=".17" stroke="#f7f2eb" stroke-opacity=".62" stroke-width="7"/><path d="M1184 357h167l-10 112c-2 18-16 31-34 31h-69c-17 0-31-13-33-30z" fill="#d9ef91" fill-opacity=".72"/><path d="m1260 245 48-78" stroke="#f7f2eb" stroke-width="11" stroke-linecap="round"/><circle cx="1362" cy="226" r="30" fill="#f4d6a5"/><path d="M1362 195q4 15 0 30m0 0q-15-8-27-4m27 4q11-12 26-9" fill="none" stroke="#597843" stroke-width="3"/><circle cx="1070" cy="520" r="18" fill="#e9b376"/><circle cx="1480" cy="211" r="10" fill="#d4f397"/><circle cx="1100" cy="160" r="5" fill="#fff" opacity=".8"/><circle cx="1470" cy="540" r="6" fill="#fff" opacity=".7"/></svg>`;

export const banner = {
  image: `data:image/svg+xml,${encodeURIComponent(bannerSvg)}`,
  position: "center 48%",
  mobilePosition: "62% center",
};

export const categories = ["الكل", "عصائر طبيعية", "مشروبات شامية", "باردة ومنعشة"];

export const products = [
  { id: "lemon-mint", name: "ليمون ونعنع", description: "ليمون طازج، نعنع أخضر، وبرودة على الأصول.", price: 18000, unit: "٣٣٠ مل", category: "عصائر طبيعية", badge: "الأكثر طلباً", flavor: "LEMON · MINT", color: "#b7ce6b", shadow: "#738747", fruit: "LEMON", image: "" },
  { id: "orange", name: "برتقال على أصوله", description: "عصير برتقال غني، عصر طازة من دون لفّ ودوران.", price: 22000, unit: "٣٣٠ مل", category: "عصائر طبيعية", badge: "عصرة طازة", flavor: "ORANGE · FRESH", color: "#e7a34f", shadow: "#bd652e", fruit: "ORANGE", image: "" },
  { id: "tamarind", name: "تمر هندي", description: "الطعم الشامي الأصيل… حلو وحامض ومظبوط.", price: 16000, unit: "٣٣٠ مل", category: "مشروبات شامية", badge: "من حكايات الشام", flavor: "TAMARIND · CLASSIC", color: "#b47656", shadow: "#61423c", fruit: "TAMARIND", image: "" },
  { id: "jallab", name: "جلّاب", description: "دبس العنب وماء الورد ورشّة صنوبر… متل ما لازم.", price: 20000, unit: "٣٣٠ مل", category: "مشروبات شامية", badge: "وصفة البيت", flavor: "JALLAB · ROSE", color: "#a96b79", shadow: "#56364f", fruit: "GRAPE", image: "" },
  { id: "rose-lemon", name: "ليمون ورد", description: "ليمون ناعم مع لمسة ورد بتفاجئك من أول رشفة.", price: 19000, unit: "٣٣٠ مل", category: "باردة ومنعشة", badge: "", flavor: "ROSE · LEMON", color: "#e99baf", shadow: "#b95c83", fruit: "ROSE", image: "" },
  { id: "carob", name: "خروب", description: "مذاق غني ومخمّر على مهله، ببرودة بتنعش.", price: 17000, unit: "٣٣٠ مل", category: "مشروبات شامية", badge: "", flavor: "CAROB · SLOW", color: "#956d5a", shadow: "#503d3c", fruit: "CAROB", image: "" },
  { id: "berry", name: "توت وليمون", description: "توت شامي مع ليمون حامض… لون وطعم ما بينتسى.", price: 24000, unit: "٣٣٠ مل", category: "عصائر طبيعية", badge: "نكهة الموسم", flavor: "BERRY · LEMON", color: "#bc6689", shadow: "#693c66", fruit: "BERRY", image: "" },
  { id: "watermelon", name: "بطيخ وريحان", description: "بطيخ صيفي خفيف مع ريحان طازج، مزاج صيفي.", price: 21000, unit: "٣٣٠ مل", category: "باردة ومنعشة", badge: "", flavor: "MELON · BASIL", color: "#e98274", shadow: "#ad4f57", fruit: "MELON", image: "" },
];

for (const product of products) product.image = svgImage(product);
