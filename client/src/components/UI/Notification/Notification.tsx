import classes from './Notification.module.css';

type NotificationProps = {
  status: "error" | "success" | "pending";
  title: string;
  message: string;
};


const Notification = (props: NotificationProps) => {
  const cssClasses = `${classes.notification} ${
    props.status === "error" ? classes.error : classes.success
  }`;

  return (
    <section className={cssClasses}>
      <h2>{props.title}</h2>
      <p>{props.message}</p>
    </section>
  );
}

export default Notification