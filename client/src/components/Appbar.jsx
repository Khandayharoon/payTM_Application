function Appbar() {
  return (
    <div
      className="shadow h-20 flex justify-between items-center"
      style={{ boxShadow: "18px 8px 16px rgba(0, 0, 255, 0.3)" }}
    >
      <div className="flex flex-col justify-center h-full ml-4 text-blue-800  text-3xl font-bold">
        PayTM App
      </div>
      <div className="flex items-center">
        <div className="flex flex-col justify-center h-full mr-4 text-blue-800  text-md">
          Hello
        </div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">U</div>
        </div>
      </div>
    </div>
  );
}

export default Appbar;
