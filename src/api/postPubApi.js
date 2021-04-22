const postPub = async ({ token, titre, content, publique }) => {
  await fetch(`${process.env.REACT_APP_API_URL}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ titre, content, public: publique }),
  });
};

export default postPub;
