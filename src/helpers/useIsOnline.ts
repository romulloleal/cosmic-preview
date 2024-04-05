import { useEffect, useState } from 'react';

const getOnLineStatus = () =>
	typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
		? navigator.onLine
		: true;

export const useIsOnline = () => {
	const [isOnline, setIsOnline] = useState(getOnLineStatus());

	const setOnline = () => setIsOnline(true);
	const setOffline = () => setIsOnline(false);

	useEffect(() => {
		window.addEventListener('online', setOnline);
		window.addEventListener('offline', setOffline);

		return () => {
			window.removeEventListener('online', setOnline);
			window.removeEventListener('offline', setOffline);
		};
	}, []);

	return { isOnline };
};
