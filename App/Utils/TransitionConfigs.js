import { Animated, Easing } from 'react-native';
import _ from 'lodash';

const OverlayTransition = {
	// transitionSpec: {
	// 	duration: 300,
	// 	easing: Easing.inOut(Easing.ease),
	// 	timing: Animated.timing
	// },
	screenInterpolator: (sceneProps) => {
		const { position, scene } = sceneProps;
		const { index } = scene;
		const opacity = position.interpolate({
			inputRange: [ index - 1, index ],
			outputRange: [ 0, 1 ]
		});

		return { opacity };
	}
};

const getTransitionConfig = ({ scenes }) => {
	const { route } = _.last(scenes);
	const params = route.params || {};
	const transition = params.transition || 'default';

	return {
		overlay: OverlayTransition
	}[transition];
};

export default { getTransitionConfig };
