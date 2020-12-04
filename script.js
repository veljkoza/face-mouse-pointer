console.log('YEST');
const faceContainers = document.getElementsByClassName('face-container');

// const faceXPosition =
// 	faceContainer.getBoundingClientRect().x + faceContainer.getBoundingClientRect().width / 2;
// const faceYPosition =
// 	faceContainer.getBoundingClientRect().y + faceContainer.getBoundingClientRect().height / 2;

onmousemove = function (e) {
	// getTheAngle(e);
	// const props = {e,faceContainer: faceContainers[0]}
	Array.from(faceContainers).forEach(face=>{
		let props = {e,faceContainer:face};
		getTheAngle(props)

	})
	// const allFaces = [...faceContainers.children];
	// console.log('mouse location:', e.clientX, e.clientY);
};
// onclick = () => {
// 	console.log(faceContainer.getBoundingClientRect().x + faceContainer.getBoundingClientRect().width / 2);
// 	console.log(faceContainer.getBoundingClientRect().y + faceContainer.getBoundingClientRect().height / 2);
// };


const getTheAngle = props => {
	console.log(props.faceContainer.getBoundingClientRect().y)
	const mouseYPosition = props.e.clientY;
	const mouseXPosition = props.e.clientX;
	const faceYPosition = props.faceContainer.getBoundingClientRect().y + props.faceContainer.getBoundingClientRect().height / 2;
	const faceXPosition = props.faceContainer.getBoundingClientRect().x + props.faceContainer.getBoundingClientRect().width / 2;

	let adjacent;
	let opposite;
	let arctan;
	let angleBetweenFaceAndMouse;

	let quadrant = whichQuadrant(mouseXPosition, mouseYPosition,faceXPosition,faceYPosition);
	const images = [...props.faceContainer.children]
	switch (quadrant) {
		case 1:
			adjacent = faceXPosition - mouseXPosition;
			opposite = faceYPosition - mouseYPosition;
			arctan = Math.atan(opposite / adjacent);
			angleBetweenFaceAndMouse = (arctan * 180) / Math.PI;
			if (angleBetweenFaceAndMouse >= 0 && angleBetweenFaceAndMouse<=20 ) {
				showPicture({direction:'left',images});
			}
			else if (angleBetweenFaceAndMouse > 20 && angleBetweenFaceAndMouse<= 70) {
				showPicture({direction:'upperLeft',images});
			} else {
				showPicture({direction:'up',images});
			}
			break;
		case 2:
			adjacent = mouseXPosition - faceXPosition;
			opposite = faceYPosition - mouseYPosition;
			arctan = Math.atan(opposite / adjacent);
			angleBetweenFaceAndMouse = (arctan * 180) / Math.PI;
			if (angleBetweenFaceAndMouse >= 0 && angleBetweenFaceAndMouse<=20 ) {
				showPicture({direction:'right',images});
			}
			else if (angleBetweenFaceAndMouse > 20 && angleBetweenFaceAndMouse<= 70) {
				showPicture({direction:'upperRight',images});
			} else {
				showPicture({direction:'up',images});
			}
			break;
		case 3:
			adjacent = mouseXPosition - faceXPosition;
			opposite = mouseYPosition - faceYPosition;
			arctan = Math.atan(opposite / adjacent);
			angleBetweenFaceAndMouse = (arctan * 180) / Math.PI;
			if (angleBetweenFaceAndMouse >= 0 && angleBetweenFaceAndMouse<=20 ) {
				showPicture({direction:'right',images});
			}
			else if (angleBetweenFaceAndMouse > 20 && angleBetweenFaceAndMouse<= 70) {
				showPicture({direction:'bottomRight',images});
			} else {
				showPicture({direction:'bottom',images});
			}
			break;
		case 4:
			adjacent = faceXPosition - mouseXPosition;
			opposite = mouseYPosition - faceYPosition;
			arctan = Math.atan(opposite / adjacent);
			angleBetweenFaceAndMouse = (arctan * 180) / Math.PI;
			if (angleBetweenFaceAndMouse >= 0 && angleBetweenFaceAndMouse<=20 ) {
				showPicture({direction:'left',images});
			}
			else if (angleBetweenFaceAndMouse > 20 && angleBetweenFaceAndMouse<= 70) {
				showPicture({direction:'bottomLeft',images});
			} else {
				showPicture({direction:'bottom',images});
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

const showPicture = props => {
	const url = `http://127.0.0.1:5500/_assets/${props.direction}.jpg`;
	// console.log(url);
	props.images.forEach(image => {
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

const whichQuadrant = (x, y,fx,fy) => {
	// console.log('x:' + x);
	// console.log('y:' + y);
	// console.log(`x${x} misha vece od x${faceXPosition} face:` + (x > faceXPosition));
	// console.log(`y${y} misha vece od y${faceYPosition} face:` + (y > faceYPosition));

	if (x < fx && y < fy) {
		// console.log('Prvi kvadrant');
		return 1;
	}
	if (x > fx && y < fy) {
		// console.log('Drugi kvadrant');
		return 2;
	}
	if (x > fx && y > fy) {
		// console.log('Treci kvadrant');
		return 3;
	}
	if (x < fx && y > fy) {
		// console.log('Cetvrti kvadrant');
		return 4;
	}
};
