export class Cart {
    quantity!: number
    price!: number
    product!: Prod
}

export class Prod {
          id!: number
    name!: string
    price!: number
    nuts!: boolean
    image!: string
    vegeterian!: boolean
    spiciness!: number
    categoryId!: number
}