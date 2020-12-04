const faceContainers = document.getElementsByClassName('face-container');

onmousemove = function (e) {
	Array.from(faceContainers).forEach(face=>{
		let props = {e,faceContainer:face};
		getTheAngle(props)

	})

};

const getTheAngle = props => {
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

};

const showPicture = props => {
	const url = `http://127.0.0.1:5500/_assets/${props.direction}.jpg`;
	props.images.forEach(image => {
		let tempImage;
		if (image.src !== url) {
			tempImage = image;
			if (tempImage.classList.contains('active')) tempImage.classList.remove('active');
		} else {
			image.classList.add('active');
		}
	});
};

const whichQuadrant = (x, y,fx,fy) => {

	if (x < fx && y < fy) {
		return 1;
	}
	if (x > fx && y < fy) {
		return 2;
	}
	if (x > fx && y > fy) {
		return 3;
	}
	if (x < fx && y > fy) {
		return 4;
	}
};
