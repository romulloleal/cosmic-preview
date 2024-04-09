import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { ITrack } from '@/interfaces/ITrack';

type SeachTracksQueryParams = {
	query: string;
};

export const SEARCH_TRACKS_QUERY_KEY = ['tracks'];

const searchTracks = async ({
	query,
}: SeachTracksQueryParams): Promise<ITrack[]> => {
	const { data } = await axios.get(`/deezer-api/search`, {
		params: {
			q: query,
		},
	});
	return data;
};

export const useSearchTracks = (params: SeachTracksQueryParams) => {
	return useQuery<ITrack[], Error>({
		queryKey: SEARCH_TRACKS_QUERY_KEY,
		queryFn: async () => await searchTracks(params),
		enabled: false,
	});
};
