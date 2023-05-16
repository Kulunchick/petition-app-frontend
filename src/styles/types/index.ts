import {PaletteColorOptions} from "@mui/material";

declare module '@mui/material/styles' {

    interface CustomPalette {
        green: PaletteColorOptions;
    }

    interface Palette extends CustomPalette {
    }

    interface PaletteOptions extends CustomPalette {
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        green: true;
    }
}

declare module '@mui/material/LinearProgress' {
    interface LinearProgressPropsColorOverrides {
        green: true;
    }
}