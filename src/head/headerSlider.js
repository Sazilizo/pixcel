import React, {useEffect, useState} from 'react'

const slidersList= [
    [
        {"image":"https://www.ukmodels.co.uk/wp-content/uploads/2020/08/shutterstock_397813951-scaled.jpg", "text":"first slider text 1"},
        {"image":"https://th.bing.com/th/id/OIP.yOTBIa4cYaCL8ybu9KAmzgAAAA?rs=1&pid=ImgDetMain", "text":"first slider text 2"},
        {"image":"https://i.pinimg.com/originals/5a/0f/9e/5a0f9e7ca93926a54ccb5e6a61e3cf47.jpg", "text":"first slider text 3"}
    ],
    [
        {"image":"https://i.pinimg.com/originals/8b/20/23/8b20233e864664a828c4a498e70c948c.jpg", "text":"second slider text 1"},
        {"image":"https://th.bing.com/th/id/R.651a41268cb12afd0acdff5bed7d2fa3?rik=ZkHISyQ3P8p%2bng&pid=ImgRaw&r=0", "text":"second slider text 2"},
        {"image":"https://morethanfoodmag.com/wp-content/uploads/2021/02/LUNGA-KUPISO-768x1151.jpg", "text":"second slider text 3"}
    ],
    [
        {"image":"https://th.bing.com/th/id/OIP.IgfJBTu_kXqMq5mPU56rHAHaLy?rs=1&pid=ImgDetMain", "text":"second slider text 1"},
        {"image":"https://th.bing.com/th/id/R.ae84877c7dcf98de96f3fae1bbae1b67?rik=2tXFCB1PiM2YbA&riu=http%3a%2f%2fcdn3.upsocl.com%2fwp-content%2fuploads%2f2015%2f02%2fjimmynelson-1.jpg&ehk=XjFpFAJ9bXyXGIAp%2bCcgsZTSnddG56E2a9ekuC8MkY8%3d&risl=&pid=ImgRaw&r=0", "text":"second slider text 2"},
        {"image":"https://img.huffingtonpost.com/asset/56c390be1300002a0014157e.jpeg?ops=scalefit_970_noupscale", "text":"second slider text 3"}
    ]
]
const HeaderSlider = () => {
    const [sliderIterator, setSliderIterator] = useState(0);

    useEffect(()=>{
        const interval = setInterval(()=>{
            setSliderIterator((prev)=> prev === slidersList.length -1? prev = 0 :prev + 1)
        },1500);

        return ()=> clearInterval(interval);
    },[])
    useEffect(()=>{
        console.log(slidersList[0][1].image)
    },[])
  return (
    <div className="header-slider-container">
        <div className="header-slider-wrapper">
            <div className="slider slider1">
                <img 
                className="header-slider-image"
                src={slidersList[0][sliderIterator].image}
                ></img>
            </div>
            <div className="slider slider2" style={{"backgroundColor":`${slidersList[1][sliderIterator].image}`}}>
            <img 
                className="header-slider-image"
                src={slidersList[1][sliderIterator].image}
                ></img>
            </div>
            <div className="slider slider3" style={{"backgroundColor":`${slidersList[2][sliderIterator].image}`}}>
                <img 
                className="header-slider-image"
                src={slidersList[2][sliderIterator].image}
                ></img>
            </div>
        </div>
    </div>
  )
}

export default HeaderSlider;
