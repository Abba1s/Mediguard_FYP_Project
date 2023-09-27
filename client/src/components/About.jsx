import React from 'react'
import qrcode from "../assets/qrmob.jpg"
import "./about.css"

function About() {
  return (
    <>
    
        <div className="about d-flex align-items-center justify-content-around p-3">

            <div className="texts text-light row col-6">
                <h2>
                    What MediGuard really does ?
                </h2>
                <p className='about-para mx-1 my-3'>
                Using Blockchain technology & Quick Response (QR) code it provides robust technique to try and stop the practice of counterfeiting the drugs. Fake drugs are detected using a Quick Response scanner, a QR code attached to the product is linked to the Blockchain network. The product is authentic only if the QR code is matched otherwise it will notify the customer that QR code is not matched and the product is fake.
                </p>
            </div>

            <img className='row col-4 rounded-3' src={qrcode} alt=""  height={365}/>

        </div>
    
    </>
  )
}

export default About