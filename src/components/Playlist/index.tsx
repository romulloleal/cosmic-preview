import { NavLink } from 'react-router-dom';

import { IPlaylist } from '@/interfaces/IPlaylist';

export const Playlist = ({ playlist }: { playlist: IPlaylist }) => {
	return (
		<NavLink
			to={`/playlist/${playlist.uuid}`}
			className={`flex m-auto w-full h-16 items-center gap-4 py-10 px-2 hover:bg-[rgba(255,255,255,0.1)] cursor-pointer`}
		>
			{/* <TrackImage thumbnail={track.thumbnail} size={60} /> */}
			<div className="flex flex-col text-sm truncate">
				<span className="font-semibold truncate">{playlist.title}</span>
			</div>
			<div className="ml-auto" onClick={(e) => e.stopPropagation()}>
				{/* <TrackOptions track={track} /> */}
			</div>
		</NavLink>
	);
};
