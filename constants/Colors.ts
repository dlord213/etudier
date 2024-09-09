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

interface ColorProps {
  Text: TextPalettes;
  Wewak: Palettes;
  Emerald: Palettes;
}

const Colors: ColorProps = {
  Text: {
    Default: "#303030",
    Secondary: "#5A5A5A",
    Tertiary: "#767676",
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
};

export default Colors;
