import React, { useEffect, useState } from 'react'
import axios from "axios";
import useQuery from '../../hooks/useQuery';
interface BlogItem {
  title: string;
  body: string;
  id: string;
}
const PostClient = () => {

  const [blog, setBlog] = useState<BlogItem[]>();
  const [totalPage, setTotalPage] = useState<number>(1);
  const [page, setPage] = useState<number>(1);

  const getData = async () => {
    const response = await axios.get(`http://localhost:5000/post?page=${page}`);
    return response.data;
  }
  const { data, fetchData, isLoading } = useQuery(['post'], getData);

  console.log('isLoading', isLoading);
  console.log('data', data);


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ul className="client-list">
      {blog && blog.length > 0 && (
        <>
          {blog.map(item => {
            return <li key={item.id}>{item.title}</li>
          })}
        </>
      )}
    </ul>
    <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
    <button onClick={() => setPage(page + 1)} disabled={page === totalPage}>Next</button>
    </>
    
  )
}

export default PostClient