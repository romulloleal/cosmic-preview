import { NavLink, Outlet } from 'react-router-dom';

import { Icon } from '@/components/Icon';
import { Player } from '@/components/Player';

const navLinks = [
	{
		path: '/',
		activeIcon: 'material-symbols-light:home',
		inactiveIcon: 'material-symbols-light:home-outline',
	},
	{
		path: '/library',
		activeIcon: 'fluent:library-20-filled',
		inactiveIcon: 'fluent:library-20-regular',
	},
	{
		path: '/settings',
		activeIcon: 'material-symbols-light:settings',
		inactiveIcon: 'material-symbols-light:settings-outline',
	},
];

export const Default = () => {
	return (
		<>
			<div className="h-dvh overflow-y-auto pb-[140px]">
				<Outlet />
			</div>
			<Player />
			<div
				className="h-14 w-full fixed bottom-0 flex gap-2 items-center px-3"
				style={{
					background: `linear-gradient(rgba(16,16,16,0.7), #191919 30%)`,
				}}
			>
				{navLinks.map((link, index) => (
					<NavLink
						key={index}
						to={link.path}
						className="h-full flex items-center opacity-80"
					>
						{({ isActive }) => (
							<Icon
								icon={isActive ? link.activeIcon : link.inactiveIcon}
								fontSize={40}
							/>
						)}
					</NavLink>
				))}
			</div>
		</>
	);
};
