export const handleError = (error: any): never => {
  console.error("Error:", error.response?.data || error.message);
  throw new Error(error.response?.data?.message || "Ocurrió un error inesperado.");
};
