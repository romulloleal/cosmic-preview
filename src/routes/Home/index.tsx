import { useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import debounce from 'lodash.debounce';

import { Icon } from '@/components/Icon';
import { Track } from '@/components/Track';
import { ITrack } from '@/interfaces/ITrack';
import { usePlayer } from '@/Providers/Player/usePlayer';
import { api } from '@/services/api';

export const Home = () => {
	const { playSong, setQueue, setPlaylistUUID } = usePlayer();
	const [query, setQuery] = useState('');

	const {
		data: tracks,
		refetch,
		isLoading,
	} = useQuery({
		queryKey: ['tracks'],
		queryFn: async () => {
			const { data } = await api.get<ITrack[]>(`tracks`, {
				params: { query },
			});
			return data;
		},
		enabled: false,
	});

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
			<div className="fixed bg-[rgba(25,25,25,0.8)] w-full h-20 flex items-center backdrop-blur-sm z-10">
				<div className="ml-auto mr-auto flex bg-[#202020] text-slate-50 gap-2 items-center px-3 max-w-sm rounded-3xl h-12 w-full">
					<Icon icon="prime:search" fontSize={20} cursor={'default'} />
					<input
						className="bg-transparent w-full text-sm"
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

			<div className="flex flex-col m-auto mt-24 w-full gap-0.5">
				{isLoading && (
					<div className="flex justify-center">
						<Icon icon="svg-spinners:3-dots-scale" fontSize={50} />
					</div>
				)}
				{tracks?.map((track, index) => (
					<Track track={track} key={index} callback={() => play(track)} />
				))}
			</div>
		</>
	);
};
