import { useState } from 'react';
import Drawer from 'react-modern-drawer';

import { shadeColor } from '@/helpers/shadeColor';
import { toHHMMSS } from '@/helpers/toHHMMSS';
import { usePlayer } from '@/Providers/Player/usePlayer';

import { Icon } from '../Icon';
import { QueueDrawer } from '../Queue/QueueDrawer';
import { TrackImage } from '../Track/TrackImage';
import { TrackOptions } from '../Track/TrackOptions';

export const MobilePlayer = ({
	timeline,
}: {
	timeline: React.ReactElement;
}) => {
	const {
		currentTime,
		nowPlaying,
		isPlaying,
		play,
		pause,
		playNext,
		playPrevious,
	} = usePlayer();
	const [playerExpanded, setPlayerExpanded] = useState(false);

	const togglePlayerExpanded = () => {
		nowPlaying && setPlayerExpanded(!playerExpanded);
	};

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

	if (!nowPlaying) {
		return <></>;
	}

	return (
		<div className="md:hidden">
			<div
				onClick={togglePlayerExpanded}
				className={`fixed bottom-14 ml-[1%] flex h-20 w-[98%] flex-col justify-center rounded-md px-3 pt-3`}
				style={{ backgroundColor: nowPlaying?.bgColor || '#191919' }}
			>
				<div className="flex h-[50px] w-full items-center gap-4">
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
					<div className="ml-auto flex">
						{playIcon(30)}
						{pauseIcon(30)}
					</div>
				</div>
				{/* timeline */}
				<div className="mt-auto h-0.5 w-full bg-black/60">
					<div
						className={`h-full bg-white`}
						style={{
							width: `${
								nowPlaying
									? (currentTime / nowPlaying?.duration.seconds) * 100
									: 0
							}%`,
						}}
					></div>
				</div>
			</div>

			{/* expanded mobile controls */}
			<Drawer
				open={playerExpanded}
				onClose={togglePlayerExpanded}
				direction="bottom"
				size={'100dvh'}
				duration={200}
				style={{
					background: `linear-gradient(${shadeColor(
						nowPlaying.bgColor || '#191919',
						80,
					)}, ${shadeColor(nowPlaying.bgColor || '#191919', 0)})`,
				}}
				className="flex w-full flex-col items-center p-4"
			>
				<div className="flex w-full justify-between">
					<Icon
						onClick={togglePlayerExpanded}
						icon="mdi:keyboard-arrow-down"
						fontSize={30}
					/>

					<TrackOptions track={nowPlaying} />
				</div>

				<div className="mt-4">
					<TrackImage
						thumbnail={nowPlaying.thumbnail}
						size={300}
						className="rounded-md"
					/>
				</div>

				<div className="mt-4 flex w-full flex-col gap-2">
					<span className="truncate text-xl font-semibold">
						{nowPlaying.title || ''}
					</span>
					<span className="text-white opacity-70">
						{nowPlaying.artist.name}
					</span>
				</div>

				<div className="mt-6 w-full">{timeline}</div>

				<div className="flex w-full justify-between text-xs font-semibold text-white opacity-70">
					<span>{toHHMMSS(parseInt(currentTime.toString()))}</span>
					<span>{nowPlaying?.duration.label}</span>
				</div>

				{/* controls */}
				<div className="mt-4 flex gap-10">
					{previousIcon(50)}
					{playIcon(50)}
					{pauseIcon(50)}
					{nextIcon(50)}
				</div>

				<div className="mt-auto flex w-full justify-between">
					<QueueDrawer />
				</div>
			</Drawer>
		</div>
	);
};
