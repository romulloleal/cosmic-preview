import { ButtonHTMLAttributes, useState } from 'react';
import Drawer from 'react-modern-drawer';

import { Checkbox } from '@material-tailwind/react';
import { useQueryClient } from '@tanstack/react-query';
import { useLiveQuery } from 'dexie-react-hooks';

import { Icon } from '@/components/Icon';
import { NewPlaylist } from '@/components/Playlist/NewPlaylist';
import { ITrack } from '@/interfaces/ITrack';
import { db } from '@/lib/db';
import {
	addTrackToPlaylist,
	removeTrackFromPlaylist,
} from '@/lib/db/dbPlaylist';

export const AddToPlaylist = ({ track }: { track: ITrack }) => {
	const playlists = useLiveQuery(async () => await db.playlists.toArray());

	const [actions, setActions] = useState<
		{ uuid: string; action: 'add' | 'remove' }[]
	>([]);

	const [openDrawer, setOpenDrawer] = useState(false);

	const toggleDrawer = () => {
		setOpenDrawer(!openDrawer);
	};

	const editAction = (uuid: string, action: boolean) => {
		const oldActions = actions.filter((a) => a.uuid !== uuid);

		setActions([...oldActions, { uuid, action: action ? 'add' : 'remove' }]);
	};

	const queryClient = useQueryClient();

	const makeAction = async () => {
		actions.forEach(async (action) => {
			if (action.action === 'add') {
				await addTrackToPlaylist(action.uuid, track);
			} else {
				await removeTrackFromPlaylist(action.uuid, track);
			}
			await queryClient.invalidateQueries({ queryKey: ['isInPlaylist'] });
			await queryClient.invalidateQueries({ queryKey: ['getPlaylist'] });
		});

		toggleDrawer();
	};

	const Button = ({ ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) => {
		return (
			<button {...rest} className="w-24 rounded-full bg-blue-500 p-1 text-xs">
				Nova Playlist
			</button>
		);
	};
	return (
		<div>
			<span
				className="flex cursor-pointer items-center gap-2"
				onClick={toggleDrawer}
			>
				<Icon icon="gg:add" fontSize={20} />
				Adicionar a playlist
			</span>

			<Drawer
				open={openDrawer}
				onClose={toggleDrawer}
				direction="bottom"
				size={'95dvh'}
				className="!bg-dark text-base"
			>
				<div className="bg-thamar-black flex items-center justify-center px-4 py-2 text-sm">
					<span className="mr-auto cursor-pointer" onClick={toggleDrawer}>
						Cancelar
					</span>
					<span
						className="text-dark cursor-pointer rounded-sm bg-green-500 p-1 font-semibold"
						onClick={makeAction}
					>
						Salvar
					</span>
				</div>

				<div className="mt-4 flex w-full flex-col items-center">
					<NewPlaylist element={Button} />

					<div className="flex w-full flex-col">
						{playlists?.map((playlist, index) => (
							<div className="flex items-center justify-between" key={index}>
								{playlist.title}{' '}
								<Checkbox
									color="green"
									crossOrigin={undefined}
									icon={undefined}
									className="rounded-full"
									checked={
										actions.find(
											(a) => a.uuid === playlist.uuid && a.action === 'add',
										)
											? true
											: actions.find(
														(a) =>
															a.uuid === playlist.uuid && a.action === 'remove',
												  )
												? false
												: !!playlist.tracks?.find(
														(t) => t.deezerId === track.deezerId,
													)
									}
									onChange={(e) => editAction(playlist.uuid, e.target.checked)}
								/>
							</div>
						))}
					</div>
				</div>
			</Drawer>
		</div>
	);
};
