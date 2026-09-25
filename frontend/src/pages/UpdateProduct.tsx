const UpdateProduct = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-70px)] w-full px-4">
      <form className="flex flex-col w-full max-w-lg rounded-2xl px-10 py-8 bg-[#121212] border border-[#222222] text-[#F3F4F6] gap-8 shadow-xl">
        <h2 className="text-3xl font-extrabold text-center tracking-tight text-white">
          Update Product
        </h2>

        <div className="flex flex-col gap-6">
          {/* Name Field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="px-1 text-sm font-semibold text-gray-300"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter product name"
              className="bg-[#1A1A1A] border border-[#2D2D2D] text-white px-4 py-3 rounded-lg outline-none placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          {/* Description Field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="px-1 text-sm font-semibold text-gray-300"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder=""
              className="bg-[#1A1A1A] border border-[#2D2D2D] text-white px-4 py-3 rounded-lg outline-none placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          {/* Price Field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="price"
              className="px-1 text-sm font-semibold text-gray-300"
            >
              Price <span className="text-red-500">*</span>
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              placeholder="Enter product price"
              className="bg-[#1A1A1A] border border-[#2D2D2D] text-white px-4 py-3 rounded-lg outline-none placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          {/* Stock Field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="stock"
              className="px-1 text-sm font-semibold text-gray-300"
            >
              Stock <span className="text-red-500">*</span>
            </label>
            <input
              id="stock"
              type="number"
              placeholder="Enter product stock"
              className="bg-[#1A1A1A] border border-[#2D2D2D] text-white px-4 py-3 rounded-lg outline-none placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          //   disabled={isPending}
          className="bg-blue-500 text-white py-3 rounded-lg font-bold cursor-pointer hover:bg-blue-600 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/10"
        >
          {/* {isPending ? "Creating..." : "Add Product"} */}
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
