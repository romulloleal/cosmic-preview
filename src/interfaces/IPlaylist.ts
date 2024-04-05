import { ITrack } from './ITrack';

export interface IPlaylist {
	id?: number;
	title: string;
	uuid: string;
	tracks?: ITrack[];
}
