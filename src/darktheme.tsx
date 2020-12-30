import {
    grey,
    lightBlue,
    red,

  } from "@material-ui/core/colors";

import {createMuiTheme} from "@material-ui/core/styles";
export default function DarkTheme(darkState: any){
    const palletType = darkState ? "dark" : "light";
    const mainPrimaryColor = darkState ? grey[50] : lightBlue[500];
    const mainSecondaryColor = darkState ? red[500] : red[500];
    return createMuiTheme({
        palette: {
            type: palletType,
            primary: {
                main: mainPrimaryColor
            },
            secondary: {
                main: mainSecondaryColor
            }
            
        }
    });
}