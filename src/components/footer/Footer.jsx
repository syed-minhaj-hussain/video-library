import footer from "./footer.module.css";
export const Footer = () => {
  return (
    <div className={footer.footer}>
      <h1>
        Designed & Developed by{" "}
        <span>
          <a
            href="https://syedminhajhussain.netlify.app/"
            rel="noopener noreferrer"
            target="_blank"
          >
            &nbsp; Syed Minhaj Hussain
          </a>
        </span>{" "}
      </h1>
    </div>
  );
};
