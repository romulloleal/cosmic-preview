import { INavLink } from '@/interfaces/INavLink';

import { MobileNav } from './MobileNav';
import { WebNav } from './WebNav';

const navLinks: INavLink[] = [
	{
		path: '/',
		label: 'Início',
		activeIcon: 'material-symbols-light:home',
		inactiveIcon: 'material-symbols-light:home-outline',
	},
	{
		path: '/search',
		label: 'Procurar',
		activeIcon: 'majesticons:search',
		inactiveIcon: 'majesticons:search-line',
	},
	{
		path: '/playlist',
		label: 'Playlists',
		activeIcon: 'fluent:library-20-filled',
		inactiveIcon: 'fluent:library-20-regular',
	},
	{
		path: '/settings',
		label: 'Configurações',
		activeIcon: 'material-symbols-light:settings',
		inactiveIcon: 'material-symbols-light:settings-outline',
	},
];

export const Navigation = () => {
	return (
		<>
			<MobileNav navLinks={navLinks} />
			<WebNav navLinks={navLinks} />
		</>
	);
};
