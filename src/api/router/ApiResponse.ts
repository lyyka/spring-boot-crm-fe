/**
 * A generic interface for any api response we are modeling.
 * 
 * Each api response should be able to receive data into it.
 */
export default interface ApiResponse {
    setData(data: any): void;
}