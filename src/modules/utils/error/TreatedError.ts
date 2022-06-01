class TreatedError extends Error {
  public treatedError: boolean;

  public endpoint?: string;

  public status?: number;

  public internalCode?: number;

  public severity?: "error" | "success" | "info" | "warning";

  constructor({ message, endpoint, status, internalCode }: TreatedErrorArgs) {
    super(message);
    this.treatedError = true;
    this.endpoint = endpoint;
    this.status = status;
    this.internalCode = internalCode;
    this.severity = "error";
  }
}

export interface TreatedErrorArgs {
  message?: string;
  endpoint?: string;
  status?: number;
  internalCode?: number;
  severity?: "error" | "success" | "info" | "warning";
}

export default TreatedError;
