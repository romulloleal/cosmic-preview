import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Default } from '@/layouts/Default';

import { Home } from './Home';
import { Library } from './Library';
import { PlaylistTracks } from './PlaylistTracks';
import { Settings } from './Settings';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Default />,
		errorElement: <>Oops</>,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/library',
				element: <Library />,
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
