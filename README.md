# Functional-Hashmap  
Uma implementação funcional e didática de uma **estrutura de dados Hashmap** em **JavaScript**.

## 📋 Descrição  
Este projeto apresenta uma implementação simples e eficiente de um **Hashmap**, permitindo armazenar e acessar pares **chave-valor** com **complexidade média O(1)** para as operações principais — inserção, busca e remoção.  

O Hashmap utiliza uma função de hash baseada em FNV-1a (modificada) e realiza **redimensionamento dinâmico** conforme o fator de carga aumenta ou diminui, garantindo equilíbrio entre **performance** e **uso de memória**.

---

## 🚀 Funcionalidades
- Inserção e atualização de pares **chave-valor** (`put`).
- Busca eficiente de valores (`get`).
- Remoção de entradas (`delete`).
- Verificação da existência de uma chave (`has`).
- Redimensionamento automático baseado no **fator de carga**.
- Acesso seguro ao estado interno (`buckets`).
- Controle do número atual de elementos (`size`).

---

## 🧩 Exemplo de Uso

```javascript
import { Hashmap } from "./hashmap.js";

// Criação da instância
const HASHMAP = new Hashmap();

// Inserção de pares chave/valor
HASHMAP.put("Rodrigo", { isAdmin: true });
HASHMAP.put("Gabriel", { isAdmin: false });

// Acesso a valores
console.log(HASHMAP.get("Rodrigo")); // { isAdmin: true }

// Verificação de existência
console.log(HASHMAP.has("Gabriel")); // true

// Remoção
HASHMAP.delete("Rodrigo");

// Exibe os buckets internos
console.table(HASHMAP.buckets);
```

## ⚙️ Como Funciona um Hashmap
Um Hashmap é uma estrutura de dados que armazena pares chave → valor.
Cada chave é processada por uma função de hash, que transforma a string em um índice numérico.
Esse índice determina em qual bucket (compartimento interno) o valor será armazenado.

Quando duas chaves diferentes geram o mesmo índice (colisão), o Hashmap utiliza listas internas para armazenar múltiplos pares no mesmo bucket.
Durante a execução, o Hashmap monitora o fator de carga (número de elementos / número de buckets).
Quando o fator atinge limites pré-definidos, a estrutura é redimensionada automaticamente para manter a eficiência.

## 📊 Complexidade de Tempo (Big O)
| Operação          | Complexidade Média | Complexidade Pior Caso |
|--------------------|--------------------|------------------------|
| Inserção (`put`)   | O(1)               | O(n)                   |
| Busca (`get`)      | O(1)               | O(n)                   |
| Remoção (`delete`) | O(1)               | O(n)                   |

O pior caso ocorre apenas quando muitas chaves diferentes colidem no mesmo bucket — algo improvável com uma boa função de hash.

## 💡 Por que usar um Hashmap?
Um Hashmap é uma das estruturas de dados mais importantes da computação por oferecer acesso rápido a valores associados a chaves únicas.
Diferente de arrays, que exigem buscas lineares (O(n)), o Hashmap localiza elementos quase instantaneamente.

É amplamente usado em:

Dicionários de palavras.

Armazenamento de configurações e preferências.

Caches de dados.

Índices rápidos em bancos de dados e jogos.

Sistemas de contagem e agrupamento.

## 📘 Estrutura Interna
A implementação possui os seguintes atributos e métodos principais:

| Método / Propriedade | Descrição |
|-----------------------|------------|
| **`put(key, value)`** | Insere ou atualiza um par **chave → valor** no Hashmap. Caso a chave já exista, o valor é sobrescrito. |
| **`get(key)`** | Retorna o valor associado à **chave** especificada. Retorna `undefined` se a chave não existir. |
| **`delete(key)`** | Remove o par **chave → valor** correspondente. Retorna `true` se foi removido com sucesso, `false` caso contrário. |
| **`has(key)`** | Verifica se a **chave** existe no Hashmap, retornando `true` ou `false`. |
| **`buckets`** | Retorna uma **cópia profunda** dos buckets internos (sem expor referências diretas). |
| **`size`** | Retorna o **número total de elementos** armazenados atualmente no Hashmap. |


## 🧠 Fatores de Carga e Redimensionamento
O fator de carga define o equilíbrio entre espaço e desempenho.

Limite máximo: 0.8 → Quando o Hashmap está 80% cheio, o número de buckets dobra.

Limite mínimo: 0.2 → Quando há poucos elementos, o número de buckets é reduzido pela metade (sem nunca ficar abaixo de 3).

Esses limites mantêm a operação eficiente e o consumo de memória otimizado.
