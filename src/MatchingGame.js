import React,{ useState } from 'react';
import './MatchingGame.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const images = ["coffee", "rocket", "check-square", "piggy-bank"];

function MatchingGame() {

  const [imageToMatch, setImageToMatch] = useState(getImageToMatch());
  
  return (
    <div className="matchingGameContainer">
        {renderImageToMatch(imageToMatch)}
        {renderOtherImages(imageToMatch, setImageToMatch)}
    </div>
  );
}

/**
 * Renders the top image for the user to match to
 */
function renderImageToMatch(imageToMatch) {
    return (
        <div className="topImage">
            <FontAwesomeIcon icon={imageToMatch} />
        </div>
      );
}

/**
 * Renders the bottom three images for the user to choose from
 */
function renderOtherImages(imageToMatch, setImageToMatch) {
    // TODO: Change to use state
    const randomImages = getRandomImages(imageToMatch);
    const allImages = [imageToMatch, randomImages[0], randomImages[1]];
    shuffle(allImages);
    return (
        <div className="otherImagesContainer">
            <div 
                className="otherImage"
                onClick={handleOnClick.bind(this, imageToMatch, allImages[0], setImageToMatch)}
            >
                <FontAwesomeIcon icon={allImages[0]} />
            </div>
            <div 
                className="otherImage"
                onClick={handleOnClick.bind(this, imageToMatch, allImages[1], setImageToMatch)}>
                <FontAwesomeIcon icon={allImages[1]} />
            </div>
            <div 
                className="otherImage"
                onClick={handleOnClick.bind(this, imageToMatch, allImages[2], setImageToMatch)}>
                <FontAwesomeIcon icon={allImages[2]} />
            </div>
        </div>
      );
}

function handleOnClick(imageToMatch, currentImage, setImageToMatch) {
    if (currentImage === imageToMatch) {
        console.log("YAY")
    } else {
        console.log("BOO")
    }
    setImageToMatch(getImageToMatch)
}

/**
 * Returns the image to match
 */
function getImageToMatch() {
    const randomNumber = Math.floor(Math.random() * (images.length));
    return images[randomNumber];
}

/**
 * Returns a list of two random images that doesn't include the image to match.
 */
function getRandomImages(imageToMatch) {
    console.log(imageToMatch)
    console.log(images);
    const imagesWithoutImageToMatch = images.filter(function(value, index, arr) {
        return value !== imageToMatch;
    });
    console.log(imagesWithoutImageToMatch)
    const randomNumber = Math.floor(Math.random() * (imagesWithoutImageToMatch.length));
    let randomNumber2 = Math.floor(Math.random() * (imagesWithoutImageToMatch.length));
    if (randomNumber2 === randomNumber) {
        if (randomNumber2 === imagesWithoutImageToMatch.length - 1) {
            randomNumber2--;
        } else {
            randomNumber2++;
        }
    }

    return [imagesWithoutImageToMatch[randomNumber], imagesWithoutImageToMatch[randomNumber2]];
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

export default MatchingGame;
