export interface ITrack {
	id?: number;
	deezerId: number;
	title: string;
	thumbnail: string;
	artist: {
		id: number;
		name: string;
	};
	album: string;
	duration: {
		seconds: number;
		label: string;
	};
	preview: string;
	bgColor?: string;
}
