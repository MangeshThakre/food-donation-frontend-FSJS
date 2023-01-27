import React, { useContext } from "react";
import { GlobalContex } from "../context/contex";
import NotificationListComponent from "./NotificationListComponent";
function NotificationComponent() {
  const { setShowNotificationComponent, notificationData } =
    useContext(GlobalContex);

  return (
    <div className="scroll absolute top-24 right-4  flex flex-col gap-3 z-10  max-w-md   overflow-scroll  max-h-[70vh]  px-4 py-2 rounded-xl">
      {/* card */}

      {notificationData.notifications &&
      notificationData.notifications.length < 1 ? (
        <div className="md:w-[20rem] md:h-20  shadow-2xl bg-white rounded-lg flex items-center justify-center  dark:bg-gray-700 p-2">
          <p className=" font-bold text-xl   text-blue-500">No notifications</p>
        </div>
      ) : (
        notificationData.notifications &&
        notificationData.notifications.map((notification) => (
          <NotificationListComponent
            key={notification._id}
            notification={notification}
          />
        ))
      )}
      {/* card end */}
    </div>
  );
}

export default NotificationComponent;
