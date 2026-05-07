import React from 'react'
import Search from './components/Search/Search'

const App = () => {

  
  return (
    <main>
      <div className="pattern"/>

      <section className='hero-section'>

        <div className='col-img1'>
          <div className="img-box">
            <img src="alien.png" alt="alien"/>
          </div>
          <div className="img-box">
            <img src="madmax.png" alt="madmax"/>
          </div>
        </div>

        <div className='title'>
          <div className="title-box">
            <img src="Grand-Tv.svg" alt="title"/>
          </div>

          <Search/>
        </div>

        <div className='col-img2'>
          <div className="img-box">
            <img src="looper.png" alt="looper"/>
          </div>
          <div className="img-box">
            <img src="bladerunner.png" alt="bladerunner"/>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App

