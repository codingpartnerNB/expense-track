import classes from './Notification.module.css';

const Notification = (props) => {
  let specialClasses = '';

  if (props.status === 'Error') {
    specialClasses = classes.error;
  }
  if (props.status === 'Success') {
    specialClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;

  return (
    <section className={cssClasses}>
      <h2>{props.title}</h2>
      <p>{props.message}</p>
    </section>
  );
};

export default Notification;