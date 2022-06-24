import React from "react";
import httpClient from "../helper/httpClient";
import router from "next/router";
import usePostApi from "../hooks/usePostApi";

interface BlogItem {
  url: string;
  title: string;
}

const Server = (props: any) => {
  const blog = props.data as BlogItem[];

  const { isLoading, data, postData } = usePostApi("/media");

  function onImageChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];

      let formData = new FormData();
      formData.append("media", img);
      formData.append("title", img.name);
      postData(formData)
        .then(response => {
          console.log('hello', response)
          router.replace(router.asPath)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  return (
    <>
      <h1>Select Image</h1>
      <p>Is loading: {isLoading ? "Loading" : "No"}</p>
      <input type="file" name="myImage" onChange={onImageChange} />
      <h2>List Image</h2>
      <ul className="server-list">
        {blog && blog.length > 0 && (
          <>
            {blog.map((item) => {
              return (
                <li key={item.url}>
                  <div>{item.title}</div>
                  {/* TODO: Replace with Next Image */}
                  <img src={item.url} alt={item.title} width={200} />
                </li>
              );
            })}
          </>
        )}
      </ul>
    </>
  );
};

export async function getServerSideProps() {
  const response = await httpClient.get("/media");

  return {
    props: {
      data: response.data,
    }, // will be passed to the page component as props
  };
}

export default Server;
