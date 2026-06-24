const FALLBACK_ERROR_MESSAGE = 'Something went wrong. Please check the details and try again.';

const STATUS_MESSAGES: Record<number, string> = {
  400: 'Some details are missing or invalid. Please review the form and try again.',
  401: 'Your session expired or you are not signed in. Please sign in again.',
  403: 'You do not have permission to perform this action.',
  404: 'The requested item was not found. It may have been deleted or changed.',
  409: 'This action conflicts with existing data. Please review the details and try again.',
  413: 'The uploaded file is too large. Please choose a smaller file.',
  500: 'A server error occurred. Please try again in a few moments.',
};

const extractMessage = (value: unknown): string | null => {
  if (!value) return null;
  if (typeof value === 'string') return value;

  if (Array.isArray(value)) {
    const messages = value.map(extractMessage).filter(Boolean);
    return messages.length ? messages.join('\n') : null;
  }

  if (typeof value === 'object') {
    const data = value as Record<string, unknown>;
    return (
      extractMessage(data.message) ||
      extractMessage(data.error) ||
      extractMessage(data.details) ||
      extractMessage(data.errors)
    );
  }

  return null;
};

export const getErrorMessage = (error: unknown, fallback = FALLBACK_ERROR_MESSAGE): string => {
  if (typeof error === 'string') return error;

  const err = error as {
    message?: string;
    response?: { status?: number; data?: unknown };
    request?: unknown;
  };

  const serverMessage = extractMessage(err?.response?.data);
  if (serverMessage) return serverMessage;

  const statusMessage = err?.response?.status ? STATUS_MESSAGES[err.response.status] : null;
  if (statusMessage) return statusMessage;

  if (err?.request) {
    return 'Could not reach the server. Please check your internet connection and try again.';
  }

  return err?.message || fallback;
};
