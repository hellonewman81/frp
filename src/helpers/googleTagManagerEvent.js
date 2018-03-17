const gtmEvent = values => {
  const dataLayer = window.dataLayer || [];
  // GTM Data Layer
  if (dataLayer) {
    try {
      dataLayer.push(values);
    } catch (e) {
      dataLayer.push('');
    }
  }
};

export default gtmEvent;
