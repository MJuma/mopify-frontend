import { MopidyDirectoriesMap } from './mopidy-directories-map';

export interface MopidyDirectoriesDetails {
    name: string;
    type: string;
    children?: MopidyDirectoriesMap;
}
