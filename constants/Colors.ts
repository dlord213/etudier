interface Palettes {
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

interface TextPalettes {
  Default: string;
  Secondary: string;
  Tertiary: string;
}

interface BackgroundPalettes {
  Default?: string;
  Brand: string;
  Neutral?: string;
  Black?: string;
  Hover?: string;
}

interface ColorProps {
  Backgrounds_Light: BackgroundPalettes;
  Backgrounds_Dark: BackgroundPalettes;
  Text_Light: TextPalettes;
  Text_Dark: TextPalettes;
  Wewak: Palettes;
  Emerald: Palettes;
  Victoria: Palettes;
  Willow: Palettes;
  Astral: Palettes;
}

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
};

export default Colors;
