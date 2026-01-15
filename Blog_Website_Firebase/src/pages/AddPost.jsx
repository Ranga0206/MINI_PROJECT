import { useContext, useState } from "react"
import Heading from "../components/Heading"
import Input from "../components/Input"
import TextArea from "../components/TextArea"
import Button from "../components/Button"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"


const Addpost = () => {
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  const navigate = useNavigate();

  const handleCreatePost = async () => {
    try {
      if (!title || !description) {
        return;
      }
      const postRef = collection(db, "posts")
      await addDoc(postRef,
        { title, description, userId: user?.id, created_At: serverTimestamp() });
      setTitle("");
      setDescription("");
      navigate("/");
    } catch (error) {
      console.error(error);
    }

  }
  return (
    <div className='max-w-3xl mx-auto'>
      <div className="bg-white rounde-2xl p-8 shadow-sm border border-slate-200 space-y-6">
        <Heading headingText="Create new post" text="Share your thoughts with the world" />

        <div className="space-y-2">
          <label
            className="text-sm font-medium text-slate-700 ml-1"
            htmlFor="title">Title</label>
          <Input type="text" placeholder="Enter post title" value={title} setValue={setTitle} />
        </div>

        <div className="space-y-2">
          <label htmlFor="desc"
            className="text-sm font-medium text-slate-700 ml-1"
          >Description</label>

          <TextArea placeholder="Write your story..."
            id="description"
            value={description}
            setValue={setDescription} />
          <div>
            <Button text="Publish Post" onClick={handleCreatePost} />
          </div>
        </div>

      </div>

    </div>
  )
}

export default Addpost