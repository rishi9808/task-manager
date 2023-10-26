function Right_section() {
    return (
        <div className="right-section">
        <div className="ad-space">
          {/* Content of the right section */}
        </div>
        <div
          className="fixed-image"
          style={{
            position: 'sticky',
            top: '20px',
            left: '20px',
            right: '20px',
            zIndex: 999
            
          }}
        ><div style={{display:"flex",flexDirection:"column",alignContent:"center",justifyContent:"center"}}>
            <img src="/images/ad_2.png" alt="Fixed Image" style={{maxWidth:"250px"}}/>
            <img src="/images/ad_3.png" alt="Fixed Image" style={{maxWidth:"250px",marginTop:"20px"}}/>
            <img src="/images/ad_4.png" alt="Fixed Image" style={{maxWidth:"250px",marginTop:"20px"}}/>
        </div>
          
        </div>
      </div>
    );
  }
  
  export default Right_section;
  