import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
        type: 'dark',
        background: {
            default: "#070A1B"
        },
        primary: {
            main: '#141629',
        },
        secondary: {
            main: '#000',
        },
        green: {
            main: 'rgb(19,170,65)',
        },
        alphaColor: {
            main: 'rgba(66,66,66,0.75)'
        }

    }
})
export { theme }