import { Icon } from '@/components/Icon';
import { ITrack } from '@/interfaces/ITrack';
import { usePlayer } from '@/Providers/Player/usePlayer';

export const AddToQueue = ({
	track,
	callback,
}: {
	track: ITrack;
	callback: () => void;
}) => {
	const { queue, setQueue, playSong } = usePlayer();

	const isInQueue = queue.find((q) => q.deezerId === track.deezerId);

	const addToQueue = () => {
		if (!isInQueue) {
			setQueue([...queue, track]);
			callback();
			if (!queue.length) {
				playSong(track);
			}
		}
	};

	const removeFromQueue = () => {
		setQueue([...queue.filter((q) => q.deezerId !== track.deezerId)]);
		callback();
	};

	if (isInQueue) {
		return (
			<span
				className="cursor-pointer flex gap-2 items-center"
				onClick={removeFromQueue}
			>
				<Icon icon="gg:remove" fontSize={20} />
				Remover da fila
			</span>
		);
	}

	return (
		<span
			className="cursor-pointer flex gap-2 items-center"
			onClick={addToQueue}
		>
			<Icon icon="gg:add" fontSize={20} />
			Adicionar a fila
		</span>
	);
};
