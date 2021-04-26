const getMeApi = async () => {
  try {
    const rawResult = await fetch(`${process.env.REACT_APP_API_URL}/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    if (!rawResult.ok) {
      // localStorage.removeItem("token");
      return { erreur: "erreur" };
      // dispatch(disconnect());
      // history.push("/");
    }
    const result = await rawResult.json();
    return { ...result };
  } catch (e) {
    console.log("🚀 ~ file: getMeApi.js ~ line 15 ~ getMeApi ~ e", e);
  }
};

export default getMeApi;
