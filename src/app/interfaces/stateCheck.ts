export interface StateCheck {
    find(arg0: (state: StateCheck) => boolean): unknown;
    id: string;
    name: string;
    code: string;
}
