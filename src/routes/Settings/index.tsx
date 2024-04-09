import { useNavigate } from 'react-router-dom';

import { db } from '@/lib/db';

export const Settings = () => {
	const navigate = useNavigate();

	const deleteData = async () => {
		await db.downloads.clear();
		await db.playlists.clear();
		navigate('/', { replace: true });
	};
	return (
		<>
			<div className="bg-thamar-black flex w-full items-center gap-2 p-2 text-xl">
				Configurações
			</div>

			<div className="p-4">
				<button className="bg-orange mt-2 rounded-sm p-2" onClick={deleteData}>
					Excluir dados
				</button>
				<div className="mt-2 text-xs">
					*Exclui todas as playlists e músicas salvas
				</div>
			</div>
		</>
	);
};
