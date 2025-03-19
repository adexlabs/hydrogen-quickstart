import React from 'react'
import flag from '~/assets/download (2).png';
const CountryBar = (countries) => {
  return (
    <div className='topbar'>
        {
            countries.map((country, index)=>{

       
      <span>
      <img src={`flag_${country.isoCode}.png`} alt={country.name} />
      </span>
     })
    }
      <div>
        Country is China: 
      </div>
    </div>
  )
}

export default CountryBar