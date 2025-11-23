
const Logo = () => {
  const word = "TODO";
  const letters = word.split("");

  return (
    <div className="flex w-[150px] h-20">
        {letters.map((letter, index) => (
          <div
            key={index}
            className={`h-auto flex-1 hover:flex-3 transition-all duration-350 ease-[cubic-bezier(0.25,1,0.5,1)] group cursor-pointer`}
          >
            <svg 
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <text
                x="50%" 
                y="50%" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                
                textLength="100%"
                lengthAdjust="spacingAndGlyphs"
                
                className={`
                  text-5xl
				  berkshire
				  fill-white
                `}
              >
                {letter}
              </text>
            </svg>
            
          </div>
        ))}
    </div>
  );
};

export default Logo;