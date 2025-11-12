import axios, { AxiosInstance, AxiosError } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Types
export interface AnalyzeResponse {
  result_id: string;
  score: number;
  matched_keywords: string[];
  missing_keywords: string[];
  suggestions: string;
}

export interface ResultResponse {
  result_id: string;
  score: number;
  matched_keywords: string[];
  missing_keywords: string[];
  suggestions: string;
}

export interface CompareResponse {
  resume_1_score: number;
  resume_2_score: number;
  better_resume: "resume_1" | "resume_2";
  analysis_summary: string;
}

export interface RewriteResponse {
  improved_text: string;
  reasoning: string;
}

export interface ApiError {
  detail?: string;
  message?: string;
}

export interface OpenAIHealthResponse {
  status: "healthy" | "error";
  message: string;
  model?: string;
  error_type?:
    | "authentication_error"
    | "rate_limit_error"
    | "api_error"
    | "unknown_error";
  error_detail?: string;
}

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor for adding auth tokens if needed
apiClient.interceptors.request.use(
  (config) => {
    // Add any auth tokens or headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message ||
      "An error occurred";
    return Promise.reject(new Error(message));
  }
);

// Helper to get API key from store
let getApiKey: (() => string | null) | null = null;
export const setApiKeyGetter = (getter: () => string | null) => {
  getApiKey = getter;
};

// API functions
export const api = {
  // Analyze resume
  analyze: async (
    resume: File,
    jobDescription: string,
    apiKey?: string
  ): Promise<AnalyzeResponse> => {
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_description", jobDescription);
    const key = apiKey || getApiKey?.();
    if (key) {
      formData.append("api_key", key);
    }

    const response = await apiClient.post<AnalyzeResponse>(
      "/analyze",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  // Get result by ID
  getResult: async (resultId: string): Promise<ResultResponse> => {
    const response = await apiClient.get<ResultResponse>(`/result/${resultId}`);
    return response.data;
  },

  // Compare two resumes
  compare: async (
    resume1: File,
    resume2: File,
    jobDescription: string,
    apiKey?: string
  ): Promise<CompareResponse> => {
    const formData = new FormData();
    formData.append("resume_1", resume1);
    formData.append("resume_2", resume2);
    formData.append("job_description", jobDescription);
    const key = apiKey || getApiKey?.();
    if (key) {
      formData.append("api_key", key);
    }

    const response = await apiClient.post<CompareResponse>(
      "/compare",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  // Rewrite section
  rewrite: async (
    sectionText: string,
    jobDescription: string,
    apiKey?: string
  ): Promise<RewriteResponse> => {
    const key = apiKey || getApiKey?.();
    const response = await apiClient.post<RewriteResponse>("/rewrite", {
      section_text: sectionText,
      job_description: jobDescription,
      ...(key && { api_key: key }),
    });
    return response.data;
  },

  // Health check
  health: async (): Promise<{ status: string }> => {
    const response = await apiClient.get<{ status: string }>("/health");
    return response.data;
  },

  // OpenAI health check
  checkOpenAIHealth: async (apiKey?: string): Promise<OpenAIHealthResponse> => {
    const key = apiKey || getApiKey?.();
    const formData = new URLSearchParams();
    if (key) {
      formData.append("api_key", key);
    }

    const response = await apiClient.post<OpenAIHealthResponse>(
      "/health/openai",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data;
  },
};

export default apiClient;
