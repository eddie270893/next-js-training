import React, { useEffect, useRef, useState } from "react";
import tinymce from "tinymce";
import "tinymce/themes/silver";
import "tinymce/icons/default/icons";
import "tinymce/models/dom";
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/ui/oxide/content.min.css";
import "tinymce/plugins/image";
import "tinymce/skins/content/default/content.css";
import httpClient from "../../helper/httpClient";

interface BlobInfo {
  id: () => string;
  name: () => string;
  filename: () => string;
  blob: () => Blob;
  base64: () => string;
  blobUri: () => string;
  uri: () => string | undefined;
}

type ProgressFn = (percent: number) => void;

const Editor = (props: any) => {

  const example_image_upload_handler = async (
    blobInfo: BlobInfo,
    _progress: ProgressFn
  ) => {

    const formData = new FormData();
    formData.append("media", blobInfo.blob());
    formData.append("title", blobInfo.filename());
    const res = await httpClient.post("/media", formData);

    return res.data.url;
  };

  useEffect(() => {
    tinymce.init({
      selector: "textarea",
      setup: (editor) => {
        editor.on("keyup change", () => {
          const content = editor.getContent();
          props.onChange(content);
        });
      },
      images_upload_handler: example_image_upload_handler,
      plugins:
        "image",
    });
  }, []);
  return (
    <div>
      <textarea
        name="Editor"
        value={props.data}
        className="form-control"
        onChange={(e) => console.log(e)}
      />
    </div>
  );
};

export default Editor;
