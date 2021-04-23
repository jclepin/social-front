const connectApi = async ({ login, password }) => {
  try {
    const rawResult = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });
    if (rawResult.ok) {
      const result = await rawResult.json();
      localStorage.setItem("token", result["token"]);
      return result;
    } else {
      //   return await Promise.reject({ erreur: "dsfsfsdf" });
      return { erreur: "Connexion impossible" };
    }
  } catch (e) {
    console.log("🚀 ~ file: connectApi.jsx ~ line 48 ~ connectApi ~ e", e);
  }
};

export default connectApi;
