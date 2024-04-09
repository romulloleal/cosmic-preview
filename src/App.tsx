import { useEffect } from 'react';

import { db } from './lib/db';
import { Routes } from './routes';

export const App = () => {
	useEffect(() => {
		if (!db.isOpen) db.open();
	}, []);

	return (
		<main className="bg-dark h-dvh overflow-y-hidden text-white">
			<Routes />
		</main>
	);
};
