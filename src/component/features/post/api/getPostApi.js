const getPostApi = async ({ token, who }) => {
  let url = `${process.env.REACT_APP_API_URL}/posts`;
  let fetchOptions = {
    headers: { Authorization: `Bearer ${token}` },
  };

  if (who !== undefined) {
    url = `${process.env.REACT_APP_API_URL}/posts/${who}`;
  }
  try {
    const rawResult = await fetch(`${url}`, fetchOptions);
    if (!rawResult.ok) {
      return { erreur: "Pas de publications" };
    }
    const result = await rawResult.json();
    return result;
  } catch (e) {
    //   console.log("🚀 ~ file: Wall.jsx ~ line 38 ~ getPosts ~ e", e);
  }
};

export default getPostApi;
