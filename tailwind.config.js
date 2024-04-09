/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT';
export default withMT({
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				orange: '#FF5757',
				dark: '#121212',
				'thamar-black': '#191919',
				nero: '#252525',
			},
		},
	},
	plugins: [],
});
