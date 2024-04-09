import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function Home() {
	useQuery({
		queryKey: ['chart'],
		queryFn: async () => {
			await axios.get(`deezer/artist/61145262/top?limit=50`);
		},
	});
	return <></>;
}
