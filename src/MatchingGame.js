import React from 'react';
import './MatchingGame.css';
import { all } from 'q';

const images = ["https://rb.gy/a4ea6c", "https://rb.gy/aeb84b", "https://rb.gy/b783eb"];

function MatchingGame() {
  return (
    <div className="MatchingGameContainer">
        {renderImageToMatch()}
        {renderOtherImages()}
    </div>
  );
}

/**
 * Renders the top image for the user to match to
 */
function renderImageToMatch() {
    // TODO: Change rendering to use image from state
    return (
        <div className="topImage">
            <img src={getImageToMatch()}/>
        </div>
      );
}

/**
 * Renders the bottom three images for the user to choose from
 */
function renderOtherImages() {
    // TODO: Change to use state
    const randomImages = [, ]
    const allImages = [getImageToMatch(), randomImages[0], randomImages[1]];
    shuffle(allImages);
    return (
        <div className="otherImages">
            <img src={allImages[0]}/>
            <img src={allImages[1]}/>
            <img src={allImages[2]}/>
        </div>
      );
}

/**
 * Returns the image to match
 */
function getImageToMatch() {
    // TODO: Use React Hooks to set this to state
    return "https://rb.gy/335db0";
}

/**
 * Returns a random image
 */
function getRandomImages() {
    const imagesToMatch = getImageToMatch();

    const randomNumber = Math.floor(Math.random() * (4+1));
    return images[randomNumber];

    // Loop throuhg and find 2 different images that are also not the image to match
    // Return them in an array
    // Comment out previous test function
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

export default MatchingGame;
