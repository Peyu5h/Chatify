import { useEffect } from "react";

const ClickOutside = (ref, fun) => {
  useEffect(() => {
    const lister = (e) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      fun();
    };
    document.addEventListener("mousedown", lister);
    document.addEventListener("touchstart", lister);
    return () => {
      document.removeEventListener("mousedown", lister);
      document.removeEventListener("touchstart", lister);
    };
  }, [ref]);
  return <div></div>;
};

export default ClickOutside;
