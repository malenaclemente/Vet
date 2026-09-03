export const PETS_DATA = [
  {
    id: "1",
    name: "Ciro",
    breed: "Gato",
    age: "10 años",
    status: "En tratamiento",
    image: require("../../assets/Fotos/ciro.jpg"),
  },
  {
    id: "2",
    name: "Kira",
    breed: "Gato",
    age: "7 años",
    status: "Vacunación pendiente",
    image: require("../../assets/Fotos/Kira1.jpg"),
  },
  {
    id: "3",
    name: "Kimi",
    breed: "Gato",
    age: "2 años",
    status: "Vacunas al día",
    image: require("../../assets/Fotos/Kimi1.jpg"),
  },
];

export interface Owner {
  name: string;
  phone: string;
  location: string;
  avatar: any;
}

export const OWNER_DATA: Owner = {
  name: "Malena Clemente",
  phone: "+54 9 351 123-4567",
  location: "Córdoba, Argentina",
  avatar: require("../../assets/Fotos/Malena1.jpg"),
};
