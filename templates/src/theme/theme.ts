import { blue, pink } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    background: {
      default: "#ebd3c7",
    },
    primary: {
      main: "#61988e",
    },
    secondary: {
      main: "#493843",
    },
  },
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#61988e",
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          backgroundColor: "#cbbfbb",
        },
      },
    },
  },
  typography: {
    body1: {
      fontSize: "16px",
    },
  },
});

// interface PaletteOptions {
//   primary?: PaletteColorOptions;
//   secondary?: PaletteColorOptions;
//   error?: PaletteColorOptions;
//   warning?: PaletteColorOptions;
//   info?: PaletteColorOptions;
//   success?: PaletteColorOptions;
//   mode?: PaletteMode;
//   tonalOffset?: PaletteTonalOffset;
//   contrastThreshold?: number;
//   common?: Partial<CommonColors>;
//   grey?: ColorPartial;
//   text?: Partial<TypeText>;
//   divider?: string;
//   action?: Partial<TypeAction>;
//   background?: Partial<TypeBackground>;
//   getContrastText?: (background: string) => string;
// }
