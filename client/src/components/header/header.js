import './header.scss';

const header = (
  <header className='header'>
    <section className="header__wrapper" >
      <address className="header__social">
        <span className="header__text header__text_md">
          info@shopy.com
            </span>
        <span className="header__text header__text_md">
          453 - 5553 - 996
            </span>
      </address>
      <nav className="header__social">
        <span className="header__icon">
          facebook
            </span>
        <span className="header__icon">
          twitter
            </span>
        <span className="header__icon">
          google plus
            </span>
        <span className="header__icon">
          instagram
            </span>
      </nav>
    </section>
    <section className="header__wrapper" >
      <div className="header__logo">
        <div>
          sh
              <span className="header__logo-image">
          </span>
          py
            </div>
        <div>
          shope any where
            </div>
      </div>
      <nav className="header__links">
        <a className="header__text header__text_lg">
          Home
            </a>
        <a className="header__text header__text_lg">
          Products
            </a>
        <a className="header__text header__text_lg">
          Hot Deals
            </a>
        <a className="header__text header__text_lg">
          About
            </a>
        <a className="header__text header__text_lg">
          Contact
            </a>
        <form>
          <input type="text" className="header__search-bar">
            searchbar
              </input>
          <input type="button" className="header__icon">
            search
              </input>
        </form>
        <a className="header__icon">
          user
            </a>
        <a className="header__icon">
          basket
            </a>
      </nav>
    </section>
  </header>
);

export default header;