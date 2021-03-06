import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../user/userSlice";
import { postPubAsync } from "./postSlice";

const Respond = ({ parent, parentUserId }) => {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { me } = useSelector(getUser);

  const handlePublish = (e) => {
    e.preventDefault();

    try {
      dispatch(
        postPubAsync({ content, parent, parent_user_id: parentUserId })
      ).then(({ payload }) => {
        if (payload.erreur) {
          setMessage(<div className='toUser'>Pas de message à publier</div>);
        } else {
          setContent("");
          setMessage(
            <div className='toUser success'>Votre message est bien posté</div>
          );
        }

        setTimeout(() => {
          setMessage("");
        }, 2000);
        // payload.erreur && setToUser("Problème lors de la connexion");
      });
    } catch (e) {
      console.log("🚀 ~ file: Publish.jsx ~ line 24 ~ handlePublish ~ e", e);
    }
  };
  return (
    <div>
      {me.id ? (
        <form onSubmit={(e) => handlePublish(e)}>
          <label className='lg'>
            <span>Réponse</span>
            <textarea
              type='text'
              name='content'
              value={content}
              onChange={(e) => setContent(e.target.value)}></textarea>
          </label>
          {message}
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
