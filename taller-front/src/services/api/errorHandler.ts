export type FieldErrors = Record<string, string>;

interface ErrorResponsePayload {
  message?: unknown;
  error?: unknown;
  fieldErrors?: unknown;
}

interface HttpErrorShape {
  response?: {
    status?: number;
    data?: unknown;
  };
  message?: string;
}

export class ApiError extends Error {
  fieldErrors: FieldErrors;
  status?: number;

  constructor(message: string, fieldErrors: FieldErrors = {}, status?: number) {
    super(message);
    this.name = "ApiError";
    this.fieldErrors = fieldErrors;
    this.status = status;
  }
}

const normalizeFieldErrors = (rawFieldErrors: unknown): FieldErrors => {
  if (!rawFieldErrors || typeof rawFieldErrors !== "object") {
    return {};
  }

  return Object.entries(rawFieldErrors as Record<string, unknown>).reduce<FieldErrors>(
    (accumulator, [fieldName, fieldMessage]) => {
      if (typeof fieldMessage === "string" && fieldMessage.trim()) {
        accumulator[fieldName] = fieldMessage;
      }
      return accumulator;
    },
    {}
  );
};

export const parseApiError = (error: unknown): ApiError => {
  const httpError = error as HttpErrorShape;
  const status = httpError?.response?.status;
  const responseData = httpError?.response?.data;

  let message = "Ocurrió un error inesperado.";
  let fieldErrors: FieldErrors = {};

  if (typeof responseData === "string" && responseData.trim()) {
    message = responseData;
  } else if (responseData && typeof responseData === "object") {
    const payload = responseData as ErrorResponsePayload;

    if (typeof payload.message === "string" && payload.message.trim()) {
      message = payload.message;
    } else if (typeof payload.error === "string" && payload.error.trim()) {
      message = payload.error;
    }

    fieldErrors = normalizeFieldErrors(payload.fieldErrors);
  }

  if (!message.trim() && typeof httpError?.message === "string" && httpError.message.trim()) {
    message = httpError.message;
  }

  return new ApiError(message, fieldErrors, status);
};

export const handleError = (error: unknown): never => {
  const parsedError = parseApiError(error);
  console.error("Error:", parsedError.message, parsedError.fieldErrors);
  throw parsedError;
};
