import { PlayerProvider } from './Player/PlayerProvider';
import { Theme } from './Theme';

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<Theme>
			<PlayerProvider>{children}</PlayerProvider>
		</Theme>
	);
};
