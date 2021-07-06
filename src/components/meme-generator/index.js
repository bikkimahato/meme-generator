import React, { useState, useEffect } from "react";

const MemeGenerator = () => {
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [memesList, setMemesList] = useState([]);
  const [randomImage, setRandomImage] = useState(
    "http://i.imgflip.com/1bij.jpg"
  );

  useEffect(() => {
    fetch(`https://api.imgflip.com/get_memes`)
      .then((response) => response.json())
      .then((res) => {
        setMemesList(res.data.memes);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "topText") {
      setTopText(value);
    } else if (name === "bottomText") {
      setBottomText(value);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const randomNumber = Math.floor(Math.random() * 100);
    const randomImage = memesList[randomNumber].url;
    setRandomImage(randomImage);
  };
  return (
    <div>
      <form className="meme-form" onSubmit={submitHandler}>
        <input
          type="text"
          name="topText"
          placeholder="Top Text"
          value={topText}
          onChange={handleChange}
        />
        <input
          type="text"
          name="bottomText"
          placeholder="Bottom Text"
          value={bottomText}
          onChange={handleChange}
        />
        <button>Generate</button>
      </form>
      <div className="meme">
        <img src={randomImage} alt="meme" id="memeImg" />
        <h2 className="top">{topText}</h2>
        <h2 className="bottom">{bottomText}</h2>
      </div>
    </div>
  );
};

export default MemeGenerator;