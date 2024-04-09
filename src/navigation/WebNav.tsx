import { NavLink } from 'react-router-dom';

import { Icon } from '@/components/Icon';
import { Queue } from '@/components/Queue';
import { INavLink } from '@/interfaces/INavLink';
export const WebNav = ({ navLinks }: { navLinks: INavLink[] }) => {
	return (
		<div className="hidden h-full w-[600px] flex-col justify-center gap-2 md:flex">
			<div className="bg-thamar-black flex flex-col gap-2 rounded-md p-4">
				{navLinks.map((link, index) => (
					<NavLink key={index} to={link.path}>
						{({ isActive }) => (
							<span
								className={`${
									!isActive && 'text-gray-500'
								} flex items-center gap-4 transition-all duration-200 hover:!text-white`}
							>
								<Icon
									icon={isActive ? link.activeIcon : link.inactiveIcon}
									fontSize={30}
								/>
								{link.label}
							</span>
						)}
					</NavLink>
				))}
			</div>
			<div className="bg-thamar-black h-full rounded-md p-4">
				<Queue />
			</div>
		</div>
	);
};
