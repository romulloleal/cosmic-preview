import { useState } from 'react';

import { Dialog } from '@material-tailwind/react';

import { Icon } from '@/components/Icon';
import { IPlaylist } from '@/interfaces/IPlaylist';
import { ITrack } from '@/interfaces/ITrack';

import { TrackImage } from '../TrackImage';
import { AddToPlaylist } from './AddToPlaylist';
import { AddToQueue } from './AddToQueue';
import { Download } from './Download';
import { RemoveFromPlaylist } from './RemoveFromPlaylist';

export const TrackOptions = ({
	track,
	playlist,
}: {
	track: ITrack;
	playlist?: IPlaylist;
}) => {
	const [openDialog, setOpenDialog] = useState(false);

	const toggleDialog = () => {
		setOpenDialog(!openDialog);
	};

	return (
		<>
			<Icon
				onClick={toggleDialog}
				icon="pepicons-pencil:dots-y"
				fontSize={23}
			/>
			<Dialog
				open={openDialog}
				handler={() => undefined}
				placeholder={undefined}
				className="absolute top-0 h-[calc(100dvh_-_20px)] bg-transparent text-white"
			>
				<div className="flex h-full w-full flex-col items-center font-semibold">
					<div className="flex flex-col items-center gap-0.5 text-center">
						<TrackImage
							thumbnail={track.thumbnail}
							size={200}
							className="rounded-sm"
						/>
						<span className="">{track.title}</span>
						<span className="text-xs text-gray-500">{track.artist.name}</span>
					</div>
					<div className="text- mt-10 flex w-full flex-col gap-8 font-medium">
						<AddToPlaylist track={track} />
						<RemoveFromPlaylist track={track} playlist={playlist} />
						<AddToQueue track={track} callback={toggleDialog} />
						<Download track={track} />
					</div>
					<div
						className="mt-auto flex cursor-pointer justify-center"
						onClick={toggleDialog}
					>
						Fechar
					</div>
				</div>
			</Dialog>
		</>
	);
};
