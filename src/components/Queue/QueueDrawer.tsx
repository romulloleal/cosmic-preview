import { useState } from 'react';
import Drawer from 'react-modern-drawer';

import { Icon } from '../Icon';
import { Queue } from '.';

export const QueueDrawer = () => {
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
				className="!bg-dark flex w-full flex-col items-center p-4"
			>
				<div className="w-full">
					<Icon
						onClick={toggleOpenDrawer}
						icon="mdi:keyboard-arrow-down"
						fontSize={30}
					/>
				</div>

				<Queue />
			</Drawer>
		</div>
	);
};
