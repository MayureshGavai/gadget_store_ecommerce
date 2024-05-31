

const Carousel = () => {
  return (
    <div className="px-14 py-5 w-full flex gap-4">
      <div className="w-4/6 h-96 border border-black">
        <img
          src="https://img.etimg.com/thumb/width-420,height-315,imgsize-114562,resizemode-75,msid-98525678/top-trending-products/major-appliances/air-conditioners/best-split-ac-in-india-experience-comfortable-and-cost-effective-cooling/hcrz8kbgnnjdmeolzdfsjpg.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-2/6 flex flex-col gap-4">
        <div className="w-full h-20 border border-black"></div>
      </div>
    </div>
  )
}

export default Carousel