const DEFAULT_API_URL = 'http://localhost:8000/api';

const trimTrailingSlashes = (value: string) => value.replace(/\/+$/, '');
const trimLeadingSlashes = (value: string) => value.replace(/^\/+/, '');

export const API_BASE_URL = trimTrailingSlashes(
  import.meta.env.VITE_API_URL || DEFAULT_API_URL
);

export const apiUrl = (path: string) => `${API_BASE_URL}/${trimLeadingSlashes(path)}`;
