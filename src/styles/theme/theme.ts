import {createTheme} from "@mui/material/styles";

const {palette} = createTheme();
const {augmentColor} = palette;
const createColor = (mainColor: string) => augmentColor({color: {main: mainColor}});


const theme = createTheme({
    palette: {
        green: createColor("#22c55e"),
    }
})

export default theme;