const postPubApi = async ({
  titre = null,
  content,
  publique = true,
  parent = null,
  parent_user_id = null,
}) => {
  const rawResult = await fetch(`${process.env.REACT_APP_API_URL}/post`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      titre,
      content,
      public: publique,
      parent,
      parent_user_id: parent_user_id,
    }),
  });

  const result = await rawResult.json();
  return result;
};

export default postPubApi;
