import latas from "../../assets/img/latas.svg";
const Footer = () => {
  return (
    <footer className=" h-24 w-full text-center text-white">
      <img
        src={latas}
        alt="latas"
        className="p-0 m-0  w-full h-20 mb--10 bg-repeat-x position-relative-bottom"
      />
      <div className="bg-black ">
        <h3 className=" py-8">Todos los derechos reservados</h3>
      </div>
    </footer>
  );
};

export default Footer;
