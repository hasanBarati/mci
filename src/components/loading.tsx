function Loading() {
  return (
    <div className="flex items-center justify-center  p-5 ">
      <div className="flex gap-x-2 animate-pulse">
        <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
        <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
        <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
      </div>
    </div>
  );
}

export default Loading;
