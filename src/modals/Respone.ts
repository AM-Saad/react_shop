

export enum State {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info',
    WARNING = 'warning'
}
interface Response {
    message: string;
    state: State;
    items?: any
}
export default Response
