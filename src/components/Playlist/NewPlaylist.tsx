import { useEffect, useState } from 'react';
import Drawer from 'react-modern-drawer';

import { useLiveQuery } from 'dexie-react-hooks';

import { db } from '@/lib/db';
import { createPlayList } from '@/lib/db/dbPlaylist';

export const NewPlaylist = ({
	element: Element,
}: {
	element: React.ElementType<React.HtmlHTMLAttributes<HTMLElement>>;
}) => {
	const playlists = useLiveQuery(async () => await db.playlists.toArray());
	const [openDrawer, setOpenDrawer] = useState(false);
	const [name, setName] = useState('');

	useEffect(() => {
		setName(`Playlist #${(playlists?.length || 0) + 1}`);
	}, [playlists?.length]);

	const toggleDrawer = () => {
		setOpenDrawer(!openDrawer);
	};

	const create = () => {
		createPlayList(name);
		toggleDrawer();
	};
	return (
		<>
			<Element onClick={toggleDrawer} />
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
						onClick={create}
					>
						Salvar
					</span>
				</div>
				<div className="flex w-full flex-col items-center gap-10">
					<span className="mt-20">Dê um nome a sua playlist</span>
					<div className="flex w-10/12 items-center justify-center border-b border-white/30">
						<input
							className="bg-transparent text-center text-4xl"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
				</div>
			</Drawer>
		</>
	);
};
