import { useEffect } from 'react';

import { db } from './lib/db';
import { Routes } from './routes';

export const App = () => {
	useEffect(() => {
		if (!db.isOpen) db.open();
	}, []);

	return (
		<main className="bg-[#101010] text-white h-dvh overflow-y-hidden">
			<Routes />
		</main>
	);
};
