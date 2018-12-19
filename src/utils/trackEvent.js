import ReactGA from "react-ga";

const trackEvent = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label
  });
};

export default trackEvent;
