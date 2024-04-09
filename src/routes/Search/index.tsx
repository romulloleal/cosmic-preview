import { useRef, useState } from 'react';

import debounce from 'lodash.debounce';

import { Icon } from '@/components/Icon';
import { Track } from '@/components/Track';
import { TableTrack } from '@/components/Track/TableTrack';
import { ITrack } from '@/interfaces/ITrack';
import { usePlayer } from '@/Providers/Player/usePlayer';
import { useSearchTracks } from '@/services/deezer/useSearchTracks';

export const Search = () => {
	const { playSong, setQueue, setPlaylistUUID } = usePlayer();
	const [query, setQuery] = useState('');

	const {
		data: tracks,
		refetch,
		isFetching: isLoading,
	} = useSearchTracks({ query });

	const debounceSearch = useRef(debounce(refetch, 1000)).current;

	const handdleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setQuery(value);
		if (value) debounceSearch();
	};

	const clearQuery = () => {
		setQuery('');
	};

	const play = async (track: ITrack) => {
		setQueue([track]);
		setPlaylistUUID(undefined);
		playSong(track);
	};

	return (
		<>
			<div className="bg-dark/60 sticky top-0 z-10 flex h-20 w-full items-center backdrop-blur-sm md:bg-inherit">
				<div className="bg-nero ml-auto mr-auto flex h-12 w-full max-w-sm items-center gap-2 rounded-3xl px-3 md:ml-2">
					<Icon icon="prime:search" fontSize={20} cursor={'default'} />
					<input
						className="w-full bg-transparent text-sm"
						placeholder="O que você quer ouvir?"
						onChange={handdleQuery}
						value={query}
					/>
					{query && (
						<Icon
							onClick={clearQuery}
							icon="material-symbols-light:close"
							fontSize={20}
						/>
					)}
				</div>
			</div>

			<div className="">
				{isLoading && (
					<div className="flex justify-center">
						<Icon icon="svg-spinners:3-dots-scale" fontSize={50} />
					</div>
				)}
				{tracks && (
					<>
						<div className="hidden md:flex">
							<TableTrack tracks={tracks} playSong={play} />
						</div>
						<div className="m-auto mt-1 flex w-full flex-col gap-0.5 md:hidden">
							{tracks.map((track, index) => (
								<Track track={track} key={index} callback={() => play(track)} />
							))}
						</div>
					</>
				)}
			</div>
		</>
	);
};
