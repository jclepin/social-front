import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../user/userSlice";
import { postPubAsync } from "./postSlice";

const Publish = () => {
  const [titre, setTitre] = useState("");
  const [content, setContent] = useState("");
  const [publique, setPublique] = useState(true);

  const dispatch = useDispatch();
  const { token, me } = useSelector(getUser);

  const handlePublish = async (e) => {
    e.preventDefault();

    try {
      token &&
        dispatch(postPubAsync({ token, titre, content, publique })).then(
          ({ payload }) => {
            // payload.erreur && setToUser("Problème lors de la connexion");
          }
        );
    } catch (e) {
      console.log("🚀 ~ file: Publish.jsx ~ line 24 ~ handlePublish ~ e", e);
    }
  };
  return (
    <div>
      {me.id ? (
        <form onSubmit={(e) => handlePublish(e)}>
          <label className='lg'>
            <span>Titre</span>
            <input
              type='text'
              name='titre'
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
            />
          </label>
          <label className='lg'>
            <span>Message</span>
            <textarea
              type='text'
              name='content'
              value={content}
              onChange={(e) => setContent(e.target.value)}></textarea>
          </label>
          <label>
            <span>Public </span>
            <input
              type='radio'
              value={publique}
              name='publique'
              onChange={(e) => setPublique(true)}
              checked={publique}
            />
          </label>
          <label className='right'>
            <span>Privé </span>
            <input
              type='radio'
              value={publique}
              name='publique'
              onChange={(e) => setPublique(false)}
              checked={!publique}
            />
          </label>
          <button type='submit' className='btn-lg'>
            Publier
          </button>
        </form>
      ) : (
        `Connectez-vous pour publier`
      )}
    </div>
  );
};

export default Publish;

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta sed eaque aspernatur rem esse? Eum vero animi assumenda, quo necessitatibus unde ducimus impedit voluptatibus officiis porro reiciendis eligendi. Repellendus dolorem dolor ullam fugit tempore. Ipsum ex provident totam illo veritatis, quos impedit pariatur fugiat sit quis, eius sed et officiis.
