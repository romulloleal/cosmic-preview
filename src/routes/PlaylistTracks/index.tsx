import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { Icon } from '@/components/Icon';
import { Track } from '@/components/Track';
import { ITrack } from '@/interfaces/ITrack';
import { getPlaylist } from '@/lib/db/dbPlaylist';
import { usePlayer } from '@/Providers/Player/usePlayer';

export const PlaylistTracks = () => {
	const navigate = useNavigate();

	const { playSong, setQueue, setPlaylistUUID } = usePlayer();

	const { playlistUUID } = useParams();

	const { data: playlist } = useQuery({
		queryKey: ['getPlaylist', playlistUUID],
		queryFn: async () => {
			const result = await getPlaylist(playlistUUID as string);

			return result || null;
		},
	});

	const play = async (track: ITrack) => {
		setQueue(playlist?.tracks || []);
		setPlaylistUUID(playlist?.uuid);
		playSong(track);
	};

	return (
		<>
			<div className="p-2 w-full flex items-center bg-[#191919] text-xl gap-2">
				<Icon
					onClick={() => navigate('/library')}
					icon="mdi:keyboard-arrow-left"
					fontSize={30}
				/>

				{playlist?.title}
			</div>
			<div>
				{playlist?.tracks?.map((track, index) => (
					<Track
						key={index}
						track={track}
						playlist={playlist}
						callback={() => play(track)}
					/>
				))}
			</div>
		</>
	);
};
