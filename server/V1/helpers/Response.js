export default class Response {
  /**
     * @description handles sucess response
     * 
     * @param {object} response
     * @param {number} status
     * @param {string} message
     * @param {object} data
     */
  static successResponse(response, status, message, data) {
    return (response.status(status).json({ status, message, data, }));
  }

  /**
   * @description handles error response
   *
   * @param {object} response
   * @param {number} status
   * @param {string} error
   *
   * @returns {object} 
   */
  static errorResponse(response, status, error) {
    return (response.status(status).json({ status, error, }));
  }
}
