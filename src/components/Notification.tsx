/* eslint-disable no-console */

import React from "react";
import { IconType } from "react-icons";
import { FaCheckCircle, FaQuestionCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Notification.scss";

interface IProps {
  errorHeader?: string;
  message: string;
  isSuccess: boolean;
  id?: string;
  icon?: IconType;
  closeTime?: number;
}

toast.configure({
  limit: 1,
});

const Notification = (props: IProps) => {
  const notify = () => {
    if (props.isSuccess) {
      return toast.success(
        <div className="noti-success-msg">{props.message}</div>,
        {
          position: "top-right",
          closeButton: true,
          type: toast.TYPE.INFO,
          autoClose: props.closeTime || 4000,
          hideProgressBar: true,
          toastId: props.id,
          style: {
            backgroundColor: "#1F2130",
            borderColor: "white",
            borderRadius: 10,
            border: "1px solid #20D167",
          },
          icon: <FaCheckCircle color="#20D167" size={23} />,
        }
      );
    } else {
      return toast.error(
        <>
          <div className="noti-error-title">{props.errorHeader}</div>
          <div className="noti-error-msg">{props.message}</div>
        </>,
        {
          position: "top-right",
          closeButton: true,
          autoClose: props.closeTime || 4000,
          hideProgressBar: true,
          toastId: props.id,
          style: {
            backgroundColor: "#1F2130",
            borderColor: "white",
            borderRadius: 10,
            border: "1px solid #F05A5A",
          },
          icon: props.icon ? (
            <props.icon color="#F05A5A" size={23} />
          ) : (
            <FaQuestionCircle color="#F05A5A" size={23} />
          ),
        }
      );
    }
  };
  return <div>{notify()}</div>;
};

export default Notification;
