export class Veiculo {

    constructor(
        public _id?: number,
        public veiculo?: string,
        public marca?: string,
        public ano?: number,
        public descricao?: string, 
        public vendido?: boolean, 
        public created?: Date, 
        public updated?: Date 
    ){}
}
