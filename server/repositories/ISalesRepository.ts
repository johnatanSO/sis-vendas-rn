export interface Sale {}

export interface ISalesRepository {
  list: () => Promise<Sale[]>
}
