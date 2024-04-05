import { v4 as uuidv4 } from 'uuid';

import { IPlaylist } from '@/interfaces/IPlaylist';
import { ITrack } from '@/interfaces/ITrack';

import { db } from '.';

export const createPlayList = async (title: string) => {
	const playlistExists = await db.playlists.get({ title });
	const uuid = uuidv4();
	if (!playlistExists) await db.playlists.add({ title, uuid });
};

export const getPlaylist = async (uuid: string) => {
	const playlist = await db.playlists.get({ uuid });

	return playlist;
};

export const addTrackToPlaylist = async (uuid: string, track: ITrack) => {
	const playlist = await getPlaylist(uuid);
	if (!playlist) return;

	const trackAlreadyExists = playlist?.tracks?.find(
		(song) => song.deezerId === track.deezerId
	);

	if (trackAlreadyExists) return;

	if (playlist?.tracks) {
		await updatePlaylist(uuid, { tracks: [...playlist.tracks, track] });
	} else {
		await updatePlaylist(uuid, { tracks: [track] });
	}
};

export const removeTrackFromPlaylist = async (uuid: string, track: ITrack) => {
	const playlist = await getPlaylist(uuid);
	if (!playlist) return;

	const remainingTracks = playlist?.tracks?.filter(
		(song) => song.deezerId !== track.deezerId
	);

	await updatePlaylist(uuid, { tracks: remainingTracks });
};

export const updatePlaylist = async (
	uuid: string,
	playlist: Partial<IPlaylist>
) => {
	await db.playlists.where('uuid').equals(uuid).modify(playlist);
};

export const deletePlaylist = async (id: number) => {
	await db.playlists.where('id').equals(id).delete();
};
