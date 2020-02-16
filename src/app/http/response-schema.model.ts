/**
 * Model class for the server response
 */
export class ResponseSchema {
    /**
     * error boolean true/false from the server response
     */
    error: boolean;
    /**
     * error/success message from server
     */
    message: string;
    /**
     * data from the server post/get requests
     */
    data: any[];
}
