/** * @fileoverview Implementação de uma estrutura de dados Hashmap em JavaScript.
 * @author TheRodrig0
 * @version 1.0.0
*/

/**
 * Representa uma estrutura de dados Hashmap (ou Tabela de Dispersão).
 * @description Esta classe oferece um armazenamento de chave-valor com complexidade
 * de tempo amortizada de O(1) para inserção, busca e remoção.
 * A capacidade interna é redimensionada dinamicamente para otimizar o uso de memória e a performance.
 * @example
 * const HASHMAP = new Hashmap(); // Criação do hashmap.
 * HASHMAP.put("Rodrigo", { isAdmin: true }); // Inserção de um par chave-valor.
 * console.log(HASHMAP.get("Rodrigo")); // Exibe o valor da chave inserida.
 * console.log(HASHMAP.size); // Retorna o número de elementos no hashmap.
 * console.table(HASHMAP.buckets); // Retorna uma cópia dos "buckets" do hashmap.
 * HASHMAP.delete("Rodrigo"); // Exclusão do par chave-valor.
*/
export class Hashmap {
    static #BASE_HASH = 2166136261;
    static #DEFAULT_PRIME_NUMBER = 16777619;
    static #MINIMUM_SIZE = 3;
    static #MAXIMUM_LIMIT_OF_LOAD_FACTOR = 0.8;
    static #MINIMUM_LIMIT_OF_LOAD_FACTOR = 0.2;
    static #RESIZE_FACTOR = 2;

    #size = Hashmap.#MINIMUM_SIZE;
    #elementCount = 0;
    #buckets = Array.from({ length: this.#size }, () => []);

    /**
     * @private
     * Calcula o hash de uma string e retorna um índice para o array de buckets.
     * @param {string} string A string que será processada.
     * @returns {number} O índice do bucket correspondente (sempre positivo).
     */
    #hash(string) {
        this.#validateKey(string);

        let hash = Hashmap.#BASE_HASH;

        for (let i = 0;i < string.length;i++) {
            hash ^= string.charCodeAt(i);
            hash = Math.imul(hash, Hashmap.#DEFAULT_PRIME_NUMBER);
        }

        return Math.abs(hash % this.#size);
    }

    /**
     * @private
     * Redimensiona a capacidade de armazenamento do hashmap (o número de buckets)
     * quando o fator de carga atinge limites pré-definidos.
     */
    #resize() {
        const loadFactor = this.#elementCount / this.#size;
        let newSize = this.#size;

        if (loadFactor > Hashmap.#MAXIMUM_LIMIT_OF_LOAD_FACTOR) {
            newSize = this.#size * Hashmap.#RESIZE_FACTOR;
        }

        if (loadFactor < Hashmap.#MINIMUM_LIMIT_OF_LOAD_FACTOR) {
            newSize = Math.max(
                Hashmap.#MINIMUM_SIZE,
                Math.floor(this.#size / Hashmap.#RESIZE_FACTOR)
            );
        }

        if (newSize === this.#size) {
            return;
        }

        this.#size = newSize;
        const oldBuckets = this.#buckets;
        this.#buckets = Array.from({ length: this.#size }, () => []);

        for (const [key, value] of oldBuckets.flat()) {
            const bucketIndex = this.#hash(key);
            this.#buckets[bucketIndex].push([key, value]);
        }
    }

    /**
     * @private
     * Valida se a chave fornecida é uma string não vazia.
     * @param {any} key A chave a ser validada.
     * @throws {Error} Lança um erro se a chave não for uma string não vazia.
     */
    #validateKey(key) {
        if (typeof key === "string" && key.length > 0) {
            return;
        }

        throw new Error("Invalid input: 'key' must be a non-empty string.");
    }

    /**
     * @private
     * Encontra a localização de uma entrada (par chave-valor) no hashmap.
     * @param {string} key A chave da entrada a ser encontrada.
     * @returns {{bucket: Array, entryIndex: number}} Um objeto contendo o bucket e o índice da entrada dentro dele (-1 se não for encontrado).
     */
    #findEntry(key) {
        const bucketIndex = this.#hash(key);
        const bucket = this.#buckets[bucketIndex];

        const entryIndex = bucket.findIndex(([entryKey]) => entryKey === key);

        return { bucket, entryIndex };
    }

    /**
     * Insere ou atualiza um par chave-valor no hashmap.
     * Se a chave já existir, o valor é sobrescrito.
     * @param {string} key A chave para associar o valor.
     * @param {any} value O valor a ser armazenado.
     */
    put(key, value) {
        const { bucket, entryIndex } = this.#findEntry(key);

        if (entryIndex !== -1) {
            bucket[entryIndex][1] = value;
            return;
        }

        bucket.push([key, value]);
        this.#elementCount++;
        this.#resize();
    }

    /**
     * Retorna o valor associado à chave especificada.
     * @param {string} key A chave cujo valor deve ser retornado.
     * @returns {any | undefined} O valor associado à chave, ou undefined se a chave não for encontrada.
     */
    get(key) {
        const { bucket, entryIndex } = this.#findEntry(key);

        if (entryIndex === -1) {
            return undefined;
        }

        return bucket[entryIndex][1];
    }

    /**
     * Remove o par chave-valor associado à chave especificada.
     * @param {string} key A chave a ser removida.
     * @returns {boolean} Retorna `true` se o elemento foi removido com sucesso, `false` caso contrário.
     */
    delete(key) {
        const { bucket, entryIndex } = this.#findEntry(key);

        if (entryIndex === -1) {
            return false;
        }

        bucket.splice(entryIndex, 1);
        this.#elementCount--;
        this.#resize();
        return true;
    }

    /**
     * Verifica se uma chave existe no hashmap.
     * @param {string} key A chave a ser verificada.
     * @returns {boolean} Retorna `true` se a chave existe, `false` caso contrário.
     */
    has(key) {
        return this.#findEntry(key).entryIndex !== -1;
    }

    /**
     * Retorna uma cópia profunda do array de buckets.
     * @returns {Array<Array<[string, any]>>} Uma cópia segura do estado interno dos buckets.
     */
    get buckets() {
        return structuredClone(this.#buckets);
    }

    /**
     * Retorna o número de pares chave-valor no hashmap.
     * @returns {number} O número total de elementos.
     */
    get size() {
        return this.#elementCount;
    }
}

// Criação da instancia HASHMAP.
const HASHMAP = new Hashmap()

// Variável que será usada para o loop for.
const NAME = "Rodrigo"

// Insere a chave/valor no HASHMAP.
for (const i in NAME) {
    HASHMAP.put(NAME.slice(0, NAME.length - parseInt(i)), parseInt(i))
}

// Deleta a chave/valor do HASHMAP.
HASHMAP.delete("Rodrigo")

// Exibe os buckets do hashmap.
console.table(HASHMAP.buckets)