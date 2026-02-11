
export interface Product {
    description: string,
    price: number,
    weight: number,
    serving: number,
    kcal: number,
    protein: number
}

export type SortKey =
    "description" |
    "price" |
    "kcal" |
    "prot" |
    "protRatio" |
    "protPrice";

export function proteinPer(product: Product): number {
    const gramsConversionFactor = 100 / product.serving;
    return product.protein * gramsConversionFactor;
}

export function kcalPer(product: Product): number {
    const gramsConversionFactor = 100 / product.serving;
    return product.kcal * gramsConversionFactor;
}

export function proteinRatio(product: Product): number {
    return product.kcal / product.protein
}

export function proteinPrice(product: Product): number {
    const protein_per_gram = product.protein / product.serving;
    const price_per_gram = product.price / product.weight;
    return price_per_gram / protein_per_gram;
}