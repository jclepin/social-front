const addFriendApi = async ({ token, who }) => {
  try {
    const rawResult = await fetch(`${process.env.REACT_APP_API_URL}/friends`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ friendId: who }),
    });

    const result = await rawResult.json();

    return result;
  } catch (e) {
    console.log("🚀 ~ file: addFriendApi.js ~ line 15 ~ addFriendApi ~ e", e);
  }
};

export default addFriendApi;
