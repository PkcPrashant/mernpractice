import { useNavigate } from "react-router-dom";

const PostList = ({ posts = [] }) => {

    const navigate = useNavigate();

    const handleClick = (post) => {
        navigate(`/post/${post._id}`);
    }

    return (
        <div className="w-100 d-flex flex-column justify-content-center align-items-center gap-2">
            {
                posts.map((post) => (
                    <div key={post._id} onClick={() => handleClick(post)} className="w-100 border rounded border-dark">
                        <h4>{post.title}</h4>
                        <div>{post.description}</div>
                    </div>
                ))
            }
        </div>
    )
}

export default PostList;