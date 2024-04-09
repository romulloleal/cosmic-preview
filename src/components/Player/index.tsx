import { usePlayer } from '@/Providers/Player/usePlayer';

import { MobilePlayer } from './MobilePlayer';
import { WebPlayer } from './WebPlayer';

export const Player = () => {
	const { nowPlaying, currentTime, seekTo } = usePlayer();
	const seekTime = (
		event:
			| React.MouseEvent<HTMLInputElement, MouseEvent>
			| React.TouchEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLInputElement>,
	) => {
		const time = event.currentTarget.value;
		seekTo(parseFloat(time));
	};

	const trackWidth = nowPlaying
		? (currentTime / nowPlaying.duration.seconds) * 100
		: 0;

	const timeline = (
		<input
			type="range"
			onChange={seekTime}
			max={nowPlaying ? nowPlaying.duration.seconds : 0}
			value={currentTime}
			step={0.1}
			style={{ '--track-width': `${trackWidth}%` } as React.CSSProperties}
			className={`
					hover:[&::-webkit-slider-runnable-track]:from-orange hover:[&::-webkit-slider-runnable-track]:to-orange group h-1 w-full cursor-pointer appearance-none
					rounded-full
					bg-white/30
					[&::-webkit-slider-runnable-track]:h-1
					[&::-webkit-slider-runnable-track]:rounded-full
					[&::-webkit-slider-runnable-track]:bg-gradient-to-r
					[&::-webkit-slider-runnable-track]:from-white
					[&::-webkit-slider-runnable-track]:to-white
					[&::-webkit-slider-runnable-track]:bg-[length:var(--track-width)_100%]
					[&::-webkit-slider-runnable-track]:bg-no-repeat
					[&::-webkit-slider-thumb]:-mt-[2px]
					[&::-webkit-slider-thumb]:size-2
					[&::-webkit-slider-thumb]:appearance-none
					[&::-webkit-slider-thumb]:rounded-full
					[&::-webkit-slider-thumb]:bg-white
				`}
		/>
	);

	return (
		<>
			<MobilePlayer timeline={timeline} />
			<WebPlayer timeline={timeline} />
		</>
	);
};
