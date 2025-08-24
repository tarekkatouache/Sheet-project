import api from "./api";

// get all users
router.get("/", authenticateToken, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }, // keep all but password
    });

    res.json(users); // return objects, not only names
  } catch (error) {
    console.error("Failed to fetch users:", error);
    res.status(500).json({
      message: "Server error while fetching users.",
      error: error.message,
    });
  }
});

export const addInstrument = async (data) => {
  const response = await api.post("/instruments", data);
  return response.data;
};

export const deleteInstrument = async (id) => {
  const response = await api.delete(`/instruments/${id}`);
  return response.data;
};

export const updateInstrument = async (id, data) => {
  const response = await api.put(`/instruments/${id}`, data);
  return response.data;
};
export const getInstrumentById = async (id) => {
  const response = await api.get(`/instruments/${id}`);
  return response.data;
};
///////////////
// Get instrument by ID
