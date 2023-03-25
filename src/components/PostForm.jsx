import React from "react";
import { useState } from "react";

const PostForm = () => {
  const [textPrompt, setTextPrompt] = useState("");
  const [emojiPrompt, setEmojiPrompt] = useState("");
  const [postLength, setPostLength] = useState("");
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
        `Write a LinkedinIn post using the following prompt: ${textPrompt}. ` +
        `${emojiPrompt}. ` +
        `Post should be ${postLength}. `,
      temperature: 0.5,
      max_tokens: 1000,
      frequency_penalty: 1.2,
    }),
  };

  const getAPIdata = async () => {
    setLoading(true);
    const response = await fetch(process.env.REACT_APP_OPENAI_URL, options);
    const json = await response.json();
    const responseData = json.choices[0].text.trim();
    setPostResponse(responseData);
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Calling the OpenAI API
    getAPIdata();

    setTextPrompt("");
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
        <input
          type="radio"
          value="Include emojis."
          onChange={(e) => setEmojiPrompt(e.target.value)}
          name="emoji-selection"
        />
        <label>Include emojis</label>
        <input
          type="radio"
          value="Do not include emojis."
          onChange={(e) => setEmojiPrompt(e.target.value)}
          name="emoji-selection"
          required
        />
        <label>Do not include emojis</label>
        <label>Select Post Length:</label>
        <select
          name="postLength"
          required
          onChange={(e) => setPostLength(e.target.value)}
        >
          <option value=""></option>
          <option value="under 50 words">Under 50 words</option>
          <option value="50-100 words">50-100 words</option>
          <option value="100-50 words">100-150 words</option>
          <option value="150-200 words">150-200 words</option>
          <option value="over 200 words">Over 200 words</option>
        </select>
        <button>Submit</button>
      </form>

      {!isLoading ? postResponse : "loading..."}
    </>
  );
};

export default PostForm;
