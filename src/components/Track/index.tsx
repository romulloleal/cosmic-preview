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
			className={`flex m-auto w-full items-center gap-2 py-1 px-2 hover:bg-[rgba(255,255,255,0.1)] cursor-pointer`}
		>
			<div className="relative flex justify-center items-center w-[60px]">
				<TrackImage
					thumbnail={track.thumbnail}
					className="w-full object-contain"
				/>
			</div>

			<div className="flex flex-col text-sm truncate w-[calc(100%_-_60px)]">
				<span
					className={`font-semibold truncate ${
						nowPlaying?.deezerId === track.deezerId && 'text-green-500'
					}`}
				>
					{track.title}
				</span>
				<span>{track.artist}</span>
			</div>
			<div className="ml-auto" onClick={(e) => e.stopPropagation()}>
				<TrackOptions track={track} playlist={playlist} />
			</div>
		</div>
	);
};
