import { userStore } from "./userStore";
import { menuStore } from "./menuStore";
import { menuRouteStore } from "./routeStore";

const mainStore = () => {
	return {
		user: userStore(),
		menu: menuStore(),
		menuRoute: menuRouteStore(),
	};
};

export default mainStore;
