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
			<div className="p-2 w-full flex items-center bg-[#191919] text-xl gap-2">
				Configurações
			</div>

			<div className="p-4">
				<button className="mt-2 bg-red-300 p-2 rounded-sm" onClick={deleteData}>
					Excluir dados
				</button>
				<div className="text-sm">
					Exclui todas as playlists e músicas baixadas
				</div>
			</div>
		</>
	);
};
