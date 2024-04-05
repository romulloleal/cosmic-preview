import { useState } from 'react';
import Drawer from 'react-modern-drawer';

import { shadeColor } from '@/helpers/shadeColor';
import { toHHMMSS } from '@/helpers/toHHMMSS';
import { usePlayer } from '@/Providers/Player/usePlayer';

import { Icon } from '../Icon';
import { Queue } from '../Queue';
import { TrackImage } from '../Track/TrackImage';
import { TrackOptions } from '../Track/TrackOptions';

export const Player = () => {
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

	return (
		<>
			{/* mobile controls */}
			<div
				onClick={togglePlayerExpanded}
				className={`flex flex-col h-20 fixed bottom-14 w-[98%] ml-[1%] rounded-md px-3 pt-3 justify-center`}
				style={{ backgroundColor: nowPlaying?.bgColor || '#191919' }}
			>
				<div className="flex items-center h-[50px] w-full gap-4">
					{nowPlaying && (
						<TrackImage
							thumbnail={nowPlaying?.thumbnail}
							size={40}
							className="rounded-sm"
						/>
					)}
					<div className="flex flex-col text-sm truncate">
						<div className="font-semibold truncate">{nowPlaying?.title}</div>
						<span>{nowPlaying?.artist}</span>
					</div>
					<div className="ml-auto flex">
						{playIcon(30)}
						{pauseIcon(30)}
					</div>
				</div>
				{/* timeline */}
				<div className="w-full h-0.5 bg-[rgba(0,0,0,0.6)] mt-auto">
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
			{nowPlaying && (
				<Drawer
					open={playerExpanded}
					onClose={togglePlayerExpanded}
					direction="bottom"
					size={'100dvh'}
					duration={200}
					style={{
						background: `linear-gradient(${shadeColor(
							nowPlaying.bgColor,
							80
						)}, ${shadeColor(nowPlaying.bgColor, 0)})`,
					}}
					className="flex flex-col items-center w-full p-4"
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

					<div className="flex flex-col w-full gap-2 mt-4">
						<span className="text-xl font-semibold truncate">
							{nowPlaying.title || ''}
						</span>
						<span className="text-white opacity-70">{nowPlaying.artist}</span>
					</div>

					{/* timeline */}
					<div className="w-full h-1 bg-[rgba(255,255,255,0.3)] rounded-sm mt-6">
						<div
							className={`h-full bg-white opacity-70 rounded-sm`}
							style={{
								width: `${
									nowPlaying
										? (currentTime / nowPlaying?.duration.seconds) * 100
										: 0
								}%`,
							}}
						></div>
					</div>

					<div className="flex justify-between w-full text-xs text-white opacity-70 font-semibold">
						<span>{toHHMMSS(parseInt(currentTime.toString()))}</span>
						<span>{nowPlaying?.duration.label}</span>
					</div>

					{/* controls */}
					<div className="flex gap-10 mt-4">
						{previousIcon(50)}
						{playIcon(50)}
						{pauseIcon(50)}
						{nextIcon(50)}
					</div>

					<div className="w-full flex justify-between mt-auto">
						<Queue />
					</div>
				</Drawer>
			)}
		</>
	);
};
