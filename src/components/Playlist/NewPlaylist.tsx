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
				style={{ backgroundColor: '#101010' }}
				className="text-base"
			>
				<div className="bg-[#202020] px-4 py-2 text-sm justify-center flex items-center">
					<span className="mr-auto cursor-pointer" onClick={toggleDrawer}>
						Cancelar
					</span>
					<span
						className="bg-green-500 rounded-sm p-1 cursor-pointer text-black font-semibold"
						onClick={create}
					>
						Salvar
					</span>
				</div>
				<div className="w-full flex flex-col items-center gap-10">
					<span className="mt-20">Dê um nome a sua playlist</span>
					<div className="w-10/12 flex items-center justify-center border-b border-[rgba(255,255,255,0.3)]">
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
