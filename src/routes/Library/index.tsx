import { ButtonHTMLAttributes } from 'react';

import { useLiveQuery } from 'dexie-react-hooks';

import { Icon } from '@/components/Icon';
import { Playlist } from '@/components/Playlist';
import { NewPlaylist } from '@/components/Playlist/NewPlaylist';
import { db } from '@/lib/db';

export const Library = () => {
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
			<div className="p-2 w-full flex items-center bg-[#191919] text-xl">
				Suas Playlists
				<NewPlaylist element={Button} />
			</div>
			{playlists?.map((playlist, index) => (
				<Playlist key={index} playlist={playlist} />
			))}
		</>
	);
};
