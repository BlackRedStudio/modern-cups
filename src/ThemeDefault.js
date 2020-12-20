import { unstable_createMuiStrictModeTheme as createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let themeDefault = createMuiTheme({
	overrides: {
		MuiCssBaseline: {
			'@global': {
				body: {
					margin: 0,
					fontFamily:
						'-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
					WebkitFontSmoothing: 'antialiased',
					MozOsxFontSmoothing: 'grayscale',
				},
				img: {
					maxWidth: '100%',
					verticalAlign: 'middle',
				},
				code: {
					fontFamily:
						'source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace',
				},
			},
		},
	},
});

themeDefault = responsiveFontSizes(themeDefault);

export { themeDefault };
