import { Outlet } from 'react-router-dom';

import { Player } from '@/components/Player';
import { Navigation } from '@/navigation';
import { usePlayer } from '@/Providers/Player/usePlayer';

export const DefaultLayout = () => {
	const { nowPlaying } = usePlayer();
	return (
		<>
			<div className="flex h-dvh flex-col md:h-[calc(100dvh_-_80px)] md:flex-row md:gap-2 md:p-2">
				<Navigation />
				<div
					className={`relative w-full overflow-y-auto ${
						nowPlaying ? 'pb-[140px]' : 'pb-16'
					} md:bg-thamar-black md:rounded-md md:pb-0`}
				>
					<Outlet />
				</div>
			</div>
			<Player />
		</>
	);
};
