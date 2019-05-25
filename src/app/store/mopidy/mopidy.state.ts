export interface MopidyState {
    version: string;
    uriSchemes: string[];
    state: 'on' | 'off';
}
