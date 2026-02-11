
export interface Product {
    description: string,
    price: number,
    weight: number,
    serving: number,
    kcal: number,
    protein: number

}



// export class Row {
//     private gramsConversionFactor: number;

//     constructor(
//         public description: string,
//         public price: number,
//         public weight: number,
//         public serving: number,
//         public kcal: number,
//         public protein: number) {

//         this.gramsConversionFactor = 100 / serving;
//     }

//     static createProduct(obj: Product) {
//         const { description, price, weight, serving, kcal, protein } = obj;
//         return new Row(description, price, weight, serving, kcal, protein);
//     }

//     toObj(): Product {
//         return {
//             description: this.description,
//             price: this.price,
//             weight: this.weight,
//             serving: this.serving,
//             kcal: this.kcal,
//             protein: this.protein
//         }
//     }

//     proteinPer(): number {
//         return this.protein * this.gramsConversionFactor;
//     }

//     kcalPer(): number {
//         return this.kcal * this.gramsConversionFactor;
//     }

//     proteinRatio(): number {
//         return this.kcal / this.protein
//     }

//     proteinPrice(): number {
//         const protein_per_gram = this.protein / this.serving;
//         const price_per_gram = this.price / this.weight;
//         return price_per_gram / protein_per_gram;
//     }
// }