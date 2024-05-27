import {
  NUM_MINAS_AVANCADO,
  NUM_MINAS_BEGINNER,
  NUM_MINAS_INTERMEDIO,
} from "../constants";

const numMinesOnLevel = (level) => {
  return level === "3"
    ? NUM_MINAS_AVANCADO
    : level === "2"
    ? NUM_MINAS_INTERMEDIO
    : NUM_MINAS_BEGINNER;
};

export default numMinesOnLevel;
