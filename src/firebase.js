import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyAoLR9BxAaChhF6lKh9SE40xOQXayQn-Vw",
	authDomain: "instaclone111111.firebaseapp.com",
	databaseURL: "https://instaclone111111.firebaseio.com",
	projectId: "instaclone111111",
	storageBucket: "instaclone111111.appspot.com",
	messagingSenderId: "101824951647",
	appId: "1:101824951647:web:6584d2302474e06cd3b2ea",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export default storage;
