import React from "react";

const Context = React.createContext({
	unseen: false,
	updateNoti: "",
	setUpdatenoti: () => {},
	updateFeed: "",
	setUpdatefeed: () => {},
	currentUser: "",
	setCurrentuser: () => {},
	userData: [],
	setUserdata: () => {},
	file: null,
	setFile: () => {},
});

export default Context;
