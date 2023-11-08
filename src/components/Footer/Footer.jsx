import logo from "../../assets/logo.png";
const Footer = () => {
  return (
    <>
      <footer className="footer px-10 py-6 bg-base-200 text-base-content">
      <aside>
        <img className="w-20" src={logo} alt="" />
        <p>
          Job Finder
          <br />
          Search your dream job in Job Finder
        </p>
      </aside>
      <nav>
        <header className="footer-title">Category</header>
        <a className="link link-hover">On Site</a>
        <a className="link link-hover">Remote</a>
        <a className="link link-hover">Part Time</a>
        <a className="link link-hover">Hybrid</a>
      </nav>
      <nav>
        <header className="footer-title">Company</header>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <header className="footer-title">Legal</header>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
    <aside className="text-center py-4  bg-base-200 text-base-content">
    <p>Copyright © 2023 - All right reserved by Job Finder</p>
  </aside>
    </>
  );
};

export default Footer;
