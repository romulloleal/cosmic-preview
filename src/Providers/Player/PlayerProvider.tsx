import { createContext, useEffect, useRef, useState } from 'react';

import { useIsOnline } from '@/helpers/useIsOnline';
import { ITrack } from '@/interfaces/ITrack';
import { getDownload } from '@/lib/db/dbDownloads';

interface PlayerContextType {
	isPlaying: boolean;
	play: () => void;
	pause: () => void;
	nowPlaying: ITrack | undefined;
	playSong: (track: ITrack) => void;
	currentTime: number;
	queue: ITrack[];
	setQueue: (tracks: ITrack[]) => void;
	playlistUUID: string | undefined;
	setPlaylistUUID: (uuid: string | undefined) => void;
	seekTo: (time: number) => void;
	playNext: (track?: ITrack) => void;
	playPrevious: (track?: ITrack) => void;
}

export const PlayerContext = createContext<PlayerContextType>(null!);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
	const { isOnline } = useIsOnline();

	const [queue, setQueue] = useState<ITrack[]>([]);
	const [playlistUUID, setPlaylistUUID] = useState<string | undefined>(
		undefined,
	);
	const [nowPlaying, setNowPlaying] = useState<ITrack & { song: string }>();
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [currentTime, setCurrentTime] = useState(0);
	const audioRef = useRef<HTMLAudioElement>(null);
	const audio = audioRef.current;

	useEffect(() => {
		audio?.addEventListener('playing', () => {
			navigator.mediaSession.setActionHandler('play', () => {
				play();
			});
			navigator.mediaSession.setActionHandler('pause', () => {
				pause();
			});
			navigator.mediaSession.setActionHandler('previoustrack', () => {
				playPrevious();
			});
			navigator.mediaSession.setActionHandler('nexttrack', () => {
				playNext();
			});

			navigator.mediaSession.setActionHandler('stop', () => {
				stop();
			});

			audio &&
				navigator.mediaSession.setActionHandler('seekto', (details) => {
					audio.currentTime = details.seekTime!;
				});
		});

		audio?.addEventListener('play', () => {
			setIsPlaying(true);
		});
		audio?.addEventListener('pause', () => {
			setIsPlaying(false);
		});
		audio?.addEventListener('timeupdate', () => {
			setCurrentTime(audio.currentTime);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [audio, nowPlaying]);

	const playSong = async (track: ITrack) => {
		if (track.deezerId !== nowPlaying?.deezerId) {
			const hasDownload = await getDownload(track.deezerId);
			const song = hasDownload?.base64 || track.preview;

			if (!isOnline && !hasDownload) {
				return playNext(track);
			}

			if ('mediaSession' in navigator) {
				navigator.mediaSession.metadata = new MediaMetadata({
					title: track.title,
					artist: track.artist.name,
					album: track.album,
					artwork: [{ src: track.thumbnail }],
				});
			}

			setNowPlaying({ ...track, song });

			play();
		}
	};

	const play = async () => {
		if (!nowPlaying) return;
		audio?.play();
	};

	const pause = async () => {
		if (!nowPlaying) return;
		audio?.pause();
	};

	const stop = async () => {
		pause();
		if (audio) audio.currentTime = 0;
	};

	const seekTo = (time: number) => {
		setCurrentTime(time);
		if (audio) audio.currentTime = time;
	};

	const playNext = async (track?: ITrack) => {
		if (!nowPlaying) return;
		const currentPlaying = track || nowPlaying;
		const trackCurrentQueueIndex = queue.findIndex(
			(q) => q.deezerId === currentPlaying.deezerId,
		);
		if (trackCurrentQueueIndex !== queue.length - 1) {
			playSong(queue[trackCurrentQueueIndex + 1]);
		} else {
			stop();
		}
	};

	const playPrevious = async (track?: ITrack) => {
		if (!nowPlaying) return;
		const currentPlaying = track || nowPlaying;
		const trackCurrentQueueIndex = queue.findIndex(
			(q) => q.deezerId === currentPlaying.deezerId,
		);
		if (trackCurrentQueueIndex !== 0) {
			playSong(queue[trackCurrentQueueIndex - 1]);
		}
	};

	return (
		<>
			<audio
				id="audio_element"
				ref={audioRef}
				src={nowPlaying?.song}
				onEnded={() => {
					pause();
					playNext();
				}}
				autoPlay
			/>
			<PlayerContext.Provider
				value={{
					currentTime,
					isPlaying,
					nowPlaying,
					pause,
					play,
					playSong,
					queue,
					setQueue,
					playlistUUID,
					setPlaylistUUID,
					seekTo,
					playNext,
					playPrevious,
				}}
			>
				{children}
			</PlayerContext.Provider>
		</>
	);
};
