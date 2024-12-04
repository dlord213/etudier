export interface Palettes {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface TextPalettes {
  Default: string;
  Secondary: string;
  Tertiary: string;
}

export interface BackgroundPalettes {
  Default?: string;
  Brand: string;
  Neutral?: string;
  Black?: string;
  Hover?: string;
}

export interface ColorProps {
  Backgrounds_Light: BackgroundPalettes;
  Backgrounds_Dark: BackgroundPalettes;
  Text_Light: TextPalettes;
  Text_Dark: TextPalettes;
  Wewak: Palettes;
  Emerald: Palettes;
  Victoria: Palettes;
  Willow: Palettes;
  Astral: Palettes;
  Walkaway_Gray: Palettes;
  Minsk: Palettes;
  Jungle_Green: Palettes;
  Laurel: Palettes;
  Inch_Worm: Palettes;
  Marigold: Palettes;
  Milano_Red: Palettes;
  Jacksons_Purple: Palettes;
}

/* color template
_: {
    50: "",
    100: "",
    200: "",
    300: "",
    400: "",
    500: "",
    600: "",
    700: "",
    800: "",
    900: "",
    950: "",
  },
*/

const Colors: ColorProps = {
  Backgrounds_Light: {
    Default: "#FFFFFF",
    Brand: "#E6E6E6",
    Neutral: "#E3E3E3",
  },
  Backgrounds_Dark: {
    Brand: "#2C2C2C",
    Black: "#000000",
    Hover: "#434343",
  },
  Text_Light: {
    Default: "#303030",
    Secondary: "#5A5A5A",
    Tertiary: "#767676",
  },
  Text_Dark: {
    Default: "#F2F2F2",
    Secondary: "#757575",
    Tertiary: "#B3B3B3",
  },
  Wewak: {
    50: "#fdf3f4",
    100: "#fbe8eb",
    200: "#f6d5da",
    300: "#ea9daa",
    400: "#e58799",
    500: "#d75c77",
    600: "#c13d60",
    700: "#a22e4f",
    800: "#882947",
    900: "#752642",
    950: "#411020",
  },
  Emerald: {
    50: "#edfcf4",
    100: "#d4f7e2",
    200: "#adedcb",
    300: "#78ddac",
    400: "#41c68a",
    500: "#22c380",
    600: "#118a5a",
    700: "#0e6e4b",
    800: "#0d583d",
    900: "#0c4833",
    950: "#05291d",
  },
  Victoria: {
    50: "#f1f3fc",
    100: "#e5eafa",
    200: "#cfd7f6",
    300: "#b2bcef",
    400: "#939ae6",
    500: "#797adb",
    600: "#655ecd",
    700: "#574eb4",
    800: "#4a4497",
    900: "#3e3b74",
    950: "#242244",
  },
  Willow: {
    50: "#f8f8ed",
    100: "#eff0d7",
    200: "#dee2b4",
    300: "#c9cf87",
    400: "#b5be6a",
    500: "#949f43",
    600: "#747e32",
    700: "#58612a",
    800: "#484e26",
    900: "#3d4324",
    950: "#20240f",
  },
  Astral: {
    50: "#edfcfe",
    100: "#d1f5fc",
    200: "#a9ebf8",
    300: "#6ddbf3",
    400: "#2bc2e5",
    500: "#0fa5cb",
    600: "#0f82a9",
    700: "#136a8b",
    800: "#195771",
    900: "#194960",
    950: "#0b2f41",
  },
  Walkaway_Gray: {
    50: "#f2f7fb",
    100: "#e7f0f8",
    200: "#d3e2f2",
    300: "#b9cfe8",
    400: "#9cb6dd",
    500: "#839dd1",
    600: "#6a7fc1",
    700: "#6374ae",
    800: "#4a5989",
    900: "#414e6e",
    950: "#262c40",
  },
  Minsk: {
    50: "#f8f6fe",
    100: "#efebfc",
    200: "#e2dafa",
    300: "#ccbef4",
    400: "#ad94ec",
    500: "#8d6ae2",
    600: "#754bd2",
    700: "#6038b8",
    800: "#543396",
    900: "#4c2e85",
    950: "#2b1358",
  },
  Jungle_Green: {
    50: "#e9fff8",
    100: "#c9ffed",
    200: "#98ffe0",
    300: "#42ffd0",
    400: "#14f3c3",
    500: "#00dbac",
    600: "#00b38e",
    700: "#008f76",
    800: "#00715f",
    900: "#005c50",
    950: "#00342e",
  },
  Laurel: {
    50: "#ecffe6",
    100: "#d5fdca",
    200: "#affb9b",
    300: "#7cf561",
    400: "#51ea31",
    500: "#2fd012",
    600: "#1fa709",
    700: "#197f0c",
    800: "#1b6a11",
    900: "#185512",
    950: "#072f04",
  },
  Inch_Worm: {
    50: "#fafee7",
    100: "#f2fbcc",
    200: "#e5f89e",
    300: "#cff066",
    400: "#b8e338",
    500: "#a7da1b",
    600: "#78a10f",
    700: "#5b7a11",
    800: "#496113",
    900: "#3e5215",
    950: "#1f2d06",
  },
  Marigold: {
    50: "#fdfce9",
    100: "#fbfac6",
    200: "#f8f290",
    300: "#f4e350",
    400: "#efd020",
    500: "#dfb813",
    600: "#b5880d",
    700: "#99690f",
    800: "#7f5314",
    900: "#6c4417",
    950: "#3f2309",
  },
  Milano_Red: {
    50: "#fff5ed",
    100: "#ffe9d4",
    200: "#ffcfa8",
    300: "#ffad71",
    400: "#ff8037",
    500: "#fe5c11",
    600: "#ef4107",
    700: "#b62a07",
    800: "#9d250f",
    900: "#7f220f",
    950: "#440d06",
  },
  Jacksons_Purple: {
    50: "#ecf1ff",
    100: "#dce4ff",
    200: "#c1ccff",
    300: "#9babff",
    400: "#737eff",
    500: "#5252ff",
    600: "#4333f8",
    700: "#3827db",
    800: "#2e22b1",
    900: "#292386",
    950: "#1a1551",
  },
};

export const NON_PREMIUM_COLORS = [
  "Astral",
  "Emerald",
  "Victoria",
  "Wewak",
  "Willow",
];
export const PREMIUM_COLORS = [
  "Walkaway_Gray",
  "Minsk",
  "Jungle_Green",
  "Laurel",
  "Inch_Worm",
  "Marigold",
  "Milano_Red",
  "Jacksons_Purple",
];

export default Colors;
