import classes from "./overlay.module.css";

const Overlay = ({ children }) => (
  <div className={classes.root}>{children}</div>
);

export default Overlay;
