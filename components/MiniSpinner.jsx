const MiniSpinner = () => {
  return (
    <div
      className="animate-spin inline-block w-4 h-4 border-[3px] border-t-transparent rounded-full border-fondo-300"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default MiniSpinner;
