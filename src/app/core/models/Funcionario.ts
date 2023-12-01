import { Cargo } from "./Cargo";
import { Person } from "./Person";
import { Unidad } from "./Unidad";

export class Funcionario {
    id: number | null = null;
    idPersona: Person | null = null;
    idCargo: Cargo | null = null;
    idUnidad: Unidad | null = null;
}