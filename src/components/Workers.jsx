import { useRef, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import workersData from './workers.json'

const Workers = () => {
  const scrollRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);

  const scrollAmount = 800; // Adjust scroll distance

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ 
        left: direction === "right" ? scrollAmount : -scrollAmount, 
        behavior: "smooth" 
      });
    }
  };

  // Check scroll position to toggle left arrow visibility
  const checkScrollPosition = () => {
    if (scrollRef.current) {
      setShowLeftButton(scrollRef.current.scrollLeft > 0);
    }
  };

  return (
    <div className="relative w-full scrollbar-hide mb-10">
      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        onScroll={checkScrollPosition}
        className="flex overflow-x-auto scroll-smooth scrollbar-hide space-x-4 p-4"
      >
        {workersData.workers.map((worker) => (
              <nav key={worker.workerId} className="min-w-[200px] h-[200px] bg-blue-500 rounded-xl text-white text-xl">
                <img src={worker.profilePhoto} alt={worker.name} width="50" />
                <strong>{worker.name}</strong> - {worker.profession} ({worker.age} years old)
              </nav>
            ))}
      </div>

      {/* Single Scroll Button */}
      <button
        onClick={() => handleScroll("right")}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-lg"
      >
        <ChevronRight />
      </button>

      {showLeftButton && (
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-lg"
        >
          <ChevronLeft />
        </button>
      )}
    </div>
  );
};

export default Workers;
