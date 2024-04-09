import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { DefaultLayout } from '@/layouts/Default';

import { Home } from './Home';
import { Playlist } from './Playlist';
import { PlaylistTracks } from './PlaylistTracks';
import { Search } from './Search';
import { Settings } from './Settings';

const router = createBrowserRouter([
	{
		path: '/',
		element: <DefaultLayout />,
		errorElement: <>Oops</>,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/search',
				element: <Search />,
			},
			{
				path: '/playlist',
				element: <Playlist />,
			},
			{
				path: '/playlist/:playlistUUID',
				element: <PlaylistTracks />,
			},
			{
				path: '/settings',
				element: <Settings />,
			},
		],
	},
	{
		path: '/login',
	},
]);

export const Routes = () => {
	return <RouterProvider router={router} />;
};
