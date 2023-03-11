class HttpExeption extends Error {
  constructor(
    public error: boolean,
    public status: number,
    public message: string,
  ) {
    super();
  }
}

export default HttpExeption;
