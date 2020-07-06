export default class Sala {

    constructor() {

        this.identificador = ""; //nome sala
        this.cadeiras = {};
        for (let i = 0; i < 6; i++) {
            let alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            this.cadeiras["fileira" + alfabeto.charAt(i)] = [];
            for (let j = 0; j < 10; j++) {
                this.cadeiras["fileira" + alfabeto.charAt(i)][j] = "";
            }
        }

    }
}