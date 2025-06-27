import { useState, useEffect } from "react";
import PostList from "./PostList";

const Dashboard = () => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const [search, setSearch] = useState('');
    const [posts, setPosts] = useState([]);

    const getPosts = (query = '') => {
        fetch(`${BASE_URL}/blog${query}`)
            .then(resp => resp.json())
            .then(resp => {
                console.log('Response ', resp);
                setPosts(resp.data);
            })
            .catch(err => console.log('Error ', err))
    }

    useEffect(() => {
        getPosts();
    }, []);

    const handleSearch = () => {
        const query = search ? `/search?key=${search}` : undefined;
        getPosts(query);
    }

    return (
        <div className="d-flex flex-column gap-3">
            <div className="d-flex justify-content-between p-3 bg-secondary">
                <div>
                    <input type="search" placeholder="Search" value={search} onChange={(event) => setSearch(event.target.value)} />
                    <button onClick={handleSearch}>Search</button>
                </div>
                <div>Create</div>
            </div>
            <PostList posts={posts} />
        </div>
    )
}

export default Dashboard;