import './notFound.css'

const NotFound = () => {

  let token = localStorage.getItem('token');
  return (
    <>
{/* // href="https://codepen.io/uiswarup/full/yLzypyY"  */}
      <p>
        <header className="top-header">
        </header>


        <div>
          <div className="starsec"></div>
          <div className="starthird"></div>
          <div className="starfourth"></div>
          <div className="starfifth"></div>
        </div>



        <div className="lamp__wrap">
          <div className="lamp">
            <div className="cable"></div>
            <div className="cover"></div>
            <div className="in-cover">
              <div className="bulb"></div>
            </div>
            <div className="light"></div>
          </div>
        </div>

        <section className="error">

          <div className="error__content">
            <div className="error__message message">
              <h1 className="message__title">Page Not found</h1>
              <p className="message__text">La page que vous chercher d'afficher n'existe pas</p>
            </div>
            <div className="error__nav e-nav">
              {/* <a href="dashbord" target="_blanck" className="e-nav__link"></a> */}
              {token && <span className="e-nav__link" onClick={() => window.location.pathname = "dashboard"}></span>}
            </div>
          </div>


        </section>

      </p>


    </>
  )
}

export default NotFound