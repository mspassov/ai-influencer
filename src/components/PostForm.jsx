import React from "react";
import { useState } from "react";

const PostForm = () => {
  const [textPrompt, setTextPrompt] = useState("");
  const [postResponse, setPostResponse] = useState("");
  const [isLoading, setLoading] = useState(false);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt:
        "Write a LinkedinIn post using the following prompt: " + textPrompt,
      temperature: 0.5,
      max_tokens: 1000,
      frequency_penalty: 1.2,
    }),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTextPrompt("");

    const response = await fetch(process.env.REACT_APP_OPENAI_URL, options);
    const json = await response.json();
    const responseData = json.choices[0].text.trim();
    setPostResponse(responseData);

    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>What did you do today?</label>
        <textarea
          required
          value={textPrompt}
          onChange={(e) => setTextPrompt(e.target.value)}
        ></textarea>
        <button>Submit</button>
      </form>

      {!isLoading ? postResponse : "loading..."}
    </>
  );
};

export default PostForm;
