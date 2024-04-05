import { IDownload } from '@/interfaces/IDownload';

import { db } from '.';

export const getDownload = async (deezerId: number) => {
	const track = await db.downloads.get({ deezerId });

	return track;
};

export const addDownload = async (data: IDownload) => {
	const downloadExists = await getDownload(data.deezerId);
	if (!downloadExists) await db.downloads.add(data);
};

export const removeDownload = async (deezerId: number) => {
	await db.downloads.where('deezerId').equals(deezerId).delete();
};
