class CustomError extends Error {
  constructor(message: string, statusCode?: number) {
    super(message);
  }
}
export default CustomError;
