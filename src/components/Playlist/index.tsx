import { NavLink } from 'react-router-dom';

import { IPlaylist } from '@/interfaces/IPlaylist';

export const Playlist = ({ playlist }: { playlist: IPlaylist }) => {
	return (
		<NavLink
			to={`/playlist/${playlist.uuid}`}
			className={`m-auto flex h-16 w-full cursor-pointer items-center gap-4 px-2 py-10 hover:bg-white/10`}
		>
			{/* <TrackImage thumbnail={track.thumbnail} size={60} /> */}
			<div className="flex flex-col truncate text-sm">
				<span className="truncate font-semibold">{playlist.title}</span>
			</div>
			<div className="ml-auto" onClick={(e) => e.stopPropagation()}>
				{/* <TrackOptions track={track} /> */}
			</div>
		</NavLink>
	);
};
