import {FaRobot} from "react-icons/fa"
import { GiAmericanFootballHelmet, GiRobotHelmet, GiSamuraiHelmet, GiSpartanHelmet, GiVikingHelmet } from "react-icons/gi";
import { SiAlienware } from "react-icons/si";
import { CgTranscript } from "react-icons/cg";

const iconoHabilidad = {
    "AllIsPosible" : (dat) => <SiAlienware key={dat.key} className={"fs-"+dat.size+" icon-alien"} title="Alien"/>,
    "Lider Integral" : (dat) => <GiSpartanHelmet key={dat.key} className={"fs-"+dat.size+" icon-spartan"} title=" Lider Integral"/>,
    "Lider Votación" : (dat) => <GiSamuraiHelmet key={dat.key} className={"fs-"+dat.size+" icon-samurai"} title="Lider de Votación"/> ,
    "Lider Virtual" : (dat) => <GiRobotHelmet key={dat.key} className={"fs-"+dat.size+" icon-robot"} title="Lider de Votación"/> ,
    "Lider Sonido" : (dat) => <GiVikingHelmet key={dat.key} className={"fs-"+dat.size+" icon-viking"} title="Lider de Sonido"/>,
    "Logistico Basico" : (dat) => <GiAmericanFootballHelmet key={dat.key} className={"fs-"+dat.size+" icon-american"} title=" Logistico Basico"/>,
    "Logistico Virtual" : (dat) => <FaRobot key={dat.key} className={"fs-"+dat.size+" icon-robot2"} title=" Logistico Basico"/>,
    "Redactor Actas" : (dat) => <CgTranscript  key={dat.key} className={"fs-"+dat.size+" icon-actas"} title="Redactor"/>,
};

export default iconoHabilidad;