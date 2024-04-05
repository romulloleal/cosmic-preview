export const formatBytes = (bytes: number) => {
	if (!+bytes) return '0 Bytes';

	const k = 1024;
	// eslint-disable-next-line no-constant-condition
	const dm = 2 < 0 ? 0 : 2;
	const sizes = ['bytes', 'kB', 'MB', 'GB', 'TB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};
