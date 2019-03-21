class Store {
	static instance = null;
	static getInstance() {
		if (!Store.instance) {
			Store.instance = new Store();
		}
		return Store.instance;
	}

	activeRoute = null;
	activePage = null;
	routesInStack = [];
	topNavigator=null;
}

let store = new Store();

export default store;
