import React, { useContext, useEffect, useState } from "react";

import "./Viewnotifications.css";

import Bottombar from "../Bottombar/Bottombar";
import Notification from "../Viewnotification/Viewnotification";
import Loader from "../Loader/Loader";
import Navbar2 from "../Navbar2/Navbar2";

import Context from "../../Context/Context";
import Axios from "axios";

const Notifications = (props) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const context = useContext(Context);

    useEffect(() => {
        if (context.userData.id !== undefined) {
            Axios.get(
                `https://instaclone111111.herokuapp.com/userInfo/getNotifications/${context.userData.id}`
            ).then((res) => {
                setNotifications(res.data);
                setLoading(false);
            });

            setTimeout(() => {
                Axios.post(
                    `https://instaclone111111.herokuapp.com/userInfo/updateSeen/${context.userData.id}`
                ).then((res) => {
                    context.setUpdatenoti((prev) => !prev);
                });
            }, 2000);
        }
    }, [context.userData]);

    return (
        <div className="notifications">
            <Navbar2 middleText="Notifications" />
            <div className="notification-list">
                {notifications.length > 0 ? (
                    notifications
                        .sort((a, b) => {
                            return new Date(b.date) - new Date(a.date);
                        })
                        .map((noti) => {
                            return (
                                <div
                                    style={loading ? { display: "none" } : null}
                                    key={noti.id}
                                >
                                    <Notification
                                        seen={noti.seen}
                                        postId={noti.postid}
                                        id={noti.id}
                                        userImage={noti.profileimage}
                                        username={noti.username}
                                        notification={noti.notification}
                                        profileImage={noti.profileimage}
                                        postImage={noti.postimage}
                                        date={noti.date}
                                    />
                                </div>
                            );
                        })
                ) : (
                    <p
                        style={
                            loading
                                ? { display: "none" }
                                : { textAlign: "center", fontSize: "14px" }
                        }
                    >
                        No notifications
                    </p>
                )}
                <div style={!loading ? { display: "none" } : null}>
                    <Loader />
                </div>
            </div>

            <Bottombar />
        </div>
    );
};

export default Notifications;
