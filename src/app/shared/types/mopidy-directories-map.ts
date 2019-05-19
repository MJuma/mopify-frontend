import { MopidyDirectoriesDetails } from './mopidy-directories-details';

export interface MopidyDirectoriesMap {
    [uri: string]: MopidyDirectoriesDetails;
}
