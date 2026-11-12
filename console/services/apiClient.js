// Unified API Client for Terra Interface Console
// Replaces silent null fallbacks with explicit error propagation and strict status handling

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
const IS_DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export class ApiError extends Error {
  constructor(message, statusCode = 500, details = null) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

export class ApiClient {
  static isDemoMode() {
    return IS_DEMO_MODE;
  }

  static getBaseUrl() {
    return API_BASE_URL;
  }

  static async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    let response;
    try {
      response = await fetch(url, { ...options, headers });
    } catch (networkError) {
      const errorMsg = `Unable to connect to Terra Core Engine at ${API_BASE_URL}. Ensure core backend is running.`;
      console.error(`[ApiClient Network Error] ${options.method || 'GET'} ${endpoint}:`, networkError.message);
      throw new ApiError(errorMsg, 0, { originalError: networkError.message, endpoint });
    }

    let responseBody;
    try {
      responseBody = await response.json();
    } catch (parseError) {
      responseBody = null;
    }

    if (!response.ok) {
      const errorMessage = responseBody?.message || `HTTP ${response.status}: ${response.statusText}`;
      const details = responseBody?.details || responseBody?.error || null;
      console.error(`[ApiClient Error] ${options.method || 'GET'} ${endpoint} [${response.status}]:`, errorMessage);
      throw new ApiError(errorMessage, response.status, details);
    }

    // Unpack standardized envelope if present: { success: true, data: T } -> return data
    if (responseBody && typeof responseBody === 'object' && 'success' in responseBody && 'data' in responseBody) {
      return responseBody.data;
    }

    return responseBody;
  }

  static get(endpoint, params = {}) {
    const query = new URLSearchParams(params).toString();
    const path = query ? `${endpoint}?${query}` : endpoint;
    return this.request(path, { method: 'GET' });
  }

  static post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static patch(endpoint, data) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  static delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}
