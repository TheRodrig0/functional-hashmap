/** 
 * @fileoverview Cria uma classe Hashmap e implementa com um teste simples.
 * @author TheRodrig0
 * @version 1.0.0
*/

/** Classe de estrutura de dados Hashmap.
 * @class Hashmap.
 * @description Essa classe é uma maneira eficiente de armazenamento, tentando sempre ser <strong>O(1)</strong>.
 * @returns Estrutura de dados Hashmap.
 * @example 
 * const HASHMAP = new Hashmap(1000) // Criação do hashmap.
 * HASHMAP.put("Rodrigo", { isAdmin: true }) // Inserção da chave/valor.
 * console.log(HASHMAP.get("Rodrigo")) // Exibição do valor da chave inserida.
 * console.log(HASHMAP.getSize()) // Retorna o tamanho do hashmap.
 * console.table(HASHMAP.getBuckets()) // Retorna o "buckets" do hashmap.
 * HASHMAP.delete("Rodrigo") // Exclusão da chave/valor do hashmap.
*/

class Hashmap {

    #size
    #buckets

    /**
     * @constructor
     * @param {number} size Tamanho do array principal do hashmap.
     * @param {Array<Array<any>>} buckets Array que armazena os arrays secundários juntamente com seu conteúdo.
     * @throws Error Invalid argument: size is not a number or size is less than zero.
    */

    constructor(size = 5) {
        if (typeof size != 'number' || size <= 0)
            throw new Error("Invalid input: 'size' is not a number or size is less than zero.")

        this.#size = size
        this.#buckets = Array.from({ length: this.#size }, () => [])
    }

    /** Método #hash
     * @method #hash
     * @description Tira o hash de uma string e retorna um módulo para a localização dos dados dos buckets.
     * @param {string} string String que será tirado o hash.
     * @returns {number} módulo "%" do hash (sempre positivo).
     * @throws Error Invalid argument: string must be a non-empty string.
    */

    #hash(string) {
        if (typeof string != "string" || string == "")
            throw new Error("Invalid input: 'string' must be a non-empty string.")

        const HASH = [...string].reduce(
            (hash, character) => (Math.imul(31, hash) + character.charCodeAt(0)) | 0,
            0
        ) % this.#size

        return HASH < 0 ? HASH * -1 : HASH
    }

    /** Método put
     * @method put
     * @description Insere a chave/valor em um bucket, mas se ele já estiver ocupado ele sobrescreverá o valor existente.
     * @param {string} key Chave que será usado como endereço.
     * @param {any} value Valor que será guardado.
     * @throws Error Invalid argument: key must be a non-empty string, and value cannot be null or undefined.
    */

    put(key, value) {
        if ((typeof key != "string" || key == "") || (value == null || value == undefined))
            throw new Error("Invalid input: 'key' must be a non-empty string, and 'value' cannot be null or undefined.")

        const INDEX_OF_BUCKET = this.#hash(key)
        const BUCKET = this.#buckets[INDEX_OF_BUCKET]

        for (let index = 0; index < BUCKET.length; index++) {
            const [KEY] = BUCKET[index]

            if (KEY != key) continue

            BUCKET[index] = [key, value]
            return
        }

        BUCKET.push([key, value])
    }

    /** Método get
     * @method get
     * @description Retorna o valor a partir da key inserida.
     * @param {string} key Chave que será usada para retornar o valor da mesma.
     * @throws Error Invalid input: key must be a non-empty string.
    */

    get(key) {
        if (typeof key != "string" || key == "")
            throw new Error("Invalid input: 'key' must be a non-empty string.")

        const INDEX_OF_BUCKET = this.#hash(key)
        const BUCKET = this.#buckets[INDEX_OF_BUCKET]

        for (let index = 0; index < BUCKET.length; index++) {
            const [KEY, VALUE] = BUCKET[index]

            if (KEY != key) continue
            return VALUE
        }

        return undefined
    }

    /** Método delete
     * @method delete
     * @description Deleta a chave/valor a partir da key inserida.
     * @param {string} key Chave que será usada para achar o bucket para ser deletado.
     * @throws Error Invalid input: key must be a non-empty string.
    */

    delete(key) {
        if (typeof key != "string" || key == "")
            throw new Error("Invalid input: 'key' must be a non-empty string")

        const INDEX_OF_BUCKET = this.#hash(key)
        const BUCKET = this.#buckets[INDEX_OF_BUCKET]

        for (let index = 0; index < BUCKET.length; index++) {
            const [KEY] = BUCKET[index]

            if (KEY != key) continue

            BUCKET.splice(index, 1)
            return true

        }

        return false

    }

    /** Método getSize
     * @method getSize
     * @description Retorna o tamanho do hashmap.
     * @returns {number} 
    */

    getSize() {
        return this.#size
    }

    /** Método getBuckets
     * @method getBuckets
     * @description Retorna o array principal do hashmap.
     * @returns {Array<Array<any>>} 
    */

    getBuckets() {
        return this.#buckets.map(bucket => [...bucket])
    }
}

// Criação da instancia HASHMAP.
const HASHMAP = new Hashmap(10)

// Variável que será usada para o loop for.
const NAME = "Rodrigo"

// Insere a chave/valor no HASHMAP.
for (const i in NAME) {
    HASHMAP.put(NAME.slice(0, NAME.length - parseInt(i)), parseInt(i))
}

// Deleta a chave/valor do HASHMAP.
HASHMAP.delete("Rodrigo")

// Exibe os buckets do hashmap.
console.table(HASHMAP.getBuckets())