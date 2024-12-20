import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ThemeProvider, createTheme } from '@mui/material/styles';

interface CheckboxProps {
    label: string
}

// Create a custom theme
const theme = createTheme({
    typography: {
        fontFamily: 'geist',
        fontSize: 13,
        allVariants: {
            color: 'white'
        }
    },
    components: {
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'white',
                    },
                },
            },
        },
        MuiFormControlLabel: {
            styleOverrides: {
                root: {
                    color: 'white',
                },
            },
        },
    },
});

export default function CheckboxLabels({ label }: CheckboxProps) {
    return (
        <ThemeProvider theme={theme}>
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox />}
                    label={label}
                />
            </FormGroup>
        </ThemeProvider>
    );
}