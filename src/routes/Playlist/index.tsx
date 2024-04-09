import { ButtonHTMLAttributes } from 'react';

import { useLiveQuery } from 'dexie-react-hooks';

import { Icon } from '@/components/Icon';
import { Playlist as PlaylistComponent } from '@/components/Playlist';
import { NewPlaylist } from '@/components/Playlist/NewPlaylist';
import { db } from '@/lib/db';

export const Playlist = () => {
	const playlists = useLiveQuery(async () => await db.playlists.toArray());

	const Button = ({ ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) => {
		return (
			<button {...rest} className="ml-auto">
				<Icon icon="mdi:plus" fontSize={30} />
			</button>
		);
	};
	return (
		<>
			<div className="bg-thamar-black flex w-full items-center p-2 text-xl">
				Suas Playlists
				<NewPlaylist element={Button} />
			</div>
			{playlists?.map((playlist, index) => (
				<PlaylistComponent key={index} playlist={playlist} />
			))}
		</>
	);
};
