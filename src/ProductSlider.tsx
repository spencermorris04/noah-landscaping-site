import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react"

type Product = {
  name: string
  store: string
  image: string
  price: string
  url: string
}

const lightingData: Product[] = [
  {
    name: "Harbor Breeze 120-Watt Transformer",
    store: "Lowe's",
    image: "https://mobileimages.lowes.com/productimages/cb20fa7c-7777-43b4-a091-5976e75213ad/70354778.jpeg?size=pdhz",
    price: "$74.98",
    url: "https://www.lowes.com/pd/Harbor-Breeze-LOW-VOLT-120-WATT-LAND-TRANFORMER/5015585937"
  },
  {
    name: "Harbor Breeze Warm LED Black Low Voltage Spot Light Kit",
    store: "Lowe's",
    image: "https://mobileimages.lowes.com/productimages/32904b44-6c56-4e59-8556-e03151559dfc/68138156.jpeg?size=pdhz",
    price: "$99.98",
    url: "https://www.lowes.com/pd/Harbor-Breeze-LED-Spot-Light-Kit/5014760701?store=543&cm_mmc=shp-_-c-_-prd-_-elc-_-ggl-_-CRP_SHP_LIA_ELC_Online_C-D-_-5014760701-_-local-_-0-_-0&gad_source=1&gad_campaignid=21172143313&gbraid=0AAAAAD2B2W_FuFFSDIFWJR8FWpLY8hruY&gclid=Cj0KCQjw5ubABhDIARIsAHMighZMX2jBhyY8s-bcMCOtqir4vPKxO9Aq83lQq31N7WaWTDbi8o3-w_gaAlhIEALw_wcB&gclsrc=aw.ds"
  },
  {
    name: "Southwire 250 ft. 12/2 Low-Voltage Landscape Wire",
    store: "Home Depot",
    image: "https://images.thdstatic.com/productImages/91d5a334-aec4-4604-8ec2-46af52135845/svn/southwire-landscape-lighting-wires-55213444-64_600.jpg",
    price: "$119.77",
    url: "https://www.homedepot.com/p/Southwire-250-ft-12-2-Black-Stranded-CU-Low-Voltage-Landscape-Lighting-Wire-55213444/300836209"
  }
]

export function ProductSlider() {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 3,
          spacing: 30,
        },
      },
    },
    defaultAnimation: { duration: 100 },
    slideChanged(s) {
      s.container
       .querySelectorAll(".keen-slider__slide")
       .forEach((slide, idx) => {
         slide.classList.toggle("scale-100", idx === s.track.details.rel)
         slide.classList.toggle("scale-90", idx !== s.track.details.rel)
       })
    },
  })

  return (
    <section className="my-10 px-4">
      <h3 className="text-2xl font-bold text-white mb-4 text-center">
        Featured Lighting Options
      </h3>
      <div className="relative">
        <div
          ref={sliderRef}
          className="keen-slider h-[350px] w-full transition-transform duration-300"
        >
          {lightingData.map((item, i) => (
            <div
              key={i}
              className="keen-slider__slide scale-90 transition-transform duration-300"
            >
              <div className="bg-white rounded-lg shadow p-4 h-full flex flex-col justify-between">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded"
                  />
                  <div className="mt-4 text-center">
                    <div className="font-semibold text-blue-900">
                      {item.name}
                    </div>
                    <div className="text-blue-700 text-sm">
                      {item.store}
                    </div>
                    <div className="text-blue-500 font-bold">
                      {item.price}
                    </div>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => slider.current?.prev()}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white/80 text-blue-700 hover:bg-blue-100 p-2 rounded-full shadow-md"
        >
          ←
        </button>
        <button
          onClick={() => slider.current?.next()}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white/80 text-blue-700 hover:bg-blue-100 p-2 rounded-full shadow-md"
        >
          →
        </button>
      </div>
    </section>
  )
}
