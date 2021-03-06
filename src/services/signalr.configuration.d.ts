import { ConnectionTransport } from './connection/connection.transport';
export declare class SignalRConfiguration {
    /** connection url to the SignalR service */
    url: string;
    /** Allows you to specify query string parameters object when the client connects */
    qs?: any;
    /** name of the SignalR service hub to connect to */
    hubName: string;
    /** disable/enables client side logging. Defaults to false */
    logging: boolean;
    /** Allows jsonp. This flag can be used to suppport CORS on older browsers */
    jsonp: boolean;
    /** Allows withCredentials. This flag can be used to suppport CORS */
    withCredentials: boolean;
    /** Allows you to specify transport. You can specify a fallback order if you wan't to try specific transports in order. By default selects best avaliable transport. */
    transport: ConnectionTransport | ConnectionTransport[];
    constructor();
}
