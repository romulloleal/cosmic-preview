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
			<button {...rest} className="bg-blue-500 text-xs rounded-full p-1 w-24">
				Nova Playlist
			</button>
		);
	};
	return (
		<div>
			<span
				className="cursor-pointer flex gap-2 items-center"
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
				style={{ backgroundColor: '#101010' }}
				className="text-base"
			>
				<div className="bg-[#202020] px-4 py-2 text-sm justify-center flex items-center">
					<span className="mr-auto cursor-pointer" onClick={toggleDrawer}>
						Cancelar
					</span>
					<span
						className="bg-green-500 rounded-sm p-1 cursor-pointer text-black font-semibold"
						onClick={makeAction}
					>
						Salvar
					</span>
				</div>

				<div className="flex flex-col w-full items-center mt-4">
					<NewPlaylist element={Button} />

					<div className="w-full flex flex-col">
						{playlists?.map((playlist, index) => (
							<div className="flex justify-between items-center" key={index}>
								{playlist.title}{' '}
								<Checkbox
									color="green"
									crossOrigin={undefined}
									icon={undefined}
									className="rounded-full"
									checked={
										actions.find(
											(a) => a.uuid === playlist.uuid && a.action === 'add'
										)
											? true
											: actions.find(
													(a) =>
														a.uuid === playlist.uuid && a.action === 'remove'
											  )
											? false
											: !!playlist.tracks?.find(
													(t) => t.deezerId === track.deezerId
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
