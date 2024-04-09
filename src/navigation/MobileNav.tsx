import { NavLink } from 'react-router-dom';

import { Icon } from '@/components/Icon';
import { INavLink } from '@/interfaces/INavLink';
export const MobileNav = ({ navLinks }: { navLinks: INavLink[] }) => {
	return (
		<div className="from-dark/60 to-dark fixed bottom-0 z-10 flex h-14 w-full items-center gap-2 bg-gradient-to-b to-30% px-3 md:hidden">
			{navLinks.map((link, index) => (
				<NavLink
					key={index}
					to={link.path}
					className="flex h-full items-center opacity-80"
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
	);
};
