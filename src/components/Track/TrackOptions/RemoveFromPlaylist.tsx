import { useQuery, useQueryClient } from '@tanstack/react-query';

import { Icon } from '@/components/Icon';
import { IPlaylist } from '@/interfaces/IPlaylist';
import { ITrack } from '@/interfaces/ITrack';
import { getPlaylist, removeTrackFromPlaylist } from '@/lib/db/dbPlaylist';

export const RemoveFromPlaylist = ({
	track,
	playlist,
}: {
	track: ITrack;
	playlist?: IPlaylist;
}) => {
	const queryClient = useQueryClient();

	const { data: isInPlaylist } = useQuery({
		queryKey: ['isInPlaylist', playlist?.uuid],
		queryFn: async () => {
			if (!playlist?.uuid) return false;
			const list = await getPlaylist(playlist.uuid);
			const result = list?.tracks?.find((pl) => pl.deezerId === track.deezerId);

			return result ? true : false;
		},
	});

	const removeFromPlaylist = async () => {
		if (!playlist?.id) return false;
		await removeTrackFromPlaylist(playlist.uuid, track);

		await queryClient.invalidateQueries({
			queryKey: ['isInPlaylist'],
		});
		await queryClient.invalidateQueries({
			queryKey: ['getPlaylist'],
		});
	};

	return (
		isInPlaylist && (
			<span
				className="cursor-pointer flex gap-2 items-center"
				onClick={removeFromPlaylist}
			>
				<Icon icon="gg:remove" fontSize={20} />
				Remover dessa playlist
			</span>
		)
	);
};
