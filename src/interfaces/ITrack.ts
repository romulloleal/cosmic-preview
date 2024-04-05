export interface ITrack {
	id?: number;
	deezerId: number;
	title: string;
	thumbnail: string;
	artist: string;
	duration: {
		seconds: number;
		label: string;
	};
	preview: string;
	bgColor: string;
}
