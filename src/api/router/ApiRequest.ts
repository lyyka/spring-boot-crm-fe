/**
 * A generic interface for any api request we are modeling.
 * 
 * Each api request should be able to provide data it sends.
 */
export default interface ApiRequest {
    getData(): Object;
}