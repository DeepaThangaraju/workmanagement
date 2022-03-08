const createWork = async (req, res) => {
  res.send("create Work");
};

const deleteWork = async (req, res) => {
  res.send("delete Work");
};

const getAllWork = async (req, res) => {
  res.send("getAll Work");
};

const updateWork = async (req, res) => {
  res.send("update Work");
};

const showStats = async (req, res) => {
  res.send("show stats");
};

export { createWork, deleteWork, getAllWork, updateWork, showStats };
