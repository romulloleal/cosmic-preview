import { ThemeProvider } from '@material-tailwind/react';

export const Theme = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider>
			<>{children}</>
		</ThemeProvider>
	);
};
