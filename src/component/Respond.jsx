import { useState } from "react";
import { useSelector } from "react-redux";
import { getToken, getMe } from "../features/user/userSlice";
import { bug } from "../Utils/fn";

const Respond = ({ parent, parentUserId }) => {
  const [content, setContent] = useState("");
  const token = useSelector(getToken);
  const me = useSelector(getMe);

  const handlePublish = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        titre: null,
        content,
        parent,
        parent_user_id: parentUserId,
      }),
    })
      .then((rawResult) => rawResult.json())
      .then((result) => {
        // bug.log(
        //   "🚀 ~ file: publish.jsx ~ line 22 ~ .then ~ result",
        //   result
        // );
        // dispatch to posts
        // dispatch(add(result["token"]));
      });
  };
  return (
    <div>
      {me.id ? (
        <form onClick={(e) => handlePublish(e)}>
          <label className='lg'>
            <span>Réponse</span>
            <textarea
              type='text'
              name='content'
              value={content}
              onChange={(e) => setContent(e.target.value)}></textarea>
          </label>
          <button type='submit' className='btn-sm right'>
            Répondre
          </button>
        </form>
      ) : (
        `Connectez-vous pour publier`
      )}
    </div>
  );
};

export default Respond;

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta sed eaque aspernatur rem esse? Eum vero animi assumenda, quo necessitatibus unde ducimus impedit voluptatibus officiis porro reiciendis eligendi. Repellendus dolorem dolor ullam fugit tempore. Ipsum ex provident totam illo veritatis, quos impedit pariatur fugiat sit quis, eius sed et officiis.
