const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/917378255255?text=Hi%2C%20I%20want%20to%20connect."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="
        fixed bottom-5 right-5
        w-14 h-14
        bg-[#25D366]
        rounded-full
        flex items-center justify-center
        shadow-xl
        z-[9999]
      "
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        className="w-8 h-8"
      />
    </a>
  );
};

export default WhatsAppButton;
