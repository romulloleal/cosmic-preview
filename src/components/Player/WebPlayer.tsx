import { toHHMMSS } from '@/helpers/toHHMMSS';
import { usePlayer } from '@/Providers/Player/usePlayer';

import { Icon } from '../Icon';
import { TrackImage } from '../Track/TrackImage';

export const WebPlayer = ({ timeline }: { timeline: React.ReactElement }) => {
	const {
		currentTime,
		nowPlaying,
		isPlaying,
		play,
		pause,
		playNext,
		playPrevious,
	} = usePlayer();

	const pauseIcon = (size: number) => {
		return (
			isPlaying && (
				<Icon
					onClick={(e) => {
						e.stopPropagation();
						pause();
					}}
					fontSize={size}
					icon="mdi:pause"
				/>
			)
		);
	};
	const playIcon = (size: number) => {
		return (
			!isPlaying && (
				<Icon
					onClick={(e) => {
						e.stopPropagation();
						play();
					}}
					fontSize={size}
					icon="mdi:play"
				/>
			)
		);
	};

	const previousIcon = (size: number) => {
		return (
			<Icon
				onClick={(e) => {
					e.stopPropagation();
					playPrevious();
				}}
				fontSize={size}
				icon="mdi:skip-previous"
			/>
		);
	};

	const nextIcon = (size: number) => {
		return (
			<Icon
				onClick={(e) => {
					e.stopPropagation();
					playNext();
				}}
				fontSize={size}
				icon="mdi:skip-next"
			/>
		);
	};

	return (
		<div className="hidden md:flex">
			<div className={`bg-dark fixed bottom-0 flex h-20 w-full px-3 pt-3`}>
				<div className="flex h-[50px] w-2/6 items-center gap-4">
					{nowPlaying && (
						<TrackImage
							thumbnail={nowPlaying?.thumbnail}
							size={40}
							className="rounded-sm"
						/>
					)}
					<div className="flex flex-col truncate text-sm">
						<div className="truncate font-semibold">{nowPlaying?.title}</div>
						<span>{nowPlaying?.artist.name}</span>
					</div>
				</div>

				<div className="flex w-2/4 flex-col items-center gap-2">
					{/* controls */}
					<div className="flex gap-8">
						{previousIcon(30)}
						{playIcon(30)}
						{pauseIcon(30)}
						{nextIcon(30)}
					</div>
					{/* timeline */}
					<div className="flex w-full items-center gap-2">
						<span className="text-xs text-gray-500">
							{toHHMMSS(parseInt(currentTime.toString()))}
						</span>
						{timeline}
						<span className="text-xs text-gray-500">
							{nowPlaying?.duration.label}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
