import apiClient from "./client.jsx";

// Auth APIs
export const forgotPasswordApi = (email) => apiClient.post("/auth/forgot-password", { email });
export const resetPasswordApi = (payload) => apiClient.post("/auth/reset-password", payload);
export const verifyOtpApi = (payload) => apiClient.post("/auth/verify-otp", payload);
export const resendOtpApi = (email, purpose) => apiClient.post("/auth/resend-otp", { email, purpose });

// Pirate Management APIs (Admin)
export const fetchPiratesApi = (params = {}) => apiClient.get("/pirates", { params });
export const fetchPirateByIdApi = (id) => apiClient.get(`/pirates/${id}`);
export const createPirateApi = (payload) => apiClient.post("/pirates", payload);
export const updatePirateApi = (id, payload) => apiClient.put(`/pirates/${id}`, payload);
export const updatePirateVitalsApi = (id, vitals) => apiClient.put(`/pirates/${id}/vitals`, vitals);
export const updatePirateSkillsApi = (id, skills) => apiClient.put(`/pirates/${id}/skills`, { skills });
export const dischargePirateApi = (id) => apiClient.delete(`/pirates/${id}`);

// Mission Management APIs
export const fetchMissionsApi = () => apiClient.get("/missions");
export const fetchMissionByIdApi = (id) => apiClient.get(`/missions/${id}`);
export const createMissionApi = (payload) => apiClient.post("/missions", payload);
export const fetchMissionRecommendationsApi = (id, limit = 5) =>
  apiClient.post(`/missions/${id}/recommend?limit=${limit}`);
export const assignMissionCrewApi = (id, pirateIds) =>
  apiClient.post(`/missions/${id}/assign`, { pirateIds });

// Crew Member Self-Service APIs
export const fetchMyProfileApi = () => apiClient.get("/me");
export const updateMyProfileApi = (payload) => apiClient.put("/me", payload);
export const fetchMyMissionsApi = () => apiClient.get("/me/missions");
