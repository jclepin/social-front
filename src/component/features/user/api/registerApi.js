const registerApi = async ({ login, password }) => {
  try {
    const rawResult = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });
    if (rawResult.ok) {
      await rawResult.json();
      return { ok: true };
    } else {
      //   return await Promise.reject({ erreur: "dsfsfsdf" });
      return { erreur: "Enregistrement impossible" };
    }
  } catch (e) {
    console.log("🚀 ~ file: registerApi.js ~ line 16 ~ registerApi ~ e", e);
  }
};

export default registerApi;
