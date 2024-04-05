import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Buffer } from 'buffer';

import { Icon } from '@/components/Icon';
import { useIsOnline } from '@/helpers/useIsOnline';
import { ITrack } from '@/interfaces/ITrack';
import { addDownload, getDownload, removeDownload } from '@/lib/db/dbDownloads';

export const Download = ({ track }: { track: ITrack }) => {
	const { isOnline } = useIsOnline();
	const { data: isDownloaded, refetch: refetchIsDownloaded } = useQuery({
		queryKey: ['trackOption', track],
		queryFn: async () => {
			const result = await getDownload(track.deezerId);
			return result?.base64 || null;
		},
	});

	const { mutate: download, isPending: downloading } = useMutation({
		mutationFn: async () => {
			if (downloading) return;

			const { data } = await axios.get(track.preview, {
				responseType: 'arraybuffer',
			});
			const buffer = Buffer.from(data, 'binary').toString('base64');

			const base64 = `audio/mp3;base64,${buffer}`;

			await addDownload({ deezerId: track.deezerId, base64 });

			refetchIsDownloaded();
		},
	});

	const { mutate: remove, isPending: removing } = useMutation({
		mutationFn: async () => {
			if (removing) return;
			await removeDownload(track.deezerId);

			refetchIsDownloaded();
		},
	});
	return (
		<>
			{!isDownloaded && (
				<span
					className="cursor-pointer flex gap-2 items-center"
					onClick={() => download()}
				>
					<Icon icon="gg:arrow-down-o" fontSize={20} />
					Download
					{downloading && <Icon icon="line-md:loading-loop" fontSize={20} />}
				</span>
			)}
			{!!isDownloaded && isOnline && (
				<span
					className="cursor-pointer flex gap-2 items-center"
					onClick={() => remove()}
				>
					<Icon icon="gg:close-o" fontSize={20} />
					Remover download
					{removing && <Icon icon="line-md:loading-loop" fontSize={20} />}
				</span>
			)}
		</>
	);
};
