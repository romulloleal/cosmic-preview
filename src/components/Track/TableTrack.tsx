import { IPlaylist } from '@/interfaces/IPlaylist';
import { ITrack } from '@/interfaces/ITrack';
import { usePlayer } from '@/Providers/Player/usePlayer';

import { Icon } from '../Icon';
import { TrackImage } from './TrackImage';
import { TrackOptions } from './TrackOptions';

export const TableTrack = ({
	tracks,
	playlist,
	playSong,
}: {
	tracks: ITrack[];
	playlist?: IPlaylist;
	playSong: (track: ITrack) => void;
}) => {
	const { nowPlaying } = usePlayer();
	return (
		<table className="bg-thamar-black z-10 h-full w-full text-left text-sm">
			<thead className="bg-nero sticky top-0">
				<tr>
					<th className="p-4">
						<div className="leading-none opacity-70">#</div>
					</th>
					<th className="p-4">
						<div className="leading-none opacity-70">Nome</div>
					</th>
					<th className="hidden p-4 lg:flex">
						<div className="leading-none opacity-70">Album</div>
					</th>
					<th className="p-4">
						<div className="leading-none opacity-70">
							<Icon icon="mingcute:time-line" />
						</div>
					</th>
					<th className="p-4"></th>
				</tr>
			</thead>
			<tbody>
				{tracks.map(
					({ album, artist, duration, thumbnail, title, deezerId }, index) => {
						const classes = 'py-4';

						return (
							<tr
								key={index}
								className="cursor-pointer hover:bg-white/10"
								onClick={() => playSong(tracks[index])}
							>
								<td className={classes}>
									<div className="text-center">{index + 1}</div>
								</td>
								<td className={classes}>
									<div className="flex items-center gap-3">
										<TrackImage
											thumbnail={thumbnail}
											size={40}
											className="rounded-sm"
										/>
										<div className="flex flex-col truncate ">
											<div
												className={`truncate font-semibold ${
													nowPlaying?.deezerId === deezerId && 'text-orange'
												}`}
											>
												{title}
											</div>
											<div className="text-gray-500">{artist.name}</div>
										</div>
									</div>
								</td>
								<td className={`${classes} hidden lg:flex`}>
									<div className="truncate text-xs font-semibold text-gray-500 ">
										<span className="truncate">{album}</span>
									</div>
								</td>
								<td className={classes}>
									<div className="text-xs font-semibold text-gray-500">
										{duration.label}
									</div>
								</td>
								<td className={classes} onClick={(e) => e.stopPropagation()}>
									<TrackOptions track={tracks[index]} playlist={playlist} />
								</td>
							</tr>
						);
					},
				)}
			</tbody>
		</table>
	);
};
