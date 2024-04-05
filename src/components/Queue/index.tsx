import { useState } from 'react';
import Drawer from 'react-modern-drawer';

import { usePlayer } from '@/Providers/Player/usePlayer';

import { Icon } from '../Icon';
import { Track } from '../Track';

export const Queue = () => {
	const { queue, playSong } = usePlayer();

	const [openDrawer, setOpenDrawer] = useState(false);

	const toggleOpenDrawer = () => {
		setOpenDrawer(!openDrawer);
	};

	return (
		<div>
			<Icon icon="mdi:queue-music" fontSize={50} onClick={toggleOpenDrawer} />

			<Drawer
				open={openDrawer}
				onClose={toggleOpenDrawer}
				direction="bottom"
				size={'100dvh'}
				duration={200}
				style={{ backgroundColor: '#101010' }}
				className="flex flex-col items-center w-full p-4"
			>
				<div className="w-full">
					<Icon
						onClick={toggleOpenDrawer}
						icon="mdi:keyboard-arrow-down"
						fontSize={30}
					/>
				</div>

				<div className="w-full overflow-y-auto">
					<div>Na Fila</div>
					<div className="w-full">
						{queue.map((track, index) => (
							<Track
								track={track}
								key={index}
								callback={() => playSong(track)}
							/>
						))}
					</div>
				</div>
			</Drawer>
		</div>
	);
};
