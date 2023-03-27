class HttpException extends Error {
  constructor(
    public error: boolean = true,
    public status: number,
    public message: string,
  ) {
    super();
  }
}

export default HttpException;
