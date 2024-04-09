import Dexie, { Table } from 'dexie';

import { IDownload } from '@/interfaces/IDownload';
import { IPlaylist } from '@/interfaces/IPlaylist';

export class MySubClassedDexie extends Dexie {
	playlists!: Table<IPlaylist>;
	downloads!: Table<IDownload>;

	constructor() {
		super('cosmic');
		this.version(0.3).stores({
			playlists: '++id, title, uuid, *tracks',
			downloads: '++id, deezerId, base64 ',
		});
	}
}

export const db = new MySubClassedDexie();
