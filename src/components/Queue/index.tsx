import { usePlayer } from '@/Providers/Player/usePlayer';

import { Track } from '../Track';

export const Queue = () => {
	const { queue, playSong } = usePlayer();

	return (
		<div className="w-full overflow-y-auto">
			<div>Na Fila</div>
			<div className="w-full">
				{queue.map((track, index) => (
					<Track track={track} key={index} callback={() => playSong(track)} />
				))}
			</div>
		</div>
	);
};
