console.log('YEST');
const faceContainer = document.getElementsByClassName('face-container')[0];

const faceXPosition =
	faceContainer.getBoundingClientRect().x + faceContainer.getBoundingClientRect().width / 2;
const faceYPosition =
	faceContainer.getBoundingClientRect().y + faceContainer.getBoundingClientRect().height / 2;

onmousemove = function (e) {
	getTheAngle(e);
	// console.log('mouse location:', e.clientX, e.clientY);
};
onclick = () => {
	console.log(faceContainer.getBoundingClientRect().x + faceContainer.getBoundingClientRect().width / 2);
	console.log(faceContainer.getBoundingClientRect().y + faceContainer.getBoundingClientRect().height / 2);
};


const getTheAngle = e => {
	const mouseXPosition = e.clientX;
	const mouseYPosition = e.clientY;
	let adjacent;
	let opposite;
	let arctan;
	let angleBetweenFaceAndMouse;

	let quadrant = whichQuadrant(mouseXPosition, mouseYPosition);
	switch (quadrant) {
		case 1:
			adjacent = faceXPosition - mouseXPosition;
			opposite = faceYPosition - mouseYPosition;
			arctan = Math.atan(opposite / adjacent);
			angleBetweenFaceAndMouse = (arctan * 180) / Math.PI;
			if (angleBetweenFaceAndMouse >= 0 && angleBetweenFaceAndMouse<=20 ) {
				showPicture('left');
			}
			else if (angleBetweenFaceAndMouse > 20 && angleBetweenFaceAndMouse<= 70) {
				showPicture('upperLeft');
			} else {
				showPicture('up');
			}
			break;
		case 2:
			adjacent = mouseXPosition - faceXPosition;
			opposite = faceYPosition - mouseYPosition;
			arctan = Math.atan(opposite / adjacent);
			angleBetweenFaceAndMouse = (arctan * 180) / Math.PI;
			if (angleBetweenFaceAndMouse >= 0 && angleBetweenFaceAndMouse<=20 ) {
				showPicture('right');
			}
			else if (angleBetweenFaceAndMouse > 20 && angleBetweenFaceAndMouse<= 70) {
				showPicture('upperRight');
			} else {
				showPicture('up');
			}
			break;
		case 3:
			adjacent = mouseXPosition - faceXPosition;
			opposite = mouseYPosition - faceYPosition;
			arctan = Math.atan(opposite / adjacent);
			angleBetweenFaceAndMouse = (arctan * 180) / Math.PI;
			if (angleBetweenFaceAndMouse >= 0 && angleBetweenFaceAndMouse<=20 ) {
				showPicture('right');
			}
			else if (angleBetweenFaceAndMouse > 20 && angleBetweenFaceAndMouse<= 70) {
				showPicture('bottomRight');
			} else {
				showPicture('bottom');
			}
			break;
		case 4:
			adjacent = faceXPosition - mouseXPosition;
			opposite = mouseYPosition - faceYPosition;
			arctan = Math.atan(opposite / adjacent);
			angleBetweenFaceAndMouse = (arctan * 180) / Math.PI;
			if (angleBetweenFaceAndMouse >= 0 && angleBetweenFaceAndMouse<=20 ) {
				showPicture('left');
			}
			else if (angleBetweenFaceAndMouse > 20 && angleBetweenFaceAndMouse<= 70) {
				showPicture('bottomLeft');
			} else {
				showPicture('bottom');
			}
			break;
	}
	arctan = Math.atan(opposite / adjacent);
	angleBetweenFaceAndMouse = (arctan * 180) / Math.PI;
	// console.log(angleBetweenFaceAndMouse);

	// const adjacent = Math.abs(mouseXPosition - faceXPosition);
	// const opposite = Math.abs(mouseYPosition - faceYPosition);
	// console.log('Adjacent: ' + adjacent);
	// console.log('Opposite:' + opposite);
	// arctan = Math.atan(opposite / adjacent);
	// angleBetweenFaceAndMouse = (arctan * 180) / Math.PI;
	// console.log(angleBetweenFaceAndMouse);
};

const showPicture = direction => {
	const url = `http://127.0.0.1:5500/_assets/${direction}.jpg`;
	// console.log(url);
	[...faceContainer.children].forEach(image => {
		let tempImage;
		if (image.src !== url) {
			tempImage = image;
			// console.log(image.src);
			if (tempImage.classList.contains('active')) tempImage.classList.remove('active');
		} else {
			image.classList.add('active');
			// console.log(image);
		}
	});
};

const whichQuadrant = (x, y) => {
	// console.log('x:' + x);
	// console.log('y:' + y);
	// console.log(`x${x} misha vece od x${faceXPosition} face:` + (x > faceXPosition));
	// console.log(`y${y} misha vece od y${faceYPosition} face:` + (y > faceYPosition));

	if (x < faceXPosition && y < faceYPosition) {
		// console.log('Prvi kvadrant');
		return 1;
	}
	if (x > faceXPosition && y < faceYPosition) {
		// console.log('Drugi kvadrant');
		return 2;
	}
	if (x > faceXPosition && y > faceYPosition) {
		// console.log('Treci kvadrant');
		return 3;
	}
	if (x < faceXPosition && y > faceYPosition) {
		// console.log('Cetvrti kvadrant');
		return 4;
	}
};
