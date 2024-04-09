import { IPlaylist } from '@/interfaces/IPlaylist';
import { ITrack } from '@/interfaces/ITrack';
import { usePlayer } from '@/Providers/Player/usePlayer';

import { TrackImage } from './TrackImage';
import { TrackOptions } from './TrackOptions';

export const Track = ({
	track,
	playlist,
	callback,
}: {
	track: ITrack;
	playlist?: IPlaylist;
	callback: () => void;
}) => {
	const { nowPlaying } = usePlayer();

	return (
		<div
			onClick={callback}
			className={`m-auto flex w-full cursor-pointer items-center gap-4 px-2 py-1 transition-all duration-200`}
		>
			<TrackImage
				thumbnail={track.thumbnail}
				size={50}
				className="rounded-sm"
			/>

			<div className="flex flex-col truncate text-sm">
				<span
					className={`truncate font-semibold ${
						nowPlaying?.deezerId === track.deezerId && 'text-orange'
					}`}
				>
					{track.title}
				</span>
				<span>{track.artist.name}</span>
			</div>

			<div className="ml-auto" onClick={(e) => e.stopPropagation()}>
				<TrackOptions track={track} playlist={playlist} />
			</div>
		</div>
	);
};
