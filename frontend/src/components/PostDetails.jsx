import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostDetails = () => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const params = useParams();

    const [post, setPost] = useState({});
    const [form, setForm] = useState({
        title: '',
        description: ''
    })

    const getPost = (id) => {
        fetch(`${BASE_URL}/blog/${id}`)
            .then(resp => resp.json())
            .then(resp => {
                console.log('Response ', resp);
                setPost(resp.data);
            })
            .catch(err => console.log('Error ', err))
    }

    useEffect(() => {
        if (params?.id) {
            getPost(params.id);
        }
    }, [params]);

    useEffect(() => {
        setForm(() => ({
            title: post.title || '',
            description: post.description || ''
        }))
    }, [post]);

    const handleClick = () => {
        //api call
    }

    return (
        <div className="d-flex flex-column gap-2">
            <h1>Post Details</h1>
            <div className="d-flex flex-column">
                <label htmlFor="title">Title</label>
                <input id="title" type="text" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
            </div>
            <div className="d-flex flex-column">
                <label htmlFor="description">Description</label>
                <textarea id="description" rows={5} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
            </div>
            <button onClick={handleClick}>Submit</button>
        </div>
    )
}

export default PostDetails;